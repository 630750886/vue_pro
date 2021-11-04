import { GetHttp } from "@/utils/http";

const mbaseurl="/xz/DocumentMeeting";


export function adds_object(pa) {
    return GetHttp("java_post", mbaseurl+"/adds", "post", pa);
}

export function edits_object(pa) {
    return GetHttp("java_post", mbaseurl+"/edits", "post", pa);
}

export function findall_object(pa) {
    return GetHttp("java_post", mbaseurl+"/findall", "post", pa);
}

export function findbypkeyid_object(pa) {
    return GetHttp("java_post", mbaseurl+"/findbypkeyid", "post", pa);
}

export function findbykeyid_object(pa) {
    return GetHttp("java_post", mbaseurl+"/findbykeyid", "post", pa);
}

export function findwhere_object(pa) {
    return GetHttp("java_post", mbaseurl+"/findwhere", "post", pa);
}

export function deletes_object(pa) {
    return GetHttp("java_post", mbaseurl+"/deletes", "post", pa);
}

export function pagefind_object(pa) {
    return GetHttp("java_post", mbaseurl+"/pagefind", "post", pa);
}

///advancedquery

export function advancedquery_object(pa) {
    return GetHttp("java_post", mbaseurl+"/advancedquery", "post", pa);
}