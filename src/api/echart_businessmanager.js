import { GetHttp } from "../utils/http";


export function allanalysprocontractdata(pa) {
    return GetHttp("java_post", "/analy/projectdata/analydes", "post", pa);
}