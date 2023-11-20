import axios from 'axios';
import { AES_Encrypt } from "./aes.js";
import { ElMessage } from "element-plus";
import { getToken, removeToken } from "./cookies"

const instance = axios.create({
  baseURL: '',
  timeout: 1000 * 60 * 3,
});

instance.interceptors.request.use(
  (config) => {
    config.headers['key'] = AES_Encrypt();
    // 可以在此次添加Token认证
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : undefined
    config.headers.ContentType = "application/json"
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data;
    // 操作成功
    if (code == 0) {
      return data;
    } else {
      ElMessage({
        message: message,
        type: 'error',
      })
      return Promise.reject(message);
    }
  },
  (error) => {
    ElMessage({
      message: error,
      type: 'error',
    })
    return Promise.reject(error);
  }
);

export default instance;