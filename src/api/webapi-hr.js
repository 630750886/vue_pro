import { GetHttp } from "../utils/http";

//获得所有人员信息  nopage_advancedquery
export function getAllPerson(pa) {
  return GetHttp("java_post", "/hr/basicinfo/advancedquery", "post", pa);
}

export function getAllPersondoc(pa) {
  return GetHttp("java_post", "/hr/basicinfo/nopage_advancedquery", "post", pa);
}

export function person_analydes(pa) {
  return GetHttp("java_post", "/personanaly/person_analydes", "post", pa);
}

//获得人员信息
export function getPersonByKeyid(pa) {
  return GetHttp("java_post", "/hr/basicinfo/findbykeyid", "post", pa);
}

//新增人员
export function addPerson(pa) {
  return GetHttp("java_post", "/hr/basicinfo/adds", "post", pa);
}

//新增人员
export function changeposPerson(pa) {
  return GetHttp("java_post", "/hr/basicinfo/changepos", "post", pa);
}

//状态查询
export function queryPersonByStatus(pa) {
  return GetHttp("java_post", "/hr/basicinfo/findwhere", "post", pa);
}

//高级查询
export function queryPerson(pa) {
  return GetHttp("java_post", "/hr/basicinfo/advancedquery", "post", pa);
}

//工作提醒
export function workRemind(pa) {
  return GetHttp("", "", "post", pa);
}

//修改人员信息
export function upPerson(pa) {
  return GetHttp("java_post", "/hr/basicinfo/edits", "post", pa);
}

//查询学历
export function findEducationByPersonId(pa) {
  return GetHttp("java_post", "/hr/education/findbypkeyid", "post", pa);
}

//新增学历信息
export function addEducation(pa) {
  return GetHttp("java_post", "/hr/education/adds", "post", pa);
}

//修改学历信息
export function upEducation(pa) {
  return GetHttp("java_post", "/hr/education/edits", "post", pa);
}

export function deletesEducation(pa) {
  return GetHttp("java_post", "/hr/education/deletes", "post", pa);
}

/*
 * 荣誉
 * 查找 findHonorByPersonId
 * 添加 addHonor
 * 修改 upHonor
 */

//
export function findHonorByPersonId(pa) {
  return GetHttp("java_post", "/hr/honor/findbypkeyid", "post", pa);
}

export function addHonor(pa) {
  return GetHttp("java_post", "/hr/honor/adds", "post", pa);
}

export function upHonor(pa) {
  return GetHttp("java_post", "/hr/honor/edits", "post", pa);
}

export function deletesHonor(pa) {
  return GetHttp("java_post", "/hr/honor/deletes", "post", pa);
}

/*
 * 职称
 * @param pa
 */
export function findTitleByPersonId(pa) {
  return GetHttp("java_post", "/hr/title/findbypkeyid", "post", pa);
}

export function addTitle(pa) {
  return GetHttp("java_post", "/hr/title/adds", "post", pa);
}

export function upTitle(pa) {
  return GetHttp("java_post", "/hr/title/edits", "post", pa);
}

export function deletesTitle(pa) {
  return GetHttp("java_post", "/hr/title/deletes", "post", pa);
}

/*
 * 执业 practice
 * @param pa
 */
export function findPracticeByPersonId(pa) {
  return GetHttp("java_post", "/hr/practice/findbypkeyid", "post", pa);
}

export function addPractice(pa) {
  return GetHttp("java_post", "/hr/practice/adds", "post", pa);
}

export function upPractice(pa) {
  return GetHttp("java_post", "/hr/practice/edits", "post", pa);
}

export function deletesPractice(pa) {
  return GetHttp("java_post", "/hr/practice/deletes", "post", pa);
}

/*
 * 身份证件 credentials
 * @param pa
 */
export function findcredentialsByPersonId(pa) {
  return GetHttp("java_post", "/hr/credentialsinfo/findbypkeyid", "post", pa);
}

export function addcredentials(pa) {
  return GetHttp("java_post", "/hr/credentialsinfo/adds", "post", pa);
}

export function upcredentials(pa) {
  return GetHttp("java_post", "/hr/credentialsinfo/edits", "post", pa);
}

export function deletescredentials(pa) {
  return GetHttp("java_post", "/hr/credentialsinfo/deletes", "post", pa);
}

/*
 * 协议 agreement
 * @param pa
 */
export function findagreementByPersonId(pa) {
  return GetHttp("java_post", "/hr/agreementinfo/findbypkeyid", "post", pa);
}

export function addagreement(pa) {
  return GetHttp("java_post", "/hr/agreementinfo/adds", "post", pa);
}

export function upagreement(pa) {
  return GetHttp("java_post", "/hr/agreementinfo/edits", "post", pa);
}
export function deletesagreement(pa) {
  return GetHttp("java_post", "/hr/agreementinfo/deletes", "post", pa);
}



/*
 * 其他保险 insurance
 * @param pa
 */
export function findInsuranceByPersonId(pa) {
  return GetHttp("java_post", "/hr/insurance/findbypkeyid", "post", pa);
}

export function addInsurance(pa) {
  return GetHttp("java_post", "/hr/insurance/adds", "post", pa);
}

export function upInsurance(pa) {
  return GetHttp("java_post", "/hr/insurance/edits", "post", pa);
}

export function deletesInsurance(pa) {
  return GetHttp("java_post", "/hr/insurance/deletes", "post", pa);
}

/*
 * 社保公积金
 * @param pa
 */
export function findSocialfundByPersonId(pa) {
  return GetHttp("java_post", "/hr/socialfund/findbypkeyid", "post", pa);
}

export function addSocialfund(pa) {
  return GetHttp("java_post", "/hr/socialfund/adds", "post", pa);
}

/**
 * 招聘与配置
 * 获取招聘与配置台账 getApplyInfo
 * 招聘需求  addRecruitApply
 * 转正申请  addBecomeApply
 * 调岗晋级  addTransferApply
 * 离职申请  addQuitApply
 * 补助申请  addSubsidyApply
 */
export function getApplyInfo(pa) {
  return GetHttp("java_post", "/hr/vocational/advancedquery", "post", pa);
}
export function addRecruitApply(pa) {
  return GetHttp("java_post", "/hr/vocational/adds", "post", pa);
}
export function addBecomeApply(pa) {
  return GetHttp("java_post", "/hr/vocational/adds", "post", pa);
}
export function addTransferApply(pa) {
  return GetHttp("java_post", "/hr/vocational/adds", "post", pa);
}
export function addQuitApply(pa) {
  return GetHttp("java_post", "/hr/vocational/adds", "post", pa);
}
export function addSubsidyApply(pa) {
  return GetHttp("java_post", "/hr/vocational/adds", "post", pa);
}
export function getApplyRef(pa) {
  return GetHttp("java_post", "/hr/vocational/vocationallist", "post", pa);
}
export function upApply(pa) {
  return GetHttp("java_post", "/hr/vocational/edits", "post", pa);
}
