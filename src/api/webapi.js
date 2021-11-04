import request from "../utils/ax";
import { GetHttp, GetHttp_Net } from "../utils/http";

/*获取组织结构*/
export function getOrgTree() {
  return GetHttp_Net("back_get", "getOrgTree", "get");
}

/*添加组织结构
let pa = {
          keyid: guid,//主键ID
          orgName: this.addform.orgName,//组织名称
          parentId: this.addform.mydata.id //父类ID
        };
*/
export function addOrgTree(pa) {
  return GetHttp_Net("back_post", "addOrgTree", "post", pa);
}

/*修改组织结构
let pa = {
          keyid: guid,//主键ID
          orgName: this.addform.orgName,//组织名称
          parentId: this.addform.mydata.id //父类ID
        };
*/
export function modifyOrgTree(pa) {
  return GetHttp_Net("back_post", "modifyOrgTree", "post", pa);
}

/*获取岗位信息
let pa = {
           page: 1,//页码
           limit: 30,//每页显示行数
           filter: ""//过滤条件
        };
*/
export function getPos(pa) {
  return GetHttp_Net("back_get", "getPos", "post", pa);
}

export function addPos(pa) {
  return GetHttp_Net("back_post", "addPos", "post", pa);
}

export function modifyPos(pa) {
  return GetHttp_Net("back_post", "modifyPos", "post", pa);
}

export function delPos(pa) {
  return GetHttp_Net("back_post", "delPos", "post", pa);
}

/*得到用户信息 pa为loginName 格式为 {loginName:'abc'} */
export function getUserbyLoginName(pa) {
  return GetHttp_Net("back_get", "getuserbyid?loginName=" + pa, "get", pa);
}

/*pa 可以不传 返回值为{total:10,rows:[{}]} 其中total为总行数，rows为具体数据*/
export function getAllUser(pa) {
  return GetHttp_Net("back_get", "Getalluser", "get", pa);
}

/**添加用户基本信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的userinfo字段一致*/
export function addUser(pa) {
  return GetHttp_Net("back_post", "adduser", "post", pa);
}

export function updateUser(pa) {
  return GetHttp_Net("back_post", "updateuser", "post", pa);
}

/**添加用户学历信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的y_education字段一致*/
export function addEducation(pa) {
  return GetHttp_Net("back_post", "addeducation", "post", pa);
}

export function updateEducation(pa) {
  return GetHttp_Net("back_post", "updateeducation", "post", pa);
}

/**添加荣誉信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的y_education字段一致*/
export function addHonor(pa) {
  return GetHttp_Net("back_post", "addhonor", "post", pa);
}

export function updateHonor(pa) {
  return GetHttp_Net("back_post", "updateHonor", "post", pa);
}

/**添加用户保险信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的y_education字段一致*/
export function addInsurance(pa) {
  return GetHttp_Net("back_post", "addinsurance", "post", pa);
}

export function updateInsurance(pa) {
  return GetHttp_Net("back_post", "updateInsurance", "post", pa);
}

/**添加用户学历信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的y_education字段一致*/
export function addTitle(pa) {
  return GetHttp_Net("back_post", "addtitle", "post", pa);
}

export function updateTitle(pa) {
  return GetHttp_Net("back_post", "updatetitle", "post", pa);
}

/**添加社保公积金信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的y_education字段一致*/
export function addSocialfund(pa) {
  return GetHttp_Net("back_post", "addsocialfund", "post", pa);
}

export function updateSocialfund(pa) {
  return GetHttp_Net("back_post", "updatesocialfund", "post", pa);
}

/**添加执行信息 pa格式为{row:JSON.stringify(mydata)} 其中mydata与数据库中的y_education字段一致*/
export function addPractice(pa) {
  return GetHttp_Net("back_post", "addPractice", "post", pa);
}

export function updatePractice(pa) {
  return GetHttp_Net("back_post", "updatePractice", "post", pa);
}
/**添加人员岗位信息*/
export function addPersonPos(pa) {
  return GetHttp_Net("back_post", "adduserpos", "post", pa);
}
/**修改人员岗位信息*/
export function upPersonPos(pa) {
  return GetHttp_Net("back_post", "modifypos", "post", pa);
}
/**删除人员岗位信息*/
export function delPersonPos(pa) {
  return GetHttp_Net("back_post", "deluserpos?keyid=" + pa, "post", pa);
}

// export function getAllVersion(pa) {
//   return GetHttp("back_get", "getallversion", "get", pa);
// }
// export function sendMsg1(pa){
//   return GetHttp("back_post", "sendmsg", "post", pa);
// }
// export function getsign(urls){
//   return GetHttp("back_get","getsign?url="+urls,"get",null);
// }
// export function getSpaceid(){
//   return GetHttp("back_get","getspaceid","get",null);
// }
