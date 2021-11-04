import { GetHttp } from "../utils/http";

/**
 * 投标管理
 * @param pa 参数 {}
 */
export function getBidRecord(pa) {
  return GetHttp("java_post", "tender/tenderinfo/advancedquery", "post", pa);
}

export function getBidRecordjson(pa) {
  return GetHttp("java_post", "tender/tenderinfo/advancedqueryjson", "post", pa);
}

///tender_analydes
export function getanalysisdata(pa) {
  return GetHttp("java_post", "analy/tender_analydes", "post", pa);
}

export function getBidRecordByKeyid(pa) {
  return GetHttp("java_post", "tender/tenderinfo/findbykeyid", "post", pa);
}
export function getBidRecordByWhere(pa) {
  return GetHttp("java_post", "tender/tenderinfo/findwhere", "post", pa);
}
export function addBidRecord(pa) {
  return GetHttp("java_post", "tender/tenderinfo/adds", "post", pa);
}
export function upBidRecord(pa) {
  return GetHttp("java_post", "tender/tenderinfo/edits", "post", pa);
}
export function delBidRecord(pa) {
  return GetHttp("java_post", "tender/tenderinfo/deletes", "post", pa);
}

/**
 * 投标网站
 * getWebsiteInfo 获取网站信息
 * addBrowseWebsite  新增浏览网站
 * upBrowseWebsite  修改浏览网站
 * delBrowseWebsite  删除浏览网站

 */
export function getBrowseWebsite(pa) {
  return GetHttp("java_post", "tender/tendersource/findall", "post", pa);
}
export function addBrowseWebsite(pa) {
  return GetHttp("java_post", "tender/tendersource/adds", "post", pa);
}
export function upBrowseWebsite(pa) {
  return GetHttp("java_post", "tender/tendersource/edits", "post", pa);
}
export function delBrowseWebsite(pa) {
  return GetHttp("java_post", "tender/tendersource/deletes", "post", pa);
}

/**
 * 交易中心
 * getPlatformWebsite  获取交易中心
 * addPlatformWebsite  新增交易中心
 * upPlatformWebsite  新增交易中心
 * delPlatformWebsite  新增交易中心
 * @param pa
 */
export function getPlatformWebsite(pa) {
  return GetHttp(
    "java_post",
    "tender/tendertradingplatform/findall",
    "post",
    pa
  );
}

export function autofindwhere(pa) {
  return GetHttp("java_post", "tender/tendertradingplatform/autofindwhere", "post", pa);
}

export function addPlatformWebsite(pa) {
  return GetHttp("java_post", "tender/tendertradingplatform/adds", "post", pa);
}
export function upPlatformWebsite(pa) {
  return GetHttp("java_post", "tender/tendertradingplatform/edits", "post", pa);
}
export function delPlatformWebsite(pa) {
  return GetHttp(
    "java_post",
    "tender/tendertradingplatform/deletes",
    "post",
    pa
  );
}

/**
 *投标文件管理
 */
export function getBidItemFile(pa) {
  return GetHttp("java_post", "tender/tenderdocuments/findwhere", "post", pa);
}
export function addBidItemFile(pa) {
  return GetHttp("java_post", "tender/tenderdocuments/adds", "post", pa);
}
export function upBidItemFile(pa) {
  return GetHttp("java_post", "tender/tenderdocuments/edits", "post", pa);
}
export function delBidItemFile(pa) {
  return GetHttp("java_post", "tender/tenderdocuments/deletes", "post", pa);
}

/**
 * 分包/分标段
 */
export function getSubcontract(pa) {
  return GetHttp(
    "java_post",
    "tender/bidopeningevaluation/findwhere",
    "post",
    pa
  );
}
export function addSubcontract(pa) {
  return GetHttp("java_post", "tender/bidopeningevaluation/adds", "post", pa);
}

export function upSubcontract(pa) {
  return GetHttp("java_post", "tender/bidopeningevaluation/edits", "post", pa);
}
export function delSubcontract(pa) {
  return GetHttp(
    "java_post",
    "tender/bidopeningevaluation/deletes",
    "post",
    pa
  );
}

/**
 * 其他公司
 */
export function getOtherCom(pa) {
  return GetHttp("java_post", "tender/otherquotation/findwhere", "post", pa);
}
export function addOtherCom(pa) {
  return GetHttp("java_post", "tender/otherquotation/adds", "post", pa);
}
export function upOtherCom(pa) {
  return GetHttp("java_post", "tender/otherquotation/edits", "post", pa);
}
export function delOtherCom(pa) {
  return GetHttp("java_post", "tender/otherquotation/deletes", "post", pa);
}
