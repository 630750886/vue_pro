import { GetHttp } from "../utils/http";
/**
 * 增加角色
 * 编辑角色
 * 编辑角色菜单数据
 * 编辑角色数据
 */
export function getrolelist(pa) {
  return GetHttp("java_post", "/sysroles/findall", "post", pa);
}
export function addrole(pa) {
  return GetHttp("java_post", "/sysroles/adds", "post", pa);
}
