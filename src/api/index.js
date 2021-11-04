import { requestApi } from "../utils/request";
import { option } from "./optionParam";

export const fetchFileList = query => {
  option.isJson = true;
  option.data = query;
  option.method = "get";
  option.url = "./table.json";
  return requestApi(option);
};
