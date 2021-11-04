import { GetHttp } from "../../utils/http";
//获取项目服务计划
export function getServicePlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/findwhere", "post", pa);
}
/**
 * 项目报建/项目备案
 */
export function getRecordItem(pa) {
  return GetHttp("java_post", "/pro/taputonrecord/findwhere", "post", pa);
}
export function addRecordItem(pa) {
  return GetHttp("java_post", "/pro/taputonrecord/adds", "post", pa);
}
export function upRecordItem(pa) {
  return GetHttp("java_post", "/pro/taputonrecord/edits", "post", pa);
}
export function delRecordItem(pa) {
  return GetHttp("java_post", "/pro/taputonrecord/deletes", "post", pa);
}

/**
 * 文件论证
 */
export function getDocumentProof(pa) {
  return GetHttp("java_post", "/pro/tadocumentproof/findwhere", "post", pa);
}
export function addDocumentProof(pa) {
  return GetHttp("java_post", "/pro/tadocumentproof/adds", "post", pa);
}
export function upDocumentProof(pa) {
  return GetHttp("java_post", "/pro/tadocumentproof/edits", "post", pa);
}
export function delDocumentProof(pa) {
  return GetHttp("java_post", "/pro/tadocumentproof/deletes", "post", pa);
}

/**
 * 编制及审核资格预审文件
 */

export function getPretrial(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/findwhere", "post", pa);
}
export function addPretrial(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/adds", "post", pa);
}
export function upPretrial(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/edits", "post", pa);
}
export function delPretrial(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/deletes", "post", pa);
}
/**
 * 发布结果通知及异议处理
 */

export function getDemand(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/findwhere", "post", pa);
}
export function addDemand(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/adds", "post", pa);
}
export function upDemand(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/edits", "post", pa);
}
export function delDemand(pa) {
  return GetHttp("java_post", "/pro/tademandpublicity/deletes", "post", pa);
}
/**
 *招标文件/投标保证金台账
 */
export function getBond(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesale/findwhere", "post", pa);
}
export function addBond(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesale/adds", "post", pa);
}
export function upBond(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesale/edits", "post", pa);
}
export function delBond(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesale/deletes", "post", pa);
}
//新增单位
export function addBondCom(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesalelist/adds", "post", pa);
}
export function upBondCom(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesalelist/edits", "post", pa);
}
export function delBondCom(pa) {
  return GetHttp("java_post", "/pro/tabiddingfilesalelist/deletes", "post", pa);
}

/**
 * 招标文件异议处理
 */
export function getBidFileHandel(pa) {
  return GetHttp(
    "java_post",
    "/pro/tabiddingfileobjection/findwhere",
    "post",
    pa
  );
}
export function addBidFileHandel(pa) {
  return GetHttp("java_post", "/pro/tabiddingfileobjection/adds", "post", pa);
}
export function upBidFileHandel(pa) {
  return GetHttp("java_post", "/pro/tabiddingfileobjection/edits", "post", pa);
}
export function delBidFileHandel(pa) {
  return GetHttp(
    "java_post",
    "/pro/tabiddingfileobjection/deletes",
    "post",
    pa
  );
}

/**
 * 开标评标
 */
export function getQualificationExamination(pa) {
  return GetHttp(
    "java_post",
    "/pro/tabidopeningevaluation/findwhere",
    "post",
    pa
  );
}
export function addQualificationExamination(pa) {
  return GetHttp("java_post", "/pro/tabidopeningevaluation/adds", "post", pa);
}
export function upQualificationExamination(pa) {
  return GetHttp("java_post", "/pro/tabidopeningevaluation/edits", "post", pa);
}
export function delQualificationExamination(pa) {
  return GetHttp(
    "java_post",
    "/pro/tabidopeningevaluation/deletes",
    "post",
    pa
  );
}
//投标文件
export function addBiddingFile(pa) {
  return GetHttp("java_post", "/pro/tatenderfile/adds", "post", pa);
}
export function delBiddingFile(pa) {
  return GetHttp("java_post", "/pro/tatenderfile/deletes", "post", pa);
}

/**
 * 资格预审/出具结果通知书  出具中标通知书
 */

export function getNoticeBook(pa) {
  return GetHttp("java_post", "/pro/tabidding/findwhere", "post", pa);
}
export function addNoticeBook(pa) {
  return GetHttp("java_post", "/pro/tabidding/adds", "post", pa);
}
export function upNoticeBook(pa) {
  return GetHttp("java_post", "/pro/tabidding/edits", "post", pa);
}
export function delNoticeBook(pa) {
  return GetHttp("java_post", "/pro/tabidding/deletes", "post", pa);
}

/**
 * 确定拦标价/预算价
 */
export function getSureBudget(pa) {
  return GetHttp("java_post", "/pro/tabudgetprice/findwhere", "post", pa);
}
export function addSureBudget(pa) {
  return GetHttp("java_post", "/pro/tabudgetprice/adds", "post", pa);
}
export function upSureBudget(pa) {
  return GetHttp("java_post", "/pro/tabudgetprice/edits", "post", pa);
}
export function delSureBudget(pa) {
  return GetHttp("java_post", "/pro/tabudgetprice/deletes", "post", pa);
}

export function getTAPrequalification(pa) {
  return GetHttp("java_post", "/pro/taprequalification/findwhere", "post", pa);
}
export function addTAPrequalification(pa) {
  return GetHttp("java_post", "/pro/taprequalification/adds", "post", pa);
}
export function upTAPrequalification(pa) {
  return GetHttp("java_post", "/pro/taprequalification/edits", "post", pa);
}
export function delTAPrequalification(pa) {
  return GetHttp("java_post", "/pro/taprequalification/deletes", "post", pa);
}
