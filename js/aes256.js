// Convert Hex strings to Uint8Array (helper replacing Buffer.from(..., 'hex'))
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// Convert Uint8Array to Hex string (helper replacing .toString('hex'))
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// 1. Keep your 64-character hex string key here (exactly like your Node script)
let hexKeyString = "";

// 2. Helper function to turn your hex key string into an official Web Crypto key object
async function getSecretKey() {
  const keyBytes = hexToBytes(hexKeyString); // Turns 64 hex chars into 32 raw bytes

  return await window.crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function encrypt(text) {
  const secretKey = await getSecretKey(); // Fetch our imported 32-byte key object
  const encoder = new TextEncoder();
  const data = encoder.encode(text); // Encodes string to UTF-8 Uint8Array

  // GCM standard initialization vector is 12 bytes
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Web Crypto natively appends the Auth Tag to the end of the encrypted data buffer
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    secretKey,
    data,
  );

  const encryptedArray = new Uint8Array(encryptedBuffer);

  // In Web Crypto AES-GCM, the last 16 bytes of the output are the authentication tag
  const authTagBytes = encryptedArray.slice(-16);
  const cipherBytes = encryptedArray.slice(0, -16);

  // Return all pieces needed for decryption as a single colon-separated string
  return `${bytesToHex(iv)}:${bytesToHex(authTagBytes)}:${bytesToHex(cipherBytes)}`;
}

async function decrypt(encryptedData) {
  const secretKey = await getSecretKey(); // Fetch our imported 32-byte key object
  const [ivHex, authTagHex, encryptedTextHex] = encryptedData.split(":");

  const iv = hexToBytes(ivHex);
  const authTag = hexToBytes(authTagHex);
  const cipherText = hexToBytes(encryptedTextHex);

  // Recombine the ciphertext and auth tag back into a single array for Web Crypto
  const completeBuffer = new Uint8Array(cipherText.length + authTag.length);
  completeBuffer.set(cipherText);
  completeBuffer.set(authTag, cipherText.length);

  // Decrypt and automatically verify the authentication tag
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    secretKey,
    completeBuffer,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer); // Converts ArrayBuffer back to string
}

// Example usage inside an async block:
async function runExample() {
  const hw = await encrypt("Hello World!");
  console.log("Encrypted package:", hw);

  const decrypted = await decrypt(hw);
  console.log("Decrypted text:", decrypted);
}
