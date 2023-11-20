import CryptoJS from 'crypto-js';
import dayjs from "dayjs";
/**
 * AES 加密
 * @param word: 需要加密的文本
 */

export const formatDateTime = (time) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A";
};

// 密码自己填
const key = CryptoJS.enc.Utf8.parse("Z4FM4a7y3LyO5EHCr9fWh5MOcyTI426r");

export const AES_Encrypt = () => {
  let ciphertext = CryptoJS.AES.encrypt(formatDateTime(new Date()), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
  return ciphertext;
};



/**
 * AES 解密
 * @param jsonStr
 */
export const AES_Decrypt = (jsonStr) => {
  let plaintext = CryptoJS.AES.decrypt(jsonStr, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);

  return plaintext;
};