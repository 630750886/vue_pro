import { GetHttp } from "../utils/http";
import { GetHttp_Net } from "../utils/http";
/**
 * 组织和岗位相关函数
 * getOrgTree 获得组织信息
 * addOrgTree 添加组织
 * upOrgTree 修改组织
 * delOrgTree 删除组织
 * getPost 获取岗位
 * addPost 添加岗位
 * upPost 修改岗位
 * delPost 删除岗位
 * @param pa
 */
export function getOrgTree(pa) {
  return GetHttp("java_post", "/sysorgs/findtree", "post", pa);
}
export function addOrgTree(pa) {
  return GetHttp("java_post", "sysorgs/add", "post", pa);
}
export function upOrgTree(pa) {
  return GetHttp("java_post", "sysorgs/edits", "post", pa);
}
export function delOrgTree(pa) {
  return GetHttp("java_post", "sysorgs/delete", "post", pa);
}
export function getPost(pa) {
  return GetHttp("java_post", "sysposs/findall", "post", pa);
}
export function getPostByOrgId(pa) {
  return GetHttp("java_post", "sysposs/findbyorgid ", "post", pa);
}
export function addPost(pa) {
  return GetHttp("java_post", "sysposs/add", "post", pa);
}
export function upPost(pa) {
  return GetHttp("java_post", "sysposs/edits", "post", pa);
}
export function delPost(pa) {
  return GetHttp("java_post", "sysposs/delete", "post", pa);
}

/**
 * 模块分类 即：模块的下拉框等数据
 * addModule 添加模块
 * upModule 修改模块
 * delModule 删除模块
 * getAllModule 获得所有模块信息
 * getTypeList 获得分类明细信息
 * addType 添加分类明细
 * upType 修改分类明细
 * delType 删除分类明细
 * @param pa
 */
export function addModule(pa) {
  return GetHttp("java_post", "systypeinfo/adds", "post", pa);
}
export function upModule(pa) {
  return GetHttp("java_post", "systypeinfo/edits", "post", pa);
}
export function delModule(pa) {
  return GetHttp("java_post", "systypeinfo/deletes", "post", pa);
}
export function getAllModule(pa) {
  return GetHttp("java_post", "systypeinfo/findtypetree", "post", pa);
}
export function getCascaderType(pa) {
  return GetHttp("java_post", "systypeinfo/findtypecodetree", "post", pa);
}
export function getTypeList(pa) {
  return GetHttp("java_post", "systypelist/findall", "post", pa);
}
export function getTypeListByModuleId(pa) {
  return GetHttp("java_post", "systypeinfo/findtypelist", "post", pa);
}
export function getTypeListByCode(pa) {
  return GetHttp("java_post", "systypelist/findbycode", "post", pa);
}
export function getfindbycodeurladdress(pa) {
  return GetHttp("java_post", "systypelist/findbycodeurladdress", "post", pa);
}

export function addTypeList(pa) {
  return GetHttp("java_post", "systypelist/adds", "post", pa);
}
export function upTypeList(pa) {
  return GetHttp("java_post", "systypelist/edits", "post", pa);
}
export function delTypeList(pa) {
  return GetHttp("java_post", "systypelist/deletes", "post", pa);
}
//行政区
export function getRegion(pa) {
  return GetHttp("java_post", "/sysarea/findtree", "post", pa);
}
//公司
export function getCommpany() {
  return GetHttp_Net("back_post", "getcommpany", "get", null);
}
