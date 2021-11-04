import request from "../../utils/ax";

export function getCalendar(pa) {
  return request({
    url: "/page/getCalendar",
    method: "get",
    data: pa
  });
}

// export function getTaskList(pa){
//     return request({
//         url:"/page/getTask",
//         method:"get",
//         data:pa
//     })
// }
