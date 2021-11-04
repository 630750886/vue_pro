import { GetHttp } from "../utils/http";

/**
 * 原件移交
 */
export function getOriginalScriptByWhere(pa) {
  return GetHttp("java_post", "agr/contractturnover/findwhere", "post", pa);
}
export function getOriginalScriptByPageShow(pa) {
  return GetHttp("java_post", "agr/contractturnover/findallwhereno", "post", pa);
}
export function addOriginalScript(pa) {
  return GetHttp("java_post", "agr/contractturnover/adds", "post", pa);
}
export function delOriginalScript(pa) {
  return GetHttp("java_post", "agr/contractturnover/deletes", "post", pa);
}
export function upOriginalScript(pa) {
  return GetHttp("java_post", "agr/contractturnover/edits", "post", pa);
}

export function getalldata(pa) {
  return GetHttp("java_post", "agr/contractturnover/findall", "post", pa);
}
