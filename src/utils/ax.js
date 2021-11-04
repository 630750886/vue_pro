import ax from "axios";
//import qs from "qs";
import { Message } from "element-ui";
import store from "../store/index.js";
import router from "../router/index.js";
import Vue from "vue";
let _this = new Vue();

//if(process.env.NODE_ENV === 'production'){
//ax.defaults.baseURL=this.GLOBAL;//"http://localhost:9090/main/";}
//超时设置
ax.defaults.timeout = 100000;
ax.defaults.withCredentials=true

//网络单实例网络请求服务 创建
const service = ax.create();
//请求预处理
service.interceptors.request.use(
  config => {
    //放行登录请求（表单和钉钉登录服务）
    if (
      config.url.indexOf("/sys/sysauth/dklogin") === -1 &&
      config.url.indexOf("/sys/sysauth/login") === -1
    ) {
      if (store.state.currentUser.token === "") {
        router.push("/login");
        return;
      }
    }

    if (
      config.url.slice(config.url.length - 11, config.url.length) ===
      "/fileUpload"
    ) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
      config.headers["authjwttoken"] = store.state.currentUser.token;
      config.headers["poskey"] = store.state.currentUser.postId;
      config.transformRequest = [
        function(data) {
          if (
            config.url.slice(config.url.length - 5, config.url.length) ===
            "/adds"
          ) {
            let ref = {
              sysorgadminkeyid: store.state.currentUser.orgId,
              sysorgadminname: store.state.currentUser.orgName,
              syscreatepersonid: store.state.currentUser.personId,
              syscreatepersonname: store.state.currentUser.userName,
              allstatuscode: "0"
            };
            if (!_this.$myfunction.isEmpty(data.allstatuscode)) {
              ref.allstatuscode = data.allstatuscode;
            }
            Object.assign(data, ref);
          }
          //console.log("begin request...！"+new Date().getTime());
          return JSON.stringify(data);
        }
      ];
    }

    //config.headers["Content-Type"] = "application/json";
    // config.transformRequest=[function(data){return qs.stringify(data)}];
    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    // config.transformRequest=[function(data){return qs.stringify(data)}];

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
      //console.log("end get data service！"+new Date().getTime());
      const res = response.status;
      if (res=== 401) {
        router.push({path:"/login", replace: true});
        return Promise.reject(response);
      }
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
      return Promise.reject(error);
  }
);

export default service;
