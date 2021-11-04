import * as dd from "dingtalk-jsapi";
import {
  getsign,
  getSpaceid,
  startFlow,
  getUserInfo,
  preView
} from "../../../api/webapi-flow.js";
const module = {
  namespaced: true,
  state: {
    //返回字符串
    signStr: {},
    //钉钉上传文件
    attachmentUploadStr: {},
    flowData: {
      //发起人
      startPerson: "",
      //流程版本
      versionID: "",
      //参数
      jsonData: {}
    },
    instanceID: "",
    viewData: [],
    attachData: {}
  },
  getters: {
    signStr: state => state.signStr,
    attachmentUploadStr: state => state.attachmentUploadStr,
    getIns: state => state.instanceID,
    getViewData: state => state.viewData,
    getAttachData: state => state.attachData
  },
  mutations: {
    updateAttachment(state, data) {
      state.attachmentUploadStr = data;
    },
    updateSign(state, data) {
      state.signStr = data;
    },
    updateIns(state, data) {
      state.instanceID = data;
    },
    updateOriginatorUserId(state, { userId, versionID, controlJsonData }) {
      state.flowData.startPerson = userId;
      state.flowData.versionID = versionID;
      state.flowData.jsonData = controlJsonData;
    },
    updateViewData(state, data) {
      state.viewData = data;
    }
  },
  actions: {
    networkStartFlowSet(context, { versionID, data }) {
      let ref = {
        startPerson: context.rootState.currentUser.dinCode,
        versionID: versionID,
        jsonData: data
      };
      context.commit("updateOriginatorUserId", ref);
    },
    networkGetUserInfo(context) {
      dd.ready(function() {
        dd.runtime.permission.requestAuthCode({
          corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b", //你们企业钉钉的CORPID
          onSuccess: function(result) {
            {
              let code = result.code;
              context.rootState.currentUser.code = code;
              getUserInfo(code).then(res => {
                if (res.code == 200) {
                  console.log(res.data);
                  context.rootState.currentUser.dinCode = res.data.userid;
                  context.rootState.currentUser.userName = res.data.name;
                  context.rootState.currentUser.mobile = res.data.mobile;
                  context.rootState.currentUser.position = res.data.position;
                  context.rootState.currentUser.department =
                    res.data.department;
                  context.rootState.currentUser.roles = res.data.roles;
                  context.rootState.currentUser.orgName = res.data.deptName;
                }
              });
            }
          },
          onFail: function(err) {
            alert("出错了, " + JSON.stringify(err));
          }
        });
      });
    },
    newworkGetSign(context, urls) {
      getsign(urls)
        .then(res => {
          context.commit("updateSign", res);
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
              "biz.cspace.saveFile",
              "biz.cspace.preview"
            ]
          });
          dd.error(function(err) {
            alert("dd error: " + JSON.stringify(err));
          });
          // dd.biz.user.get({
          //   corpId: context.rootState.currentUser.corpId,
          //   onSuccess: function (info) {

          //     context.rootState.currentUser.dinCode=info.emplId,
          //     context.rootState.currentUser.userName=info.nickName
          //     //logger.e('userGet success: ' + JSON.stringify(info));
          //   },
          //   onFail: function (err) {
          //     console.log(err);
          //     //logger.e('userGet fail: ' + JSON.stringify(err));
          //   }
          // })
        })
        .catch(() => {
          console.log("flowManager：鉴权异常");
        });
    },
    networkGetAttachment(context) {
      getSpaceid(context.rootState.currentUser.dinCode)
        .then(res => {
          let sid = res.spaceid + "";
          dd.ready(function() {
            dd.biz.util.uploadAttachment({
              file: {
                spaceId: sid,
                max: 1
              },
              // space: {
              //   corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b",
              //   spaceId: sid,
              //   max: 1
              // },
              // image: {
              //   multiple: false,
              //   compress: false,
              //   max: 1,
              //   spaceId: sid
              // },
              types: ["file"],
              onSuccess: function(result) {
                context.commit("updateAttachment", result);
              },
              onFail: function(err) {
                context.commit("updateAttachment", err);
              }
            });
          });
        })
        .catch(() => {
          console.log("flowManager:getSpaceid出现异常");
        });
    },
    networkGetAttachment_new(context, name) {
      getSpaceid(context.rootState.currentUser.dinCode)
        .then(res => {
          let sid = res.spaceid + "";
          //context.state.attachData={};
          dd.ready(function() {
            dd.biz.util.uploadAttachment({
              file: {
                spaceId: sid,
                max: 1
              },
              types: ["file"],
              onSuccess: function(result) {
                context.state.attachData[name] = result.data;
                // context.commit("updateAttachment_new", result);
              },
              onFail: function(err) {
                // context.commit("updateAttachment", err);
                console.log(err);
              }
            });
          });
        })
        .catch(() => {
          console.log("flowManager:getSpaceid出现异常");
        });
    },
    networkSetAttach(context) {
      context.state.attachData = {};
    },
    startFlow(context, data) {
      let mydata = Object.assign(data.flowData, {
        startPerson: context.rootState.currentUser.dinCode
      });
      // console.log("--------------------->>>>");
      // console.log(mydata);
      // console.log("--------------------->>>>");
      // console.log("mydata--str->"+JSON.stringify(mydata));
      startFlow(mydata)
        .then(res => {
          //let pdata = JSON.parse(res);
          // console.log("returnValue--->"+JSON.stringify(res));
          if (res.success) {
            let others = Object.assign(data.objData, {
              instanceId: res.msg
            });
            context.dispatch(data.maps, others, {
              root: true
            });
          }
        })
        .catch(() => {
          console.log(
            "startFlow:执行出现异常,或者执行参数有误！请检查:" +
              JSON.stringify(mydata)
          );
        });
    },
    startFlowByJS(context, data) {
      let mydata = Object.assign(data, {
        startPerson: context.rootState.currentUser.dinCode
      });
      return startFlow(mydata);
    },
    preViewAttach(context, data) {
      dd.ready(function() {
        dd.biz.cspace.preview({
          corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b",
          spaceId: data.spaceId,
          fileId: data.fileId,
          fileName: data.fileName,
          fileSize: data.fileSize,
          fileType: data.fileType,
          onSuccess: function() {
            //无，直接在native显示文件详细信息
          },
          onFail: function(err) {
            alert(err);
            // 无，直接在native页面显示具体的错误
          }
        });
      });
    }
  }
};
export default module;
