import { GetHttp } from "../utils/http";
//工作组
export function getCurrWorkGroup(pa) {
  return GetHttp("java_post", "/pro/cmgroupwork/findcurrperson", "post", pa);
}
export function getHistoryWorkGroup(pa) {
  return GetHttp("java_post", "/pro/cmgroupwork/findpreperson", "post", pa);
}
export function addWorkGroup(pa) {
  return GetHttp("java_post", "/pro/cmgroupwork/adds", "post", pa);
}
export function upWorkGroup(pa) {
  return GetHttp("java_post", "/pro/cmgroupwork/edits", "post", pa);
}
export function delWorkGroup(pa) {
  return GetHttp("java_post", "/pro/cmgroupwork/deletes", "post", pa);
}
//项目计划
export function getWorkPlanByKeyid(pa) {
  return GetHttp("java_post", "/pro/cmworkplan/findbykeyid", "post", pa);
}
export function getWorkPlanByWhere(pa) {
  return GetHttp("java_post", "/pro/cmworkplan/findwhere", "post", pa);
}
export function getWorkPlanDataList(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/findwhere", "post", pa);
}
export function addWorkPlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplan/adds", "post", pa);
}
export function addWorkPlanDataList(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/adds", "post", pa);
}
export function upWorkPlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplan/edits", "post", pa);
}
export function delWorkPlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplan/deletes", "post", pa);
}

export function delWorkPlanpkid(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/deletesbypkid", "post", pa);
}

//deletesbypkid

//项目联系人
export function getContacts(pa) {
  return GetHttp("java_post", "/pro/cmprojectcontact/findwhere", "post", pa);
}
export function addContact(pa) {
  return GetHttp("java_post", "/pro/cmprojectcontact/adds", "post", pa);
}
export function delContact(pa) {
  return GetHttp("java_post", "/pro/cmprojectcontact/deletes", "post", pa);
}
export function upContact(pa) {
  return GetHttp("java_post", "/pro/cmprojectcontact/edits", "post", pa);
}
//收集资料
export function getMaterials(pa) {
  return GetHttp("java_post", "/pro/cmcollectingdata/findwhere", "post", pa);
}
export function addMaterial(pa) {
  return GetHttp("java_post", "/pro/cmcollectingdata/adds", "post", pa);
}
export function upMaterial(pa) {
  return GetHttp("java_post", "/pro/cmcollectingdata/edits", "post", pa);
}
export function delMaterial(pa) {
  return GetHttp("java_post", "/pro/cmcollectingdata/deletes", "post", pa);
}
//项目回访
export function getReturnMaterials(pa) {
  return GetHttp("java_post", "/pro/cmpayvisit/findwhere", "post", pa);
}
export function addReturnMaterial(pa) {
  return GetHttp("java_post", "/pro/cmpayvisit/adds", "post", pa);
}
export function delReturnMaterial(pa) {
  return GetHttp("java_post", "/pro/cmpayvisit/deletes", "post", pa);
}
export function upReturnMaterial(pa) {
  return GetHttp("java_post", "/pro/cmpayvisit/edits", "post", pa);
}
//项目产值 
//项目的Keyid查询
export function getoutvalue(pa) {
  return GetHttp("java_post", "/pro/projectoutputvalue/findbypkeyid", "post", pa);
}
export function addoutvalue(pa) {
  return GetHttp("java_post", "/pro/projectoutputvalue/adds", "post", pa);
}
export function deloutvalue(pa) {
  return GetHttp("java_post", "/pro/projectoutputvalue/deletes", "post", pa);
}
export function upoutvalue(pa) {
  return GetHttp("java_post", "/pro/projectoutputvalue/edits", "post", pa);
}
