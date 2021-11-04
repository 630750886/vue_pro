import request from "../../utils/ax";

export function getqueryList(pa) {
  return request({
    url: "/finance/getqueryList",
    method: "get",
    data: pa
  });
}

export function getapplyList(pa) {
  return request({
    url: "/finance/getapplyList",
    method: "get",
    data: pa
  });
}
