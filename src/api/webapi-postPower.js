import { GetHttp } from "../utils/http";

//获取岗位的权限
export function getPostPower(pa) {
  return GetHttp("java_post", "/sys/syspermission/authorizetree", "post", pa);
}
//修改岗位的权限
export function upPostPower(pa) {
  return GetHttp("java_post", "/sys/syspermission/authorizeedit", "post", pa);
}
