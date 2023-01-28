// var key = "kNMG1HX4GMUIpOVIS0UBTzWREQkPApTt";
var CryptoJS = require("crypto-js")
var key = CryptoJS.enc.Utf8.parse("5v8y/B?E(H+MbQeThWmZq4tPk9z$C&F)")

var iv = CryptoJS.enc.Utf8.parse("eSkLmYqKm!p9z$l&")

class AesClass {
  constructor() {
    this.key = key
    this.iv = iv
  }

  Encrypt(o) {
    if (typeof o === "string") {
      if (o) {
        var srcs = CryptoJS.enc.Utf8.parse(o)
        return CryptoJS.AES.encrypt(srcs, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }).toString()
      }
    } else if (typeof o === "object") {
      for (var _o in o) {
        if (o[_o]) {
          var srcs = CryptoJS.enc.Utf8.parse(o[_o])
          o[_o] = CryptoJS.AES.encrypt(srcs, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }).toString()
        }
      }
    }
    return o
  }

  Decrypt(str) {
    var decrypt = CryptoJS.AES.decrypt(str, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr
  }
}

export default new AesClass()
