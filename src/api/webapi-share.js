import { GetHttp, GetHttp_Net } from "../utils/http";

export function getAll(pa) {
  pa = Object.assign(pa, { method: "getall" });
  return GetHttp_Net("back_post", "/share", "post", pa);
}

//添加盖章申请信息
export function add(pa) {
  pa = Object.assign(pa, { method: "add_currentstamp" });
  return GetHttp_Net("back_post", "/share", "post", pa);
}
export function addSummit(pa) {
  pa = Object.assign(pa, { method: "add_stamprecords" });
  return GetHttp_Net("back_post", "/share", "post", pa);
}

export function addShareReimebursement(pa) {
  pa = Object.assign(pa, { method: "add_fin_reimbursement" });
  return GetHttp_Net("back_post", "/fin", "post", pa);
}
//获得费用报销信息pa={page,limit,where}
export function getShareReimubursement(pa) {
  pa = Object.assign(pa, { method: "select_fin_reimbursement" });
  return GetHttp_Net("back_post", "/fin", "post", pa);
  // return GetHttp_Net("back_post", "getShareReimubursement", "post", pa);
}
//添加报销申请信息
export function addShareReimebursement123(pa) {
  return GetHttp_Net("back_post", "addShareReimebursement", "post", pa);
}
//更新报销申请信息{tableName,method,jsonData}
export function updateShareReimebursement(pa) {
  pa = Object.assign(pa, { method: "update_fin_reimbursement" });
  return GetHttp_Net("back_post", "/fin", "post", pa);
}
