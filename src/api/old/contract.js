import request from "../../utils/ax";

export function getqueryList(pa) {
  return request({
    url: "/contract/getqueryList",
    method: "get",
    data: pa
  });
}

export function getapplyList(pa) {
  return request({
    url: "/contract/getapplyList",
    method: "get",
    data: pa
  });
}
