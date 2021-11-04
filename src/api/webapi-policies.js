import { GetHttp } from "../utils/http";
/**
 * 基本资料模块 
 * baseUrl=/policies/policiesfileinfo
 */
export function getpolicieslist(pa) {
  return GetHttp("java_post", "/policies/policiesfileinfo/findall", "post", pa);
}

export function addpolicies(pa) {
  return GetHttp("java_post", "/policies/policiesfileinfo/adds", "post", pa);
}

export function editpolicies(pa) {
    return GetHttp("java_post", "/policies/policiesfileinfo/edits", "post", pa);
  }
  
export function deletespolicies(pa) {
    return GetHttp("java_post", "/policies/policiesfileinfo/deletes", "post", pa);
  }