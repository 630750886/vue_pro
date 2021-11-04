import request from "../../utils/ax";

export function getCustomerList(pa) {
  return request({
    url: "/customer/getList",
    method: "get",
    data: pa
  });
}
export function getGroupByList(pa) {
  return request({
    url: "/customer/getGroupByList",
    method: "get",
    data: pa
  });
}

export function getRelationShipList(pa) {
  return request({
    url: "/customer/getRelationShipList",
    method: "get",
    data: pa
  });
}
export function getBussinessList(pa) {
  return request({
    url: "/customer/getBussinessList",
    method: "get",
    data: pa
  });
}
export function getRowDetail(pa) {
  return request({
    url: "/customer/getRowDetail",
    method: "get",
    data: pa
  });
}
//得到回访信息
export function getVisitList(pa) {
  return request({
    url: "/customer/getVisitList",
    method: "get",
    data: pa
  });
}
