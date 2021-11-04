import { GetHttp } from "../utils/http";

/**
 * 模板管理
 */
export function getTemplate(pa) {
  return GetHttp("java_post", "pro/cmmodel/advancedquery", "post", pa);
}
export function addTemplate(pa) {
  return GetHttp("java_post", "pro/cmmodel/adds", "post", pa);
}
export function delTemplate(pa) {
  return GetHttp("java_post", "pro/cmmodel/deletes", "post", pa);
}
export function upTemplate(pa) {
  return GetHttp("java_post", "pro/cmmodel/edits", "post", pa);
}
