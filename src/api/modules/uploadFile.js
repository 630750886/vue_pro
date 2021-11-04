import { GetHttp } from "../../utils/http.js";

export const mergeFile = data => {
  return GetHttp("java_post", "/uploader/mergeFile", "post", data);
};
export const selectFileList = query => {
  return GetHttp("java_post", "/uploader/selectFileList", "post", query);
};

export const deleteFile = data => {
  return GetHttp("java_post", "/uploader/deleteFile", "post", query);
};

export const downloadFile = query => {
  return GetHttp("java_post", "/uploader/download", "post", query);
};
