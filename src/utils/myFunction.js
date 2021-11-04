import { error } from "jquery";
import { filter } from "jszip";

const myFunction = {
  getPageData: function (arr, pageInfo) {
    // console.log("myfunction");
    const abc = arr.filter((item, index) => {
      return (
        index >= pageInfo.limit * (pageInfo.page - 1) &&
        index < pageInfo.limit * pageInfo.page
      );
    });
    // console.log(abc);
    return abc;
  },
  copyData: function (object) {
    return JSON.parse(JSON.stringify(object));
  },
  judgeType: function (obj) {
    // tostring会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString;
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
    };
    if (obj instanceof Element) {
      return 'element';
    }
    return map[toString.call(obj)];
  },
  deepClone: function (data) {
    const type = this.judgeType(data);
    let obj;
    if (type === 'array') {
      obj = [];
    } else if (type === 'object') {
      obj = {};
    } else {
      // 不再具有下一层次
      return data;
    }
    if (type === 'array') {
      // eslint-disable-next-line
          for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (type === 'object') {
      // 对原型上的方法也拷贝了....
      // eslint-disable-next-line
          for (const key in data) {
        obj[key] = this.deepClone(data[key]);
      }
    }
    return obj;
  },
  queryData: function (queryData, allData) {
    if (queryData.length == 0) return allData;

    var filterData = allData.filter((item) => {
      return queryData.every((k) => {
        var result = false;

        if (k.types) {

          result = k.op(item, k.types);

        } else {
          result = k.op(item);
        }
        //if(!result){console.log(k)}
        return result;
      });
    });
    return filterData;
  },
  sqlSplicing: function (ref) {
    let where = '1=1';
    const array = Object.keys(ref);
    array.forEach((key) => {
      if (!this.isEmpty(ref[key].value)) {
        if (ref[key].op === 'eq') {
          where = where + ' and ' + key + '=' + ref[key].value;
        } else if (ref[key].op === 'between') {
          where =
            where +
            ' and ' +
            key +
            'in(' +
            ref[key].value +
            ',' +
            ref[key].value2 +
            ')';
        } else if (ref[key].op === 'like') {
          where = where + ' and ' + key + ' like ' + '%' + ref[key].value + '%';
        }
      }
    });
    return where;
  },
  groupBy: function (list, fn) {
    const groups = {};
    list.forEach((element) => {
      const g = fn(element);
      if (groups[g]) {
        groups[g].push(element);
      } else {
        groups[g] = [];
        groups[g].push(element);
      }
    });
    return groups;
  },
  sqlSplicingByBelong: function (ref) {
    let where = '1=1';
    const newarr = ref.filter((s) => {});
    const array = Object.keys(ref);
    array.forEach((key) => {
      if (!this.isEmpty(ref[key].value)) {
        if (ref[key].op === 'eq') {
          where = where + ' and ' + key + '=' + ref[key].value;
        } else if (ref[key].op === 'between') {
          where =
            where +
            ' and ' +
            key +
            'in(' +
            ref[key].value +
            ',' +
            ref[key].value2 +
            ')';
        } else if (ref[key].op === 'like') {
          where = where + ' and ' + key + ' like ' + '%' + ref[key].value + '%';
        }
      }
    });
    return where;
  },
  isEmpty: function (str) {
    if (
      /^undefined$/i.test(str) ||
      /^null$/i.test(str) ||
      str === '' ||
      str === 0 ||
      str === '0'
    ) {
      return true;
    } else if (typeof str === 'object' && Object.keys(str).length === 0) {
      return true;
    } else if (Array.isArray(str) && str.length === 0) {
      return true;
    } else {
      var reg = /^\s*$/;
      return reg.test(str);
    }
  },
  getFinalData (jsonData, key) {
    if (!this.isEmpty(key) && key.indexOf('.') !== -1) {
      const arr = key.split(".");
      let obj = {};
      arr.forEach((r, i) => {
        if (i === 0 && !this.isEmpty(obj)) {
          obj = jsonData[r];
        } else if (!this.isEmpty(obj)) {
          obj = obj[r];
        }
      });
      return obj;
    } else {
      return jsonData[key];
    }
  },
  showPDF () {
    const routeData = this.$router.resolve({
      path: "/pdfview",
      query: {
        src: "test.pdf",
      }
    });
    window.open(routeData.href, '_blank');
  },
  getBirthdayAndAge (idCard) {
    const str1 = idCard.substr(6, 8);
    const str2 = str1.substr(0, 4); // 年
    const str3 = str1.substr(4, 2); // 月
    const str4 = str1.substr(6, 2); // 日
    const birthday = str2 + "/" + str3 + "/" + str4;
    let age = '';
    if (birthday) {
      const year = 1000 * 60 * 60 * 24 * 365;
      const now = new Date();
      const birth = new Date(birthday);
      age = parseInt((now - birth) / year);
    }
    return {
      birthday: birthday,
      age: age,
    };
  },
  addDayToDate (date, day, vf, sep) {
    let valueFormat = 'date';
    if (vf) {
      valueFormat = vf;
    }
    let separator = '/';
    if (sep) {
      separator = sep;
    }
    const timestampToTime = function (timestamp) {
      const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + separator;
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + separator;
      const D = date.getDate();
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      if (valueFormat === "date") {
        return Y + M + D;
      } else if (valueFormat === "datetime") {
        return Y + M + D + " " + h + m + s;
      }
    };
    if (this.isEmpty(date)) {
      return '';
    }
    return timestampToTime(new Date(date).getTime() + day * 24 * 3600 * 1000);
  },
  toDate (date, { year, month, day }) {
    const timestampToTime = function (timestamp) {
      const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '/';
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '/';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      return Y + M + D;
    };
    const time = new Date(date);
    let newYear = time.getFullYear();
    let newMonth = time.getMonth();
    let newDay = time.getDay();
    if (!this.isEmpty(year)) {
      newYear += year;
    }
    if (!this.isEmpty(month)) {
      if (newMonth + month > 12) {
        newYear++;
        newMonth = newMonth + month - 12;
      } else {
        newMonth = newMonth + month;
      }
    }
    if (!this.isEmpty(day)) {
      newDay += day;
    }
    console.log(newYear, newMonth, newDay);
    return timestampToTime(
      new Date(newYear + '-' + newMonth + '-' + newDay).getTime()
    );
  },
  findStr (arr, value) {
    // localStorage.setItem("findStr","");
    let returnValue = '';
    const that = this;

    arr.forEach((item, index) => {
      if (item.keyid == value) {
        returnValue = item.label;
        localStorage.setItem('findStr', returnValue);
      } else {
        if (item.children) {
          that.findStr(item.children, value);
        }
      }
    });
  },
  dynamicTime () {
    let t = null;
    t = setTimeout(time, 1000); // 开始运行
    function time () {
      clearTimeout(t); // 清除定时器
      const dt = new Date();
      const y = dt.getFullYear();
      const mt = dt.getMonth() + 1;
      const day = dt.getDate();
      const h = dt.getHours(); // 获取时
      const m = dt.getMinutes(); // 获取分
      const s = dt.getSeconds(); // 获取秒
      const date =
        "当前时间：" +
        y +
        "年" +
        mt +
        "月" +
        day +
        "-" +
        h +
        "时" +
        m +
        "分" +
        s +
        "秒";
      t = setTimeout(time, 1000); // 设定定时器，循环运行
      return date;
    }

    return time();
  },
  countdownTime (endTime, type = 'String') {
    return timeDown();

    function timeDown () {
      const end = new Date(endTime).getTime();
      const dt = new Date();
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;
      const d = dt.getDate();
      const curr = new Date(year + '/' + month + '/' + d).getTime();
      const leftTime = parseInt((end - curr) / 1000);
      const day = parseInt(leftTime / (24 * 60 * 60));
      const h = formate(parseInt((leftTime / (60 * 60)) % 24)); // 获取时
      const m = formate(parseInt((leftTime / 60) % 60)); // 获取分
      const s = formate(parseInt(leftTime % 60)); // 获取秒
      // return day+'天'+h+'小时'+m+'分'+s+'秒'
      if (type === 'String') {
        if (day >= 0) {
          return day + 1 + '天';
        } else {
          return day + '天';
        }
      } else {
        if (day >= 0) {
          return day + 1;
        } else {
          return day;
        }
      }
    }

    function formate (time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  },
  // 操作手机号
  onCallInput: function (event) {
    let value = event.target.value.replace(/\D/g, "").substr(0, 11); // 不允许输入非数字字符，超过11位数字截取前11位
    const len = value.length;
    if (len > 3 && len < 8) {
      value = value.replace(/^(\d{3})/g, "$1 ");
    } else if (len >= 8) {
      value = value.replace(/^(\d{3})(\d{4})/g, "$1 $2 ");
    }
    this.tall = value;
  },
  // @input="onInput" @keyup="onInput" @paste="onInput"
  // 操作银行卡
  onInput: function (event) {
    // this.card = event.detail.value
    this.card = this.card.replace(/\D/g, ""); // 不允许输入非数字字符
    this.card = this.card.replace(/(\d{4})(?=\d)/g, '$1 '); // 4位
    console.log(this.card);
  },
};

export default myFunction;
