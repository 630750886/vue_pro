import { GetHttp } from "../../utils/http";

//获取项目服务计划
export function getServicePlan(pa) {
  return GetHttp("java_post", "/pro/cmworkplanlist/findwhere", "post", pa);
}

/**
 * 审查勘察单位相关文件
 * @param pa
 */
export function getExamination(pa) {
  return GetHttp("java_post", "/pro/esreviewsurveys/findwhere", "post", pa);
}
export function addExamination(pa) {
  return GetHttp("java_post", "/pro/esreviewsurveys/adds", "post", pa);
}
export function upExamination(pa) {
  return GetHttp("java_post", "/pro/esreviewsurveys/edits", "post", pa);
}
export function delExamination(pa) {
  return GetHttp("java_post", "/pro/esreviewsurveys/deletes", "post", pa);
}

/**
 * 施工过程监理及工作汇总/确定时间
 */

export function getAscertainTime(pa) {
  return GetHttp("java_post", "/pro/esinstage/findwhere", "post", pa);
}
export function addAscertainTime(pa) {
  return GetHttp("java_post", "/pro/esinstage/adds", "post", pa);
}
export function upAscertainTime(pa) {
  return GetHttp("java_post", "/pro/esinstage/edits", "post", pa);
}
export function delAscertainTime(pa) {
  return GetHttp("java_post", "/pro/esinstage/deletes", "post", pa);
}

/**
 * 会议工作
 */
export function getMeeting(pa) {
  return GetHttp("java_post", "/pro/esmeeting/findwhere", "post", pa);
}
export function addMeeting(pa) {
  return GetHttp("java_post", "/pro/esmeeting/adds", "post", pa);
}
export function upMeeting(pa) {
  return GetHttp("java_post", "/pro/esmeeting/edits", "post", pa);
}
export function delMeeting(pa) {
  return GetHttp("java_post", "/pro/esmeeting/deletes", "post", pa);
}

/**
 *保修时间
 */
export function getWarrantyTime(pa) {
  return GetHttp("java_post", "/pro/esguarantee/findwhere", "post", pa);
}
export function addWarrantyTime(pa) {
  return GetHttp("java_post", "/pro/esguarantee/adds", "post", pa);
}
export function upWarrantyTime(pa) {
  return GetHttp("java_post", "/pro/esguarantee/edits", "post", pa);
}
export function delWarrantyTime(pa) {
  return GetHttp("java_post", "/pro/esguarantee/deletes", "post", pa);
}

/**
 * 日志/旁站/月报
 */
//获取日志信息
export function getLogs(pa) {
  return GetHttp(
    "java_post",
    "/pro/essupervisordailyrecord/findwhere",
    "post",
    pa
  );
}
export function getLogsByDate(pa) {
  return GetHttp(
    "java_post",
    "/pro/essupervisordailyrecord/findwhere",
    "post",
    pa
  );
}
//添加当天信息
export function addLogs(pa) {
  return GetHttp("java_post", "/pro/essupervisordailyrecord/adds", "post", pa);
}
//获取监理月报
export function getMonthlyReport(pa) {
  return GetHttp("java_post", "/pro/esmonthlyreport/findwhere", "post", pa);
}
//添加监理月报
export function addMonthlyReport(pa) {
  return GetHttp("java_post", "/pro/esmonthlyreport/adds", "post", pa);
}
//编辑监理月报
export function upMonthlyReport(pa) {
  return GetHttp("java_post", "/pro/esmonthlyreport/edits", "post", pa);
}
//编辑监理日志
export function addSupervisorLog(pa) {
  return GetHttp("java_post", "/pro/esdailyrecord/adds", "post", pa);
}
export function upSupervisorLog(pa) {
  return GetHttp("java_post", "/pro/esdailyrecord/edits", "post", pa);
}
//编辑安全日志
export function addSafeLog(pa) {
  return GetHttp("java_post", "/pro/essafedailyrecord/adds", "post", pa);
}
export function upSafeLog(pa) {
  return GetHttp("java_post", "/pro/essafedailyrecord/edits", "post", pa);
}
//编辑旁站信息
export function addInspectLog(pa) {
  return GetHttp(
    "java_post",
    "/pro/essidestationsdailyrecord/adds",
    "post",
    pa
  );
}
export function upInspectLog(pa) {
  return GetHttp(
    "java_post",
    "/pro/essidestationsdailyrecord/edits",
    "post",
    pa
  );
}
