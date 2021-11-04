import request from "../../utils/ax";
import { GetHttp } from "../../utils/http";
export function getInstanceExceteSteps(pa) {
  return GetHttp("bpm", "getinstanceexecutestep", "post", pa);
}
export function createInstance(pa) {
  return GetHttp("bpm", "createInstance", "post", pa);
}
export function getprocessinstance(pa) {
  return GetHttp("bpm", "getprocessinstance", "post", pa);
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
