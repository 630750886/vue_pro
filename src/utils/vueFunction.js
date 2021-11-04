import Vue from "vue";
import store from "../store/index.js";
import * as dd from "dingtalk-jsapi";
import ddConfig from "./MyConfig.js";

const _this = new Vue();
import { GetHttp, GetHttp_Net } from "./http";
import { startFlow } from "../api/webapi-flow.js";
import { getSpaceid } from "../api/webapi-flow.js";

export default {
  install(Vue, options) {
    /**
     * 备案流程
     * @param successCode 审核通过后的值
     * @param errorCode 审核失败的值
     * @param baseId 系统数据的keyid
     * @param baseUrl 后台接口
     * @param baseColumn 需要更改的数据字段
     * @param flowId 流程的实例id
     * @param fType 流程类型
     * @returns {Promise<any>}
     */
    Vue.prototype.ddflow = function(
      successCode,
      errorCode,
      { baseId, baseUrl, baseColumn, flowId, fType }
    ) {
      let flow = {
        entityKeyid: baseId, //实体ID
        entityUrl: baseUrl, //实体URL
        changeColumn: baseColumn, //更新字段
        flowInstance: flowId, //流程实例id
        typeCode: fType, //类型编号
        flowsuccess: successCode + "", //审核通过修改状态
        flowerror: errorCode + "" //审核未通过修改状态
      };
      return GetHttp("java_post", "/flow/flowinstanceinfo/adds", "post", flow);
    };
    /**
     *钉钉表单构造
     * @param vId 流程编号
     * @param c 合同 Object {code,name} code：合同编号，name：合同名称
     * @param i 项目 Object {code,name} code：项目编号，name：合同名称
     * @param signList 单行文本集 Array [{name,value}],其中name表示钉钉流程框对应名称，value：文本框的数据
     * @param muitList 多行文本集 Array [{name,value}],其中name表示钉钉文本框对应名称，value：文本框的数据
     * @param fileList 附件集 Array [{name,value}],其中name表示钉钉流程附件对应名称，value：附件信息
     * @param moneyList 金额集 Array [{name,value}],其中name表示钉钉流程附件对应名称，value：值
     * @param numList 数字集 Array [{name,value}],其中name表示钉钉流程附件对应名称，value：值
     * @returns {Promise<any>} 返回 一个流程实例id
     */
    Vue.prototype.ddform = function(
      vId,
      { c, i, signList, muitList, fileList, moneyList, numList }
    ) {
      return new Promise(function(resolve, reject) {
        let baseArr = [
          {
            name: "申请时间",
            controlType: "input_sign",
            value: _this.$myfunction.addDayToDate(
              new Date().getTime(),
              0,
              "datetime",
              "-"
            )
          },
          {
            name: "申请组织",
            controlType: "input_sign",
            value: store.state.currentUser.orgName
          },
          {
            name: "申请人",
            controlType: "input_sign",
            value: store.state.currentUser.personName
          }
        ];
        if (c) {
          let contractArr = [
            { name: "合同编号", controlType: "input_sign", value: c.code },
            { name: "合同名称", controlType: "input_sign", value: c.name }
          ];
          baseArr = baseArr.concat(contractArr);
        }
        if (i) {
          let itemArr = [
            { name: "项目编号", controlType: "input_sign", value: i.code },
            { name: "项目名称", controlType: "input_sign", value: i.name }
          ];
          baseArr = baseArr.concat(itemArr);
        }
        if (signList) {
          signList.forEach(item => {
            item.controlType = "input_sign";
            baseArr.push(item);
          });
        }
        if (muitList) {
          muitList.forEach(item => {
            if (item.value) {
              item.controlType = "input_muit";
              baseArr.push(item);
            }
          });
        }
        if (fileList) {
          fileList.forEach(item => {
            let ref = {
              name: item.title,
              controlType: "input_attachment",
              value: item.file
            };
            baseArr.push(ref);
          });
        }
        if (numList) {
          numList.forEach(item => {
            item.controlType = "input_num";
            baseArr.push(item);
          });
        }
        if (moneyList) {
          moneyList.forEach(item => {
            item.controlType = "input_money";
            baseArr.push(item);
          });
        }
        let pa = {
          startPerson: store.state.currentUser.dinCode, //'060057363530796088',
          versionID: vId,
          jsonData: JSON.stringify(baseArr) //这里一定要转换成字符串
        };
        startFlow(pa).then(res => {
          if (res.success) {
            resolve(res.msg);
          } else {
            _this.$msgbox.confirm(res);
          }
        });
      });
    };
    /**
     *上传文件到钉钉
     * @param config:{maxNum,titleMessage},其中maxNum为附件最大数量，titleMessage为提示信息
     * @returns {Promise<any>}
     */
    Vue.prototype.ddfile = function(config = { maxNum: 1, titleMessage: "" }) {
      return new Promise(function(resolve, reject) {
        let dinCode = store.state.currentUser.dinCode;
        if (!_this.$myfunction.isEmpty(dinCode)) {
          if (config.titleMessage !== "") {
            _this.$msgbox.alert("需要上传" + config.titleMessage).then(() => {
              getSpaceid(dinCode).then(res => {
                dd.ready(function() {
                  dd.biz.util.uploadAttachment({
                    file: { spaceId: res.spaceid + "", max: config.maxNum },
                    types: ["file"],
                    onSuccess: function(result) {
                      resolve(result.data);
                    },
                    onFail: function(err) {
                      _this.$message.success("取消上传");
                    }
                  });
                });
              });
            });
          } else {
            getSpaceid(dinCode).then(res => {
              dd.ready(function() {
                dd.biz.util.uploadAttachment({
                  file: { spaceId: res.spaceid + "", max: config.maxNum },
                  types: ["file"],
                  onSuccess: function(result) {
                    resolve(result.data);
                  },
                  onFail: function(err) {
                    _this.$message.success("取消上传");
                  }
                });
              });
            });
          }
        } else {
          _this.$msgbox.alert("没有获取到你的钉钉号，请刷新重试");
        }
      });
    };
    /**
     * 获取一个新的Window监听器
     * @type {{add, remove}}
     */
    Vue.prototype.onWindowResize = function() {
      //事件队列
      let queue = [],
        indexOf =
          Array.prototype.indexOf ||
          function() {
            let i = 0,
              length = this.length;
            for (; i < length; i++) {
              if (this[i] === arguments[0]) {
                return i;
              }
            }
            return -1;
          };
      let isResizing = {}, //标记可视区域尺寸状态， 用于消除 lte ie8 / chrome 中 window.onresize 事件多次执行的 bug
        lazy = true, //懒执行标记
        listener = function(e) {
          //事件监听器
          let h =
              window.innerHeight ||
              (document.documentElement &&
                document.documentElement.clientHeight) ||
              document.body.clientHeight,
            w =
              window.innerWidth ||
              (document.documentElement &&
                document.documentElement.clientWidth) ||
              document.body.clientWidth;

          if (h === isResizing.h && w === isResizing.w) {
            return;
          } else {
            e = e || window.event;

            let i = 0,
              len = queue.length;
            for (; i < len; i++) {
              queue[i].call(this, e);
            }
            (isResizing.h = h), (isResizing.w = w);
          }
        };

      return {
        add: function(fn) {
          if (typeof fn === "function") {
            if (lazy) {
              //懒执行
              if (window.addEventListener) {
                window.addEventListener("resize", listener, false);
              } else {
                window.attachEvent("onresize", listener);
              }
              lazy = false;
            }

            queue.push(fn);
          }
          return this;
        },
        remove: function(fn) {
          if (typeof fn === "undefined") {
            queue = [];
          } else if (typeof fn === "function") {
            let i = indexOf.call(queue, fn);

            if (i > -1) {
              queue.splice(i, 1);
            }
          }
          return this;
        }
      };
    }.call(this);
    /**
     * 获取系统分类
     * @param typeCode 系统分类编号
     */
    Vue.prototype.getSelectByCode = function(typeCode) {
      let code = typeCode + "";
      let ref = {
        code: ""
      };
      if (code.indexOf("TYPE") !== -1) {
        ref.code = code;
      } else {
        ref.code = "TYPE-" + code;
      }
      if (_this.session.getItem(ref.code)) {
        return Promise.resolve({ data: _this.session.getItem(ref.code) });
      } else {
        return GetHttp("java_post", "systypelist/findbycode", "post", ref).then(
          item => {
            _this.session.setItem(ref.code, item.data);
            return { data: item.data };
          }
        );
      }
    };
    /**
     * 级联数据
     * @param typeCode 系统分类编号
     */
    Vue.prototype.getCascaderByCode = function(typeCode) {};
    /**
     * 获取钉钉企业免登录码
     * @returns {Promise<any>} String
     */
    Vue.prototype.ddPowerCode = function() {
      return new Promise(function(resolve, reject) {
        if (dd && dd.env.platform !== "notInDingTalk") {
          dd.ready(function() {
            // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
            dd.runtime.permission.requestAuthCode({
              //修改cropid
              corpId: ddConfig.CorpId,
              onSuccess: function(result) {
                resolve(result.code);
              },
              onFail: function(err) {
                reject(err);
              }
            });
          });
        } else {
          reject();
        }
      });
    };
    /**
     *  获取系统文件在钉钉上的文件信息
     * @param fileKeyid 系统文件id
     * @returns {Promise<Array | never>} 返回一个钉钉文件信息的数组 [{spaceId，fileId,fileName,fileType,fileSize}]
     */
    Vue.prototype.getfile = function(fileKeyid) {
      return _this.ddPowerCode().then(async item => {
        let ref = {
          fileKeyid: fileKeyid,
          userid: store.state.currentUser.dinCode,
          usercode: item
        };
        let { data: file } = await GetHttp(
          "java_post",
          "/dtflow/flowattachfile",
          "post",
          ref
        );
        // _this.$msgbox.confirm(file)
        let arr = [];
        if (Array.isArray(file)) {
          arr.concat(file);
        } else {
          arr.push(file);
        }
        return arr;
      });
    };
    /**
     * 向钉钉用户发送消息
     * @param dinList [String] 钉钉用户id
     * @param userList [String] 人员keyid
     * @param depList [String] 钉钉岗位id
     * @param message String 发送的消息
     * @param isPushAll 是否向全体人员发送
     */
    Vue.prototype.sendOutRemind = function({
      dinList = [],
      userList = [],
      depList = [],
      message,
      isPushAll = false
    }) {
      if (dinList.length > 0) {
        GetHttp("java_post", "/dtmessage/send", "post", {
          userid_list: dinList.join(","),
          messcontext: message
        }).then(item => {
          if (item.code === 200) {
            _this.$message.success("发送成功");
          }
        });
      }
      if (userList.length > 0) {
        userList.forEach(async item => {
          let { data: user } = await GetHttp(
            "java_post",
            "/sys/sysuser/findwhere",
            "post",
            { persionKeyId: item }
          );
          GetHttp("java_post", "/dtmessage/send", "post", {
            userid_list: user[0].dingTalkkeyid,
            messcontext: message
          }).then(item => {
            if (item.code === 200) {
              _this.$message.success("发送成功");
            }
          });
        });
      }
      if (depList.length > 0) {
        let ddCode = [];
        userList.forEach(async item => {
          let { data: user } = await GetHttp(
            "java_post",
            "sysposs/findbykeyid",
            "post",
            { keyid: item }
          );
          ddCode.push(user[0].dinCode);
        });
        if (ddCode.length === depList.length) {
          GetHttp("java_post", "/dtmessage/send", "post", {
            dept_id_list: ddCode.join(","),
            messcontext: message
          }).then(item => {
            if (item.code === 200) {
              _this.$message.success("发送成功");
            }
          });
        }
      }
      if (isPushAll) {
        GetHttp("java_post", "/dtmessage/send", "post", {
          toAllUser: true,
          messcontext: message
        }).then(item => {
          if (item.code === 200) {
            _this.$message.success("发送成功");
          }
        });
      }
    };
    /**
     * 树状表格数据的格式化
     * @param data 传入的数据
     * @param url 请求地址
     * @returns {Promise<*>}
     */
    Vue.prototype.treeTableDataFormat = async function(data = [], url = "") {
      if (!_this.$myfunction.isEmpty(url)) {
        let array = data;
        let copeArray = this.$myfunction.copyData(array);
        for (let i = 0; i <= array.length - 1; i++) {
          if (array[i].allstatusname === "true") {
            let { data: ref } = await GetHttp("java_post", url, "post", {
              pkeyid: array[i].keyid
            });
            array[i].children = ref;
            copeArray.splice(i, 1, array[i]);
            //array[i].allstatusname='false'
            if (!this.$myfunction.isEmpty(array[i].children)) {
              array[i].children = await _this.treeTableDataFormat(
                array[i].children,
                url
              );
            }
          }
        }
        return copeArray;
      }
    };
    /**
     * 获取数据对应的流程
     * @param baseId 数据keyid
     * @param flowType 流程类型
     * @returns {Promise<T | never>} 返回流程实例id
     */
    Vue.prototype.getDataFlow = function(baseId, flowType) {
      let ref = {
        entityKeyid: baseId,
        typeCode: flowType
      };
      return GetHttp(
        "java_post",
        "/flow/flowinstanceinfo/findwhere",
        "post",
        ref
      ).then(item => {
        return item.data[0].flowInstance;
      });
    };
    /**
     * 获取发起流程时的附件
     * @param flowId  流程实例
     * @param filterFile 过滤流程中的附件关键词，默认获取所有
     * @returns {Promise<T | never>}
     */
    Vue.prototype.getFlowFile = function(flowId, filterFile = "") {
      if (filterFile === "") {
        return GetHttp_Net(
          "back_get",
          "preview?instanceid=" + flowId,
          "get",
          null
        ).then(item => {
          return item;
        });
      } else {
        return GetHttp_Net(
          "back_post",
          "getparam?instanceid=" + flowId,
          "get",
          null
        ).then(item => {
          let fileObject = item.find(flowData => {
            return flowData.name === filterFile;
          });
          if (fileObject) {
            return fileObject.value;
          }
        });
      }
    };
    Vue.prototype.downloadFlowFile = function(data) {
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
    };
    Vue.prototype.javaHttp = function(url, formData) {
      return GetHttp("java_post", url, "post", formData);
    };
    /**
     * 该方法是判断用户是否含有这个按钮
     * @param str 按钮的别名
     * @returns {boolean}
     */
    Vue.prototype.btnListIndexOf = function(str) {
      if (str=="FREE")
      {
         return true;
      }
      if (_this.session.getItem("btnList")) {
        return _this.session.getItem("btnList").indexOf(str) !== -1;
      } else {
        return true;
      }
    };
    Vue.prototype.requiredFormRules = function(
      blur = { trigger: [], change: [] }
    ) {
      let rules = {};
      let blurTrigger = {
        required: true,
        message: "必填",
        trigger: "blur"
      };
      let blurChange = {
        required: true,
        message: "必填",
        change: "blur"
      };
      blur.trigger.forEach(item => {
        if (_this.$myfunction.isEmpty(rules[item])) {
          _this.$set(rules, item, []);
        }
        rules[item].push(blurTrigger);
      });
      blur.change.forEach(item => {
        if (_this.$myfunction.isEmpty(rules[item])) {
          _this.$set(rules, item, []);
        }
        rules[item].push(blurChange);
      });
      return rules;
    };
  }
};
