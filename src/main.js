import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueFunction from "./utils/vueFunction.js";
import uploader from "vue-simple-uploader";
import "./utils/vuePrototype.js";
import "./plugins/element.js";
import "./components/myTemplate/index.js";
import "lib-flexible/flexible";
import "./utils/auth.js";
import "./premisstion";
import { Message, MessageBox } from "element-ui";
import JsonExcel from 'vue-json-excel'
import moment from 'moment'//导入文件
import 'default-passive-events'
//在项目中安装fontawesome：npm install font-awesome --save
//在main.js中引入相关的文件
//在需要使用的地方，class=“fa 类名”，请注意一定要在前面添加fa类，否则无法正常显示；
//brands 样式，前缀为：fab
//regular 样式，前缀为：far
//solid 样式，前缀为：fas
import "font-awesome/css/font-awesome.min.css"

//import UmyUi from 'umy-ui'
//import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
//Vue.use(UmyUi);

Vue.component('downloadExcel', JsonExcel)
localStorage.setItem("lang", "java");
Vue.config.productionTip = false;

Vue.use(uploader);
Vue.use(vueFunction);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.mymoment = moment;//赋值使用
Vue.filter('datefmt',function (input,fmtstring) {//当input为时间戳，需转为Number类型
    if(input){
      return moment(input).format(fmtstring);
  }else{
      return "";
  }
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
