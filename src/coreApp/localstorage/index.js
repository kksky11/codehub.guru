import SHA256 from "crypto-js/sha256";
import AES    from "crypto-js/aes";
import enc    from "crypto-js/enc-utf8";
import { STORAGE_ENCRYPTION_KEY,STORAGE_ENCRYPTION } from 'coreApp/constants/apiConstants';
const encrypt_decrypt_key = STORAGE_ENCRYPTION_KEY //"anySafeKey"; // key used for encryption and decryption 


const AsyncStorage = {  
  setItem: async function (key, value) {
    if(!STORAGE_ENCRYPTION) {
      return localStorage.setItem(key, value);
    } else {
      let cipherText = value;
      let cipherKey = SHA256(key);
      if (typeof value !== "undefined" && value !== null) {
        value = typeof value === "object" ? JSON.stringify(value) : value;
        cipherText = AES.encrypt(value, encrypt_decrypt_key);
      }
      return localStorage.setItem(cipherKey, cipherText);
    }
    
  },
  getItem: async function (key) { 
    if(!STORAGE_ENCRYPTION) {
      return localStorage.getItem(key);
    } else {
      const cipherKey = SHA256(key);
      const value = localStorage.getItem(cipherKey);
      let plaintext = value;    
      if (typeof value !== "undefined" && value !== null) {
        let bytes = AES.decrypt(value.toString(), encrypt_decrypt_key);
        plaintext = bytes.toString(enc);     
      }
      return plaintext;
    }

  },
  clear: async function () {
    return localStorage.clear();
  },
  removeItem: async function (key) {
    if(!STORAGE_ENCRYPTION) {
      return localStorage.removeItem(key);
    } else {
      let cipherKey = SHA256(key);
      return localStorage.removeItem(cipherKey);
    }
  }
};

const setKey = (key, value) => (
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value).then(() => {
        const setKeyEvent = new CustomEvent('setKey', {
          detail: {key,value}
        });
        window.dispatchEvent(setKeyEvent);
        resolve("true");
      }).catch(() => {
        reject("false");
      });
  })
);

const setData = (key, data) => (
  new Promise((resolve, reject) => {
    let newData = data;
    if(!STORAGE_ENCRYPTION){ newData = JSON.stringify(data)}
    AsyncStorage.setItem(key, newData)
    .then(() => {resolve("true");})
    .catch(() => {reject("false");});
  })
);

const getKey = key =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(value => {resolve(value);})
      .catch(() => {reject("false");});
});

const getData = key =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(value => {
        if(!value){resolve({})} else{resolve(JSON.parse(value));}
      })
      .catch(() => {
        reject("false");
      });
});

const removeKey = (key) =>
  new Promise((resolve, reject) => {
    AsyncStorage.removeItem(key)
      .then(() => {resolve("true");})
      .catch(() => {reject("false");});
});

const clearData = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.clear()
      .then(() => {resolve("true");})
      .catch(() => {reject("false");});
});

export {
  setKey,
  setData,
  getKey,
  getData,
  removeKey,
  clearData
};