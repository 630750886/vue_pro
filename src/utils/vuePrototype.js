import Vue from "vue";
import MyConfig from "./MyConfig";
import MyFunction from "./myFunction";
import echarts from "echarts";

import myFlow from "./myFlow";
import axios from "axios";
import Store from "../store";

Vue.prototype.$configs = MyConfig;
Vue.prototype.$myfunction = MyFunction;
Vue.prototype.$echarts = echarts;
Vue.prototype.$flow = myFlow;
Vue.prototype.$http = axios;
axios.defaults.baseURL = "/capi";
Vue.prototype.$store = Store;
String.prototype.bool = function(str) {
  if (str !== undefined) {
    if (this == str || this === str) {
      return true;
    } else {
      return false;
    }
  } else {
    return /^true$/i.test(this);
  }
};
Vue.prototype.session = {
  setItem: function(key, value) {
    let ref = { value: value };
    sessionStorage.setItem(key, JSON.stringify(ref));
  },
  getItem: function(key) {
    let value = sessionStorage.getItem(key);
    return value ? JSON.parse(value).value : JSON.parse(value);
  },
  removeItem: function(key) {
    if (Array.isArray(key)) {
      key.forEach(item => {
        if (this.getItem(item)) {
          sessionStorage.removeItem(item);
        }
      });
    } else {
      if (this.getItem(key)) {
        sessionStorage.removeItem(key);
      }
    }
  }
};
