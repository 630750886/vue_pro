import { GetHttp } from "../utils/http";
/*客户信息*/
//获取所有客户信息
export function getAllCustomer(pa) {
  return GetHttp("java_post", "crm/consumer/advancedquery", "post", pa);
}

export function AllOutCustomer(pa) {
  return GetHttp("java_post", "crm/consumer/vfindall", "post", pa);
}

//advancedqueryjson
export function AlljsonCustomer(pa) {
  return GetHttp("java_post", "crm/consumer/advancedqueryjson", "post", pa);
}
export function get_an_Customer(pa) {
  return GetHttp("java_post", "crm/consumer/analysis", "post", pa);
} 

//根据id获取单个客户信息  get_an_Customer
export function getCustomerById(pa) {
  return GetHttp("java_post", "crm/consumer/findbykeyid", "post", pa);
}
export function queryCustomer(pa) {
  return GetHttp("java_post", "crm/consumer/advancedquery", "post", pa);
}
export function addCustomer(pa) {
  return GetHttp("java_post", "/crm/consumer/adds", "post", pa);
}
export function upCustomer(pa) {
  return GetHttp("java_post", "/crm/consumer/edits", "post", pa);
}
export function workRemind(pa) {
  return GetHttp("java_post", "updatecustomer", "post", pa);
}
//客户联系人
export function getContact(pa) {
  return GetHttp("java_post", "/crm/conscontacts/findbyclista", "post", pa);
}
export function addContact(pa) {
  return GetHttp("java_post", "/crm/conscontacts/addspre", "post", pa);
}
export function upContact(pa) {
  return GetHttp("java_post", "/crm/conscontacts/edits", "post", pa);
}
export function signContact(pa) {
  return GetHttp("java_post", "updatecustomercontact", "post", pa);
}
/*客户维护*/
//获取台账信息 可用
export function getRegisterList(pa) {
  return GetHttp("java_post", "crm/consumerserves/advancedquery", "post", pa);
}
//根据keyid获取基本信息 可用
export function getRegisterByKeyId(pa) {
  return GetHttp("java_post", "crm/consumerserves/findbykeyid", "post", pa);
}
//新增回访 可用
export function addCustomerReturn(pa) {
  return GetHttp("java_post", "/crm/consumerserves/adds", "post", pa);
}
//回访登记
export function upCustomerReturn(pa) {
  return GetHttp("java_post", "/crm/consumerserves/edits", "post", pa);
}
export function addExamineResult(pa) {
  return GetHttp("java_post", "/crm/auditresult/adds", "post", pa);
}
//获取审核结果
export function getExamineResult(pa) {
  return GetHttp("java_post", "/crm/auditresult/findwhere", "post", pa);
}
