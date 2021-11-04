import rou from "./router/index";
import store from "./store/index.js";
rou.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else if (store.getters.getCurrentuser.token !== "") {
    //判断当前是否存在token
    store.getters.getCurrentuser.currentPath = to.path;
    next();
  } else {
    next({
      path: "/login",
      query: { redirect: to.fullPath } // 将要跳转路由的path作为参数，传递到登录页面
    });
  }
});
