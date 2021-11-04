import request from "../../utils/ax";
import { GetHttp } from "../../utils/http";
export function getOrg(pa) {
  return GetHttp("back_post", "addOrgTree", "post", pa);
}

export function getqueryList(pa) {
  return request({
    url: "/HR/getqueryList",
    method: "get",
    data: pa
  });
}

export function getresourceList(pa) {
  return request({
    url: "/HR/getresourceList",
    method: "get",
    data: pa
  });
}
export function getDetail(pa) {
  return request({
    url: "/HR/getDetail",
    method: "get",
    data: pa
  });
}
export function getRecruitList(pa) {
  return request({
    url: "/HR/getRecruitList",
    method: "get",
    data: pa
  });
}
