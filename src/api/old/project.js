import request from "../../utils/ax";

export function getqueryList(pa) {
  return request({
    url: "/project/getqueryList",
    method: "get",
    data: pa
  });
}

export function getresourceList(pa) {
  return request({
    url: "/project/getresourceList",
    method: "get",
    data: pa
  });
}
