// =========================================================
//            AUDIO ENGINE (With Renamed Ambience)
// =========================================================
class GameAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambienceNode = null;
    this.ambienceGain = null;
    this.buffers = {};
    this.isMuted = false;
    this.globalVolume = 0.6;
    this.initialized = false;
    this.soundManifest = {
      ambience: {
        ogg: "audio/ambience.ogg",
        mp4: "audio/ambience.m4a",
        wav: "audio/ambience.wav",
      },
      hover: {
        ogg: "audio/hover.ogg",
        mp4: "audio/hover.m4a",
        wav: "audio/hover.wav",
      },
      click: {
        ogg: "audio/click.ogg",
        mp4: "audio/click.m4a",
        wav: "audio/click.wav",
      },
      init: {
        ogg: "audio/init.ogg",
        mp4: "audio/init.m4a",
        wav: "audio/init.wav",
      },
      in: {
        ogg: "audio/ui-in.ogg",
        mp4: "audio/ui-in.m4a",
        wav: "audio/ui-in.wav",
      },
      out: {
        ogg: "audio/ui-out.ogg",
        mp4: "audio/ui-out.m4a",
        wav: "audio/ui-out.wav",
      },
    };
  }

  getBestFormat() {
    const audio = new Audio();
    if (audio.canPlayType('audio/ogg; codecs="vorbis"') === "probably" || audio.canPlayType("audio/ogg") === "maybe")
      return "ogg";
    if (
      audio.canPlayType('audio/mp4; codecs="mp4a.40.2"') === "probably" ||
      audio.canPlayType("audio/x-m4a") === "maybe"
    )
      return "mp4";
    return "wav";
  }

  async init() {
    if (this.initialized) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    this.initialized = true;

    const format = this.getBestFormat();
    await Promise.all(
      Object.keys(this.soundManifest).map((key) => this.loadSound(key, this.soundManifest[key][format])),
    );

    this.updateHUD("Active", "bg-cyan-400 audio-pulse");
    this.startAmbience();

    if (ytReady && ytPlayer) {
      ytPlayer.playVideo();
      document.getElementById("yt-card").classList.remove("opacity-40", "scale-95");
      document.getElementById("yt-card").classList.add("opacity-100", "scale-100");
    }

    this.playSFX("init");
  }

  async loadSound(name, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      this.buffers[name] = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      /* Suppressed */
    }
  }

  startAmbience() {
    if (!this.buffers["ambience"] || this.ambienceNode) return;
    this.ambienceNode = this.ctx.createBufferSource();
    this.ambienceNode.buffer = this.buffers["ambience"];
    this.ambienceNode.loop = true;
    this.ambienceGain = this.ctx.createGain();
    this.ambienceGain.gain.setValueAtTime(this.isMuted ? 0 : this.globalVolume * 0.4, this.ctx.currentTime);
    this.ambienceNode.connect(this.ambienceGain);
    this.ambienceGain.connect(this.ctx.destination);
    this.ambienceNode.start(0);
  }

  playSFX(name) {
    if (!this.initialized || this.isMuted || !this.buffers[name]) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this.buffers[name];
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.globalVolume, this.ctx.currentTime);
    source.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    source.start(0);
  }

  toggleMute() {
    if (!this.initialized) {
      this.init();
      return;
    }
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.ambienceGain) this.ambienceGain.gain.setValueAtTime(0, this.ctx.currentTime);
      if (ytReady && ytPlayer) ytPlayer.mute();
      this.updateHUD("Muted", "bg-amber-500");
    } else {
      if (this.ambienceGain) this.ambienceGain.gain.setValueAtTime(this.globalVolume * 0.4, this.ctx.currentTime);
      if (ytReady && ytPlayer) ytPlayer.unMute();
      this.updateHUD("Active", "bg-cyan-400 audio-pulse");
    }
  }

  updateHUD(text, className) {
    document.getElementById("audio-text").textContent = `Audio ${text}`;
    document.getElementById("audio-indicator").className = `w-2 h-2 rounded-full ${className}`;
  }
}

function initializeAudio() {
  // Change 'const' to 'window.' so it becomes globally accessible!
  globalThis.EngineAudio = new GameAudioEngine();

  document.getElementById("audio-hud").addEventListener("click", () => globalThis.EngineAudio.toggleMute());

  document.getElementById("init-audio-btn").addEventListener("click", (e) => {
    globalThis.EngineAudio.init();
    e.target.style.display = "none";

    // Hide the "Initialize Audio"
    const placeholder = document.getElementById("initialize-audio-placeholder");

    // Animate down to zero
    placeholder.style.opacity = "0";
    placeholder.style.height = "0";
    placeholder.style.paddingTop = "0";
    placeholder.style.paddingBottom = "0";
    placeholder.style.marginTop = "0";
    placeholder.style.marginBottom = "0";
    ScrollTrigger.refresh();

    // Fully hide after the 0.5s animation finishes
    setTimeout(() => {
      placeholder.style.display = "none";
      ScrollTrigger.refresh(); // refresh ScrollTrigger after hiding the button to keep scroll positions accurate
    }, 500);
  });

  document.querySelectorAll(".sfx-trigger").forEach((el) => {
    el.addEventListener("mouseenter", () => globalThis.EngineAudio.playSFX("hover"));
    el.addEventListener("click", () => globalThis.EngineAudio.playSFX("click"));
  });
}
