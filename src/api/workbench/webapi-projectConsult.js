import { GetHttp } from "../../utils/http";

//获取项目服务计划
export function getServicePlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/findwhere", "post", pa);
}
/**
 *  现场踏勘
 * @param pa 参数
 */
export function getSiteSurveys(pa) {
  return GetHttp("java_post", "/pro/ccspottrip/findwhere", "post", pa);
}
export function addSiteSurvey(pa) {
  return GetHttp("java_post", "/pro/ccspottrip/adds", "post", pa);
}
export function delSiteSurvey(pa) {
  return GetHttp("java_post", "/pro/ccspottrip/deletes", "post", pa);
}
export function upSiteSurvey(pa) {
  return GetHttp("java_post", "/pro/ccspottrip/edits", "post", pa);
}

/**
 * 会商谈判
 */
export function getNegtiates(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/findwhere", "post", pa);
}
export function addNegtiate(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/adds", "post", pa);
}
export function delNegtiate(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/deletes", "post", pa);
}
export function upNegtiate(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/edits", "post", pa);
}

/**
 * 组织评审
 */
export function getReviews(pa) {
  return GetHttp("java_post", "/pro/ecreviewing/findwhere", "post", pa);
}
export function addReview(pa) {
  return GetHttp("java_post", "/pro/ecreviewing/adds", "post", pa);
}
export function delReview(pa) {
  return GetHttp("java_post", "/pro/ecreviewing/deletes", "post", pa);
}
export function upReview(pa) {
  return GetHttp("java_post", "/pro/ecreviewing/edits", "post", pa);
}
/**
 * 编制及出具报告  ecreports
 */
export function getReports(pa) {
  return GetHttp("java_post", "/pro/ecreports/findwhere", "post", pa);
}
export function addReport(pa) {
  return GetHttp("java_post", "/pro/ecreports/adds", "post", pa);
}
export function delReport(pa) {
  return GetHttp("java_post", "/pro/ecreports/deletes", "post", pa);
}
export function upReport(pa) {
  return GetHttp("java_post", "/pro/ecreports/edits", "post", pa);
}
/**
 *办理行政许可  eclicensing
 */
export function getAdministrativeLicensings(pa) {
  return GetHttp("java_post", "/pro/eclicensing/findwhere", "post", pa);
}
export function addAdministrativeLicensing(pa) {
  return GetHttp("java_post", "/pro/eclicensing/adds", "post", pa);
}
export function delAdministrativeLicensing(pa) {
  return GetHttp("java_post", "/pro/eclicensing/deletes", "post", pa);
}
export function upAdministrativeLicensing(pa) {
  return GetHttp("java_post", "/pro/eclicensing/edits", "post", pa);
}

/**
 *其他服务  ecotherService
 */

export function getOtherServicess(pa) {
  return GetHttp("java_post", "/pro/ecotherservice/findwhere", "post", pa);
}
export function addOtherServices(pa) {
  return GetHttp("java_post", "/pro/ecotherservice/adds", "post", pa);
}
export function delOtherServices(pa) {
  return GetHttp("java_post", "/pro/ecotherservice/deletes", "post", pa);
}
export function upOtherServices(pa) {
  return GetHttp("java_post", "/pro/ecotherservice/edits", "post", pa);
}
