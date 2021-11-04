import request from "../../utils/ax";

export function getbiddingList(pa) {
  return request({
    url: "/bidding/getbiddingList",
    method: "get",
    data: pa
  });
}

export function getInviteList(pa) {
  return request({
    url: "/bidding/getInviteList",
    method: "get",
    data: pa
  });
}

export function getDetail(pa) {
  return request({
    url: "/bidding/getDetail",
    method: "get",
    data: pa
  });
} //getTenderList  getSealList
export function getTenderList(pa) {
  return request({
    url: "/bidding/getTenderList",
    method: "get",
    data: pa
  });
}
export function getSealList(pa) {
  return request({
    url: "/bidding/getSealList",
    method: "get",
    data: pa
  });
}
