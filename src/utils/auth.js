import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

//定义token过期时间的key
const timeKey = "expireTime";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
/**
 * 清空sessionStorage
 */
export function clearStorage() {
  return sessionStorage.clear();
}

export function setTokenTime(time) {
  return sessionStorage.setItem(timeKey, time);
}

export function getTokenTime() {
  return sessionStorage.getItem(timeKey);
}

export function removeTokenTime() {
  return sessionStorage.setItem(timeKey, 0);
}
