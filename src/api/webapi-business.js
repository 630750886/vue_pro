import { GetHttp } from "../utils/http";

/**
 * 项目管理
 * getItem 获取项目
 * @param pa 参数
 */
export function getItemByWholeOrIntegrated(pa) {
  return GetHttp(
    "java_post",
    "/pro/cmbaseproject/integ_advancedquery",
    "post",
    pa
  );
}
export function getItem(pa) {
  return GetHttp("java_post", "/pro/cmbaseproject/advancedquery", "post", pa);
}
export function getItemByKeyId(pa) {
  return GetHttp("java_post", "/pro/cmbaseproject/findbykeyid", "post", pa);
}
export function addItem(pa) {
  return GetHttp("java_post", "/pro/cmbaseproject/adds", "post", pa);
}
export function upItem(pa) {
  return GetHttp("java_post", "/pro/cmbaseproject/edits", "post", pa);
}
export function delItem(pa) {
  return GetHttp("java_post", "/pro/cmbaseproject/deletes", "post", pa);
}
