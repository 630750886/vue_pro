import ax from "axios";
import qs from "qs";
import { Message } from "element-ui";

// if(process.env.NODE_ENV === 'production'){
//     ax.defaults.baseURL=this.GLOBAL;//"http://localhost:9090/main/";

// }
ax.defaults.timeout = 90000;
//是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书
ax.defaults.withCredentials=false

let service = ax.create();

service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.transformRequest = [
      function(data) {
        return qs.stringify(data);
      }
    ];
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.status;
    if (res !== 200) {
      Message({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);
export default service;
