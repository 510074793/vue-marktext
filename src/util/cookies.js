/** 统一处理 Cookie */

import CacheKey from "@/constants/cache-key"
import Cookies from "js-cookie"

import { jwtDecode } from "jwt-decode"

import { diffTime } from "@/util"

export const getToken = () => {
  const token = Cookies.get(CacheKey.TOKEN)
  
  if (token != void(0)) {
    let userToken = jwtDecode(token)
    if (!diffTime(userToken.exp)) {
      return token
    }else{
      removeToken()
    }
  }
  return token
}
export const setToken = (token) => {
  Cookies.set(CacheKey.TOKEN, token)
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}
