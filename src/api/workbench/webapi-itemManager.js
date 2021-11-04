import { GetHttp } from "../../utils/http";
//获取项目服务计划
export function getServicePlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/findwhere", "post", pa);
}

/**
 *
 */
export function getWorkInfo(pa) {
  return GetHttp(
    "java_post",
    "/pro/pmplanningmanagement/findwhere",
    "post",
    pa
  );
}
export function addWorkInfo(pa) {
  return GetHttp("java_post", "/pro/pmplanningmanagement/adds", "post", pa);
}
export function delWorkInfo(pa) {
  return GetHttp("java_post", "/pro/pmplanningmanagement/deletes", "post", pa);
}
export function upWorkInfo(pa) {
  return GetHttp("java_post", "/pro/pmplanningmanagement/edits", "post", pa);
}
