import { GetHttp } from "../../utils/http";
//初始化项目文档
export function initItemFiles(pa) {
  return GetHttp("java_post", "/pro/cmbaseproject/projectinit", "post", pa);
}
//获取项目文件
export function getItemFiles(pa) {
  return GetHttp("java_post", "/pro/crmesourceinfo/findwhere", "post", pa);
}
export function addItemFile(pa) {
  return GetHttp("java_post", "/pro/crmesourceinfo/adds", "post", pa);
}
export function delItemFile(pa) {
  return GetHttp("java_post", "/pro/crmesourceinfo/deletes", "post", pa);
}
export function upItemFile(pa) {
  return GetHttp("java_post", "/pro/crmesourceinfo/edits", "post", pa);
}

export function getItemFileList(pa) {
  return GetHttp("java_post", "/pro/cmresourcefilelist/findwhere", "post", pa);
}
export function addItemFileList(pa) {
  return GetHttp("java_post", "/pro/cmresourcefilelist/adds", "post", pa);
}
export function upItemFileList(pa) {
  return GetHttp("java_post", "/pro/cmresourcefilelist/edits", "post", pa);
}
export function delItemFileList(pa) {
  return GetHttp("java_post", "/pro/cmresourcefilelist/deletes", "post", pa);
}
