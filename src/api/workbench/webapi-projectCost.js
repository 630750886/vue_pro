import { GetHttp } from "../../utils/http";

//获取项目服务计划
export function getServicePlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/findwhere", "post", pa);
}

/**
 * 计价计量
 */
export function getMeasureOrValuation(pa) {
  return GetHttp(
    "java_post",
    "/pro/ccmeasurementvaluation/findwhere",
    "post",
    pa
  );
}
export function addMeasureOrValuation(pa) {
  return GetHttp("java_post", "/pro/ccmeasurementvaluation/adds", "post", pa);
}
export function upMeasureOrValuation(pa) {
  return GetHttp("java_post", "/pro/ccmeasurementvaluation/edits", "post", pa);
}
export function delMeasureOrValuation(pa) {
  return GetHttp(
    "java_post",
    "/pro/ccmeasurementvaluation/deletes",
    "post",
    pa
  );
}

/**
 * 会商谈判
 */
export function getConsultationNegotiation(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/findwhere", "post", pa);
}
export function addConsultationNegotiation(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/adds", "post", pa);
}
export function upConsultationNegotiation(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/edits", "post", pa);
}
export function delConsultationNegotiation(pa) {
  return GetHttp("java_post", "/pro/ccnegotiations/deletes", "post", pa);
}

/**
 * 报告
 */
export function getReport(pa) {
  return GetHttp("java_post", "/pro/ccreports/findwhere", "post", pa);
}
export function addReport(pa) {
  return GetHttp("java_post", "/pro/ccreports/adds", "post", pa);
}
export function upReport(pa) {
  return GetHttp("java_post", "/pro/ccreports/edits", "post", pa);
}
export function delReport(pa) {
  return GetHttp("java_post", "/pro/ccreports/deletes", "post", pa);
}

/**
 * 定案表
 */
export function getPreparation(pa) {
  return GetHttp("java_post", "/pro/ccverdicts/findwhere", "post", pa);
}
export function addPreparation(pa) {
  return GetHttp("java_post", "/pro/ccverdicts/adds", "post", pa);
}
export function upPreparation(pa) {
  return GetHttp("java_post", "/pro/ccverdicts/edits", "post", pa);
}
export function delPreparation(pa) {
  return GetHttp("java_post", "/pro/ccverdicts/deletes", "post", pa);
}

/**
 * 鉴定核对
 */

export function getCheck(pa) {
  return GetHttp("java_post", "/pro/ccappraisal/findwhere", "post", pa);
}
export function addCheck(pa) {
  return GetHttp("java_post", "/pro/ccappraisal/adds", "post", pa);
}
export function upCheck(pa) {
  return GetHttp("java_post", "/pro/ccappraisal/edits", "post", pa);
}
export function delCheck(pa) {
  return GetHttp("java_post", "/pro/ccappraisal/deletes", "post", pa);
}

/**
 * 征询意见
 */
export function getOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobe/findwhere", "post", pa);
}
export function addOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobe/adds", "post", pa);
}
export function delOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobe/deletes", "post", pa);
}
export function upOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobe/edits", "post", pa);
}

/**
 * 鉴定意见书
 */
export function getAppraisalOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobebook/findwhere", "post", pa);
}
export function addAppraisalOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobebook/adds", "post", pa);
}
export function upAppraisalOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobebook/edits", "post", pa);
}
export function dwlAppraisalOpinion(pa) {
  return GetHttp("java_post", "/pro/ccappprobebook/deletes", "post", pa);
}

/**
 * 质询
 */
export function getInquiry(pa) {
  return GetHttp("java_post", "/pro/ccappinquiry/findwhere", "post", pa);
}
export function addInquiry(pa) {
  return GetHttp("java_post", "/pro/ccappinquiry/adds", "post", pa);
}
export function upInquiry(pa) {
  return GetHttp("java_post", "/pro/ccappinquiry/edits", "post", pa);
}
export function delInquiry(pa) {
  return GetHttp("java_post", "/pro/ccappinquiry/deletes", "post", pa);
}

/**
 * 询价与核价
 */
export function getEnquiries(pa) {
  return GetHttp("java_post", "/pro/ccopinquiryapproval/findwhere", "post", pa);
}
export function addEnquiries(pa) {
  return GetHttp("java_post", "/pro/ccopinquiryapproval/adds", "post", pa);
}
export function delEnquiries(pa) {
  return GetHttp("java_post", "/pro/ccopinquiryapproval/deletes", "post", pa);
}
export function upEnquiries(pa) {
  return GetHttp("java_post", "/pro/ccopinquiryapproval/edits", "post", pa);
}

/**
 * 工程变更，工程签证  工程索赔
 */
export function getProject(pa) {
  return GetHttp("java_post", "/pro/ccopchangework/findwhere", "post", pa);
}
export function addProject(pa) {
  return GetHttp("java_post", "/pro/ccopchangework/adds", "post", pa);
}
export function delProject(pa) {
  return GetHttp("java_post", "/pro/ccopchangework/deletes", "post", pa);
}
export function upProject(pa) {
  return GetHttp("java_post", "/pro/ccopchangework/edits", "post", pa);
}
