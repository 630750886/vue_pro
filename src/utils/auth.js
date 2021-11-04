import cookie from "js-cookie";
export function SetToken(key, values) {
  return cookie.set(key, values);
}
export function GetToken(name) {
  return cookie.get(name);
}
export function RemoveToken(name) {
  return cookie.remove(name);
}
export const groupBy = (list, fn) => {
  const groups = {};
  list.forEach(element => {
    const g = fn(element);
    if (groups[g]) {
      groups[g].push(element);
    } else {
      groups[g] = [];
      groups[g].push(element);
    }
  });
  return groups;
};
export const groupBy_Name = (list, fn) => {
  const groups = {};
  const mylist = [];
  list.forEach(element => {
    const g = fn(element);
    if (groups[g]) {
      groups[g].push(element);
    } else {
      groups[g] = [];
      groups[g].push(element);
    }
  });
  for (var k in groups) {
    mylist.push({ name: k, dataList: groups[k] });
  }
  return mylist;
};

export const GetDateDiff = (startTime, endTime, diffType) => {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");

  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime); //开始时间
  var eTime = new Date(endTime); //结束时间
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
};

//////////////////////
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

///////////////////////////
//////////c#的padLeft////////////////
