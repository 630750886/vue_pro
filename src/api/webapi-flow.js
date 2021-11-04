import { GetHttp_Net } from "../utils/http";

//获得所有人员信息
export function getAllVersion(pa) {
  return GetHttp_Net("back_get", "getallversion", "get", pa);
}
export function sendMsg1(pa) {
  return GetHttp_Net("back_post", "sendmsg", "post", pa);
}
export function getsign(urls) {
  return GetHttp_Net("back_get", "getsign?url=" + urls, "get", null);
}
export function getSpaceid(dingtalkid) {
  return GetHttp_Net(
    "back_get",
    "getspaceid?dingtalkid=" + dingtalkid,
    "get",
    null
  );
}
export function getUserInfo(code) {
  return GetHttp_Net(
    "back_get",
    "getdingtalkuserinfo?code=" + code,
    "get",
    null
  );
}
//得到所有版本信息
export function getExecuteStep(pa) {
  return GetHttp_Net("back_get", "getallversion", "get", pa);
}
//得到流程执行环节信息
export function getFlowExecute(versionid) {
  return GetHttp_Net(
    "back_get",
    "getflowexecute?versionid=" + versionid,
    "get",
    null
  );
}
/*修改版本环节 POST方法
<param name="row">执行环节JSON</param>
<param name="type">类型add,modify</param>
*/

export function modifyFlowExecute(pa) {
  return GetHttp_Net("back_get", "modifyflowexecute", "post", pa);
}

export function getAllPerson() {
  return GetHttp_Net("back_get", "getallperson", "get", null);
}
/*pa={startPerson:'',versionID:'',jsonData:''}发起流程 */
export function startFlow(pa) {
  return GetHttp_Net("back_post", "startflow", "post", pa);
}
/*根据实例ID得到附件列表*/
export function preView(instanceid) {
  return GetHttp_Net(
    "back_get",
    "preview?instanceid=" + instanceid,
    "get",
    null
  );
}
export function delNode(pa) {
  return GetHttp_Net("back_post", "delFlowNode", "post", pa);
}
export function writelog(pa) {
  return GetHttp_Net("back_post", "writelog", "post", pa);
}
//
export function uploadFile(urls) {
  return GetHttp_Net("back_post", "getsign?url=" + urls, "get", null);
}
//得到流程发起参数
export function getIns(instanceid) {
  return GetHttp_Net(
    "back_post",
    "getparam?instanceid=" + instanceid,
    "get",
    null
  );
}
