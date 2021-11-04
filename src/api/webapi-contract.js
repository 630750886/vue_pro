import { GetHttp } from "../utils/http";
/*业务合同*/
//获取业务合同  dbc_outexcel

//合同的类型导出
export function getdbc_outexcel(pa) {
  return GetHttp("java_post", "agr/busicontractbase/dbc_outexcel", "post", pa);
}

//advancedqueryjson
export function getbuscontractjson(pa) {
  return GetHttp("java_post", "agr/busicontractbase/advancedqueryjson", "post", pa);
}

export function getBusContract(pa) {
  return GetHttp("java_post", "agr/busicontractbase/advancedquery", "post", pa);
}
export function getBusById(pa) {
  return GetHttp("java_post", "agr/busicontractbase/findbykeyid", "post", pa);
}
//添加
export function addBusContract(pa) {
  return GetHttp("java_post", "agr/busicontractbase/adds", "post", pa);
}
//修改
export function upBusContract(pa) {
  return GetHttp("java_post", "agr/busicontractbase/edits", "post", pa);
}

export function dbc_analydes(pa){
  return GetHttp("java_post", "agr/busicontractbase/dbc_analydes", "post", pa);
}


/*非业务合同*/
//获取所有非业务合同
export function getNonBusContract(pa) {
  return GetHttp(
    "java_post",
    "nonagr/contractbaseInfo/advancedquery",
    "post",
    pa
  );
}
//advancedqueryjson
export function getNonBusContractjson(pa) {
  return GetHttp(
    "java_post",
    "nonagr/contractbaseInfo/advancedqueryjson",
    "post",
    pa
  );
}

export function getNonBusById(pa) {
  return GetHttp(
    "java_post",
    "nonagr/contractbaseInfo/findbykeyid",
    "post",
    pa
  );
}
//添加
export function addNonBusContract(pa) {
  return GetHttp("java_post", "nonagr/contractbaseInfo/adds", "post", pa);
}
//修改
export function upNonBusContract(pa) {
  return GetHttp("java_post", "nonagr/contractbaseInfo/edits", "post", pa);
}
//合同拟定及审批（协议拟定及审批）
export function getContractDetailsCard(pa) {
  return GetHttp("java_post", "agr/contractstudyout/findwhere", "post", pa);
}
export function addContractDetailsCard(pa) {
  return GetHttp("java_post", "agr/contractstudyout/adds", "post", pa);
}
export function upContractDetailsCard(pa) {
  return GetHttp("java_post", "agr/contractstudyout/edits", "post", pa);
}
export function delContractDetailsCard(pa) {
  return GetHttp("java_post", "agr/contractstudyout/deletes", "post", pa);
}

/**
 * 合同完成申请
 */
export function confirmContract(pa) {
  return GetHttp("java_post", "agr/contractturnover", "post", pa);
}

/**
 * 保证金
 * gatherContract 收取保证金
 * depositContract 缴纳保证金
 */
export function gatherContract(pa) {
  return GetHttp("java_post", "agr/contractturnover", "post", pa);
}
export function depositContract(pa) {
  return GetHttp("java_post", "agr/contractturnover", "post", pa);
}
