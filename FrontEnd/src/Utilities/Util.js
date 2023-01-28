var key = "kNMG1HX4GMUIpOVIS0UBTzWREQkPApTt";
var CryptoJS = require("crypto-js");
class Util {
  constructor() {
    this.key = key;
  }

  encrypt(text) {
    var encryptedtext = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      this.key
    ).toString();
    return encryptedtext;
  }

  decrypt(encryptedText) {
    var bytes = CryptoJS.AES.decrypt(encryptedText, this.key);
    var decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedText;
  }

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  decryptFromApi(ciphertextB64) {
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encryptForApi(msg) {
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    var key = CryptoJS.PBKDF2(this.key, salt, {
      keySize: keySize / 32,
      iterations: 100,
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    var result = CryptoJS.enc.Base64.stringify(
      salt.concat(iv).concat(encrypted.ciphertext)
    );

    return result;
  }
}

export default new Util();
