import Mock from "mockjs";
import qs from "qs";
import { groupBy, GetDateDiff } from "../utils/auth";

const compare = propertyName => {
  return function(obj1, obj2) {
    let value1 = obj1[propertyName];
    let value2 = obj2[propertyName];
    if (value2 > value1) return 1;
    else if (value2 < value1) return -1;
    else return 0;
  };
};

const compareByType = (propertyName, types) => {
  return function(obj1, obj2) {
    let value1 = obj1[propertyName];
    let value2 = obj2[propertyName];
    if (types === "asc") {
      if (value2 > value1) return 1;
      else if (value2 < value1) return -1;
      else return 0;
    } else {
      if (value2 > value1) return -1;
      else if (value2 < value1) return 1;
      else return 0;
    }
  };
};

const count = 200;
let positionList = []; //岗位信息
let inviteList = []; //招标信息表
let tenderList = []; //投标备案信息表

for (let i = 0; i < count; i++) {
  positionList.push(
    Mock.mock({
      id: Mock.Random.guid(),
      sortnum: i + 1,
      positionName: Mock.Random.duty(),
      rankLevel: Mock.Random.posLevel(),
      belongOrg: Mock.Random.org(),
      belongDept: Mock.Random.dept()
    })
  );
}

// for (let i = 0; i < 200; i++) {
//     inviteList.push(Mock.mock({
//         id: Mock.Random.guid(),
//         sortnum: i + 1,
//         projectName: Mock.Random.projectName(),
//         classify: Mock.Random.classify(),
//         signName: Mock.Random.cname(), //报名人
//         getWay: '线上获取',
//         getPlace: Mock.mock('@county(true)'), //购买招标文件地点
//         getTime: Mock.Random.date(), //购买招标文件时间
//         getMoney: Mock.Random.float(1, 9999, 2, 2), //招标文件费
//         inviteNo: /\d{13}/, //招标编号
//         hasFile: Mock.Random.yesOrNo(), //是否有招标文件
//         filePath: '', //招标文件地址
//         endTime: Mock.Random.datetime(), //投标截止时间
//         tenderOpenTime: Mock.Random.datetime(), //开标时间
//         budget: Mock.Random.float(1, 999999, 2, 2), //项目预算
//         investment: Mock.Random.float(1, 999999, 2, 2), //投资额
//         fixMoney: Mock.Random.float(1, 999999, 2, 2), //建安投资
//         limitPrice: Mock.Random.float(1, 9999999, 2, 2), //最高限价
//         securityPrice: Mock.Random.float(1, 9999, 2, 2), //投标保证金金额
//         securityTime: Mock.Random.datetime(), //投标保证金缴纳截止时间
//         markMethod: Mock.Random.cparagraph(), //评分办法
//         markDetail: Mock.Random.cparagraph(), //评分细则
//         requirePrice: Mock.Random.cparagraph(), //报价要求
//         isAsk: Mock.Random.yesOrNo() //是否需要答辩
//     }))
// }

const mydata = {
  List: positionList,
  inviteList: inviteList,
  tenderList: tenderList
};

export default {
  getqueryList: config => {
    const { page = 1, limit = 20, filter = {} } = JSON.parse(config.body);
    let keys = [];
    //过滤数组当中有空值就不要
    for (let f in filter) {
      if (filter[f] === "") {
      } else {
        keys.push(f);
      }
    }
    let mocklist = positionList.filter(item => {
      return keys.every(k => {
        return item[k].indexOf(filter[k]) !== -1;
      });
    });

    const userlist = mocklist.filter((item, index) => {
      return index >= limit * (page - 1) && index < limit * page;
    });
    return {
      code: 200,
      total: mocklist.length,
      rows: userlist,
      totalRows: mocklist
    };
  },
  //得到资料数据
  getresourceList: config => {
    let mylist = [];
    let ls = Mock.Random.integer(1, 9);
    for (let i = 0; i < ls; i++) {
      mylist.push(
        Mock.mock({
          id: Mock.Random.guid(),
          sortnum: i + 1,
          resourceName: Mock.Random.ctitle(4, 12),
          createTime: Mock.Random.datetime(),
          resourceType: Mock.Random.resourceType()
        })
      );
    }
    // mylist= mylist.sort(compareByType('createTime','desc'));
    return {
      code: 200,
      total: mylist.length,
      rows: mylist
    };
  },
  ///得到明细信息
  getDetail: config => {
    const { ts, ids } = JSON.parse(config.body);
    let data = mydata[ts].filter(s => {
      return s.id === ids;
    });

    return data[0]; //JSON对象
  }
};
