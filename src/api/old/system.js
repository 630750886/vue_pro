import request from "../../utils/ax";
import { GetHttp } from "../../utils/http";
export function getOrgTree() {
  return GetHttp("back_get", "getOrgTree", "get");
}
export function addOrgTree(pa) {
  return GetHttp("back_post", "addOrgTree", "post", pa);
}
export function modifyOrgTree(pa) {
  return GetHttp("back_post", "modifyOrgTree", "post", pa);
}
export function getPos(pa) {
  return GetHttp("back_get", "getPos", "post", pa);
}
export function addPos(pa) {
  return GetHttp("back_post", "addPos", "post", pa);
}
export function modifyPos(pa) {
  return GetHttp("back_post", "modifyPos", "post", pa);
}
export function delPos(pa) {
  return GetHttp("back_post", "delPos", "post", pa);
}
export function getqueryList(pa) {
  return request({
    url: "/system/getqueryList",
    method: "get",
    data: pa
  });
}

export function getresourceList(pa) {
  return request({
    url: "/system/getresourceList",
    method: "get",
    data: pa
  });
}
