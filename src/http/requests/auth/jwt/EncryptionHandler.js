var CryptoJS = require("crypto-js");
import JsonFile from "./JsonFile.json";

export default {
  decrypt(Jsonvalue) {
    try {
      var input = Jsonvalue.cipherText;
      var iv = CryptoJS.enc.Base64.parse(Jsonvalue.iv).toString(
        CryptoJS.enc.Hex
      );
      iv = CryptoJS.enc.Hex.parse(iv);

      var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);
      var Salt = CryptoJS.enc.Base64.parse(Jsonvalue.salt);

      var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, {
        keySize: JsonFile.keySize,
        iterations: JsonFile.Iterations
      });

      var decrypted = CryptoJS.AES.decrypt(input, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
      });

      var response = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      console.log(response);
      return response;
    } catch (e) {
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  },
  encrypt(input) {
    try {
      var iv = CryptoJS.lib.WordArray.random(16);
      var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);
      var Salt = CryptoJS.lib.WordArray.random(16);

      var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, {
        keySize: JsonFile.keySize,
        iterations: JsonFile.Iterations
      });

      var output = CryptoJS.AES.encrypt(JSON.stringify(input), key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      var Jsonvalue = {};
      Jsonvalue.cipherText = output;
      Jsonvalue.salt = Salt.toString(CryptoJS.enc.Base64);
      Jsonvalue.iv = iv.toString(CryptoJS.enc.Base64);
      var request = Jsonvalue;
      console.log(request);
      return request;
    } catch (e) {
      return null;
    }
  }
};
