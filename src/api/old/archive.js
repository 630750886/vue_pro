import request from "../../utils/ax";

export function getqueryList(pa) {
  return request({
    url: "/archive/getqueryList",
    method: "get",
    data: pa
  });
}

export function getapplyList(pa) {
  return request({
    url: "/archive/getapplyList",
    method: "get",
    data: pa
  });
}
