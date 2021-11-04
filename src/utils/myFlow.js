import * as dd from "dingtalk-jsapi";
import { mapGetters, mapState } from "vuex";
import { getsign, getSpaceid } from "../api/webapi-flow.js";
let myFlowFun = {
  authentication: function() {
    let urls = location.href;
    getsign(urls).then(res => {
      dd.config({
        agentId: res.agentId, // 必填，微应用ID
        corpId: res.corpId, //必填，企业ID
        timeStamp: res.timeStamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          "device.notification.alert",
          "device.notification.confirm",
          "biz.contact.choose",
          "device.notification.actionSheet",
          "biz.user.get",
          "device.notification.toast",
          "biz.util.uploadImage",
          "biz.customContact.multipleChoose",
          "biz.contact.choose",
          "biz.util.uploadAttachment",
          "biz.cspace.saveFile"
        ]
      });
      dd.error(function(err) {
        alert("dd error: " + JSON.stringify(err));
      });
    });
  },
  getSpace: async function() {
    const res = await getSpaceid();
    return res.spaceid + "";
  },
  attachmentByImg() {
    dd.biz.cspace.saveFile({
      corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b",
      url: "http://ngrok.hd-zx.cn:8081/uploads/123.txt",
      name: "sql测试文本",
      onSuccess: function(data) {
        console.log(JSON.stringify(data));
      },
      onFail: function(err) {
        console.log("saveFileError:" + JSON.stringify(err));
      }
    });
  },
  attachmentUpload: function() {
    getSpaceid().then(res => {
      let sid = res.spaceid + "";
      dd.ready(function() {
        dd.biz.util.uploadAttachment({
          file: {
            spaceId: sid,
            max: 1
          },
          types: ["file"],
          onSuccess: function(result) {
            let res = {
              code: 0,
              data: JSON.stringify(result)
            };
            localStorage.setItem("attachment", res);
            // console.log(res, JSON.stringify(result));
          },
          onFail: function(err) {
            //alert("error:" + JSON.stringify(err));
            let res = {
              code: 1,
              data: JSON.stringify(err)
            };
            localStorage.setItem("attachment", res);
          }
        });
      });
    });
  }
};
export default myFlowFun;
