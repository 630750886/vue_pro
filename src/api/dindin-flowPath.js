import { GetHttp } from "../utils/http";
/*客户信息*/
//获取所有客户信息
export function startFlow(pa) {
  return GetHttp("back_post", "startFlow", "post",pa);
}
