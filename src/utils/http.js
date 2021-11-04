import req from "./ax";
import qs from "qs";
import req_Net from "./ax_Net";
let api = {};
if (process.env.NODE_ENV === "production") {
  //生产环境
  api = {
    back_get: "http://47.108.167.248:8081/main/api/",
    back_post: "http://47.108.167.248:8081/main/api/",
    java_post: "http://47.108.167.248:7777/hdpmwork/"
  };
} else {
  //开发环境
  api = {
    back_get:  "http://47.108.167.248:8081/main/api/",
    back_post: "http://47.108.167.248:8081/main/api/",
    java_post: "http://182.43.223.185:8080/hdpmwork/",
    //java_post: "http://1.15.177.230:7777/hdpmwork/"
  };
}

export function GetHttp(mods, url, method, params) {
  switch (mods) {
    case "back_get":
      req.defaults.baseURL = api.back_get;
      localStorage.setItem("lang", "net");
      break;
    case "back_post":
      req.defaults.baseURL = api.back_post;
      localStorage.setItem("lang", "net");
      break;
    case "java_post":
      req.defaults.baseURL = api.java_post;
      localStorage.setItem("lang", "java");
      break;
    default:
      req.defaults.baseURL = api.back;
      break;
  }
  let mypa = {
    url: url,
    method: method
  };
  if (params && method.toLowerCase() === "post") {
    mypa = {
      url: url,
      method: method,
      data: params,
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    };
  }
  return new Promise((resolve, reject) => {
    req(mypa)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function GetHttp_Net(mods, url, method, params) {
  switch (mods) {
    case "back_get":
      req_Net.defaults.baseURL = api.back_get;
      break;
    case "back_post":
      req_Net.defaults.baseURL = api.back_post;
      break;
    default:
      req_Net.defaults.baseURL = api.back;
      break;
  }

  let mypa = {
    url: url,
    method: method
  };
  if (params && method.toLowerCase() === "post") {
    mypa = {
      url: url,
      method: method,
      data: params,
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    };
  }
  return new Promise((resolve, reject) => {
    req_Net(mypa)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
