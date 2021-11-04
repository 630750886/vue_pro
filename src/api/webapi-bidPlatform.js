import { GetHttp } from "../utils/http";

/**
 * 项目管理
 *  交易平台
 * @param pa 参数
 */
export function getTradingPlatform(pa) {
  return GetHttp("java_post", "/pro/tatradingplatform/findall", "post", pa);
}
export function getTradingPlatformByKeyid(pa) {
  return GetHttp("java_post", "/pro/tatradingplatform/findbykeyid", "post", pa);
}
export function addTradingPlatform(pa) {
  return GetHttp("java_post", "/pro/tatradingplatform/adds", "post", pa);
}
export function upTradingPlatform(pa) {
  return GetHttp("java_post", "/pro/tatradingplatform/edits", "post", pa);
}
export function delTradingPlatform(pa) {
  return GetHttp("java_post", "/pro/tatradingplatform/deletes", "post", pa);
}

/**
 * 备案机构
 */
export function getAgency(pa) {
  return GetHttp("java_post", "/pro/taorganization/findwhere", "post", pa);
}
export function getAgencyByKeyid(pa) {
  return GetHttp("java_post", "/pro/taorganization/findbykeyid", "post", pa);
}
export function addAgency(pa) {
  return GetHttp("java_post", "/pro/taorganization/adds", "post", pa);
}
export function upAgency(pa) {
  return GetHttp("java_post", "/pro/taorganization/edits", "post", pa);
}
export function delAgency(pa) {
  return GetHttp("java_post", "/pro/taorganization/deletes", "post", pa);
}

/**
 * 公告/公示网站
 */
export function getWebsite(pa) {
  return GetHttp("java_post", "/pro/tawebsite/findall", "post", pa);
}
export function getWebsiteByKeyid(pa) {
  return GetHttp("java_post", "/pro/tawebsite/findbykeyid", "post", pa);
}
export function addWebsite(pa) {
  return GetHttp("java_post", "/pro/tawebsite/adds", "post", pa);
}
export function upWebsite(pa) {
  return GetHttp("java_post", "/pro/tawebsite/edits", "post", pa);
}
export function delWebsite(pa) {
  return GetHttp("java_post", "/pro/tawebsite/deletes", "post", pa);
}
