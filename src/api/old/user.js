import request from "../../utils/ax";
export function login(pa) {
  return request({
    url: "/user/login",
    method: "get",
    data: pa
  });
}

export function getUserList(pa) {
  return request({
    url: "/user/getUserList",
    method: "get",
    data: pa
  });
}

export function getComstomList(pa) {
  return request({
    url: "/user/getComstomList",
    method: "get",
    data: pa
  });
}

export function getLists(pa) {
  return request({
    url: "/user/getList",
    method: "get",
    data: pa
  });
}

export function gettest(pa) {
  return request({
    url: "/user/gettest",
    method: "get",
    data: pa
  });
}
