// =========================================================
//               YOUTUBE PLAYER & PREFETCH LOGIC
// =========================================================
let ytPlayer;
let ytReady = false;

// Attach globally so the YouTube API can trigger it
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            listType: 'playlist',
            list: 'PLjTNSZEdhusYM7okULMEf57b8CHcLQ7uZ',
            autoplay: 0,
            controls: 1,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0
        },
        events: {
            'onReady': (e) => {
                ytReady = true;
                e.target.setVolume(30);
            },
            'onStateChange': (e) => {
                if (e.data === YT.PlayerState.PLAYING) {
                    const currentTrack = ytPlayer.getVideoData();
                    if (currentTrack && currentTrack.title) {
                        document.getElementById('yt-title').textContent = currentTrack.title;
                    }
                }
            }
        }
    });
};