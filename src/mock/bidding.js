import Mock from "mockjs";
import qs from "qs";
import {
  groupBy,
  GetDateDiff
} from "../utils/auth";



const compare = (propertyName) => {
  return function (obj1, obj2) {
    let value1 = obj1[propertyName];
    let value2 = obj2[propertyName];
    if (value2 > value1)
      return 1;
    else if (value2 < value1)
      return -1;
    else
      return 0;
  }
}

const compareByType = (propertyName, types) => {
  return function (obj1, obj2) {
    let value1 = obj1[propertyName];
    let value2 = obj2[propertyName];
    if (types === "asc") {
      if (value2 > value1)
        return 1;
      else if (value2 < value1)
        return -1;
      else
        return 0;
    } else {
      if (value2 > value1)
        return -1;
      else if (value2 < value1)
        return 1;
      else
        return 0;
    }
  }

}



const count = 200;
let List = []; //业务信息表
let inviteList = []; //招标信息表
let tenderList = []; //投标备案信息表
let sealList=[];//盖章信息表
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    projectName: Mock.Random.projectName(),
    ways: Mock.Random.ways(),
    classify: Mock.Random.classify()
  }))
}

for (let i = 0; i < 120; i++) {
  sealList.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    projectName: Mock.Random.projectName(),
    sealRequirement:Mock.Random.cparagraph(2,10),//盖章要求
    packRequirement:Mock.Random.cparagraph(2,10),//包封要求
    nums: Mock.Random.integer(1,100),//份数
    scopes:Mock.Random.scopes(),//业务类型
    mainBody: Mock.Random.mainbody(), //投标主体
    tenderType:Mock.Random.tenderType(),//投标形式
    status:Mock.Random.integer(1,3)//状态
  }))
}

for (let i = 0; i < 200; i++) {
  inviteList.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    projectName: Mock.Random.projectName(),
    classify: Mock.Random.classify(),
    signName: Mock.Random.cname(), //报名人
    getWay: '线上获取',
    getPlace: Mock.mock('@county(true)'), //购买招标文件地点
    getTime: Mock.Random.date(), //购买招标文件时间
    getMoney: Mock.Random.float(1, 9999, 2, 2), //招标文件费
    inviteNo: /\d{13}/, //招标编号
    hasFile: Mock.Random.yesOrNo(), //是否有招标文件
    filePath: '', //招标文件地址
    endTime: Mock.Random.datetime(), //投标截止时间
    tenderOpenTime: Mock.Random.datetime(), //开标时间
    budget: Mock.Random.float(1, 999999, 2, 2), //项目预算
    investment: Mock.Random.float(1, 999999, 2, 2), //投资额
    fixMoney: Mock.Random.float(1, 999999, 2, 2), //建安投资
    limitPrice: Mock.Random.float(1, 9999999, 2, 2), //最高限价
    securityPrice: Mock.Random.float(1, 9999, 2, 2), //投标保证金金额
    securityTime: Mock.Random.datetime(), //投标保证金缴纳截止时间
    markMethod: Mock.Random.cparagraph(), //评分办法
    markDetail: Mock.Random.cparagraph(), //评分细则
    requirePrice: Mock.Random.cparagraph(), //报价要求
    isAsk: Mock.Random.yesOrNo() //是否需要答辩
  }))
}


for (let i = 0; i < 100; i++) {
  tenderList.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    mainBody: Mock.Random.mainbody(), //投标主体
    province: Mock.Random.province(), //省
    city: Mock.Random.city(), //市
    county: Mock.Random.county(), //区
    IsTrading: Mock.Random.yesOrNo(), //是否进交易中心
    tradingCenter: Mock.Random.ctitle(4, 10), //交易中心名称
    publishTime: Mock.Random.datetime(), //公告（邀请函）发布时间
    publishFileImage: '', //公告（邀请函）截图
    scopes:Mock.Random.scopes(),//业务类型
    inviteType: Mock.Random.inviteType(), //招标组织形式
    projectName: Mock.Random.projectName(),//项目名称
    businessOwner:Mock.Random.cname(),//业主
    inviteMan:Mock.Random.cname(),//招标人
    inviteManContact:Mock.Random.cname(),//招标人联系人
    inviteManContactNo:/\d{13}/,//招标人联系人电话
    agency:Mock.Random.ctitle(2,10),//招标代理机构
    agencyContact:Mock.Random.cname(),//代理机构联系人
    agencyContactNo:/\d{13}/, //代理机构联系人电话 
    isTender:Mock.Random.yesOrNo(),//是否投标
    responseMan:Mock.Random.cname(),//投标负责人
    isAnswer:Mock.Random.yesOrNo(),//是否需要答辩
    analyse:Mock.Random.cparagraph(2,10),//招标文件分析
    endTime: Mock.Random.datetime(), //投标截止时间
    tenderOpenTime: Mock.Random.datetime(), //开标时间
    securityPrice: Mock.Random.float(1, 9999, 2, 2), //投标保证金金额
    quotePrice: Mock.Random.float(1, 9999, 2, 2), //投标报价
    securityTime: Mock.Random.datetime(), //投标保证金缴纳截止时间 
    pushTime: Mock.Random.datetime(), //投标保证金递交时间 
    tenderType:Mock.Random.tenderType(),//投标形式
    quoteLetter:'不使用模板',//报价函制作
    quoteLetterTime:Mock.Random.datetime(),//报价函递交时间
    status:Mock.Random.integer(1,4),//状态
    bfb:Mock.Random.integer(1,95),//百分比
  }))
}

const mydata={
  "List":List,
  "inviteList":inviteList,
  "tenderList":tenderList
};

export default {
  getbiddingList: config => {
    let types = {
      "工程咨询": ['可行性研究', 'PPP', '财政绩效评价', '成果文件评审', '环境影响评价', '地质灾害危险性评估', '交通影响评价', '社会稳定风险评价', '安全评价', '规划决策', '节能评估', '水土保持评价'],
      "工程造价": ['工程造价'],
      "招标代理": ['施工类', '货物类', '服务类'],
      "工程监理": ['房建', '市政'],
      "全过程工程咨询": ['全过程工程咨询']
    }
    let temp = groupBy(mydata["List"], s => {
      return s["projectName"] + '-' + s["classify"];
    })
    let gp = [];
    for (let k in temp) {
      let newarr = types[temp[k][0]["classify"]];
      let r = Mock.Random.integer(0, newarr.length - 1);
      temp[k][0]["type"] = newarr[r];
      let ts = Object.assign({}, temp[k][0], {
        "proName": k
      });
      gp.push(ts);
    }

    const {
      page = 1, limit = 20, filter = {}
    } = JSON.parse(config.body);
    let keys = [];
    //过滤数组当中有空值就不要
    for (let f in filter) {
      if (filter[f] === "") {

      } else {
        keys.push(f);
      }
    }
    let mocklist = gp.filter(item => {
      return keys.every(k => {
        return item[k].indexOf(filter[k]) !== -1
      });
    })


    const userlist = mocklist.filter((item, index) => {
      return index >= limit * (page - 1) && index < limit * page;
    });
    return {
      code: 200,
      total: mocklist.length,
      rows: userlist,
      totalRows: mocklist
    }
  },
  //投标数据
  getInviteList: config => {
    // let temp = groupBy(inviteList, s => {
    //   return s["projectName"] + '-' + s["classify"];
    // })
    let gp = [];
    mydata["inviteList"].forEach(item => {
      item["proName"] = item["projectName"] + '-' + item["classify"];
      let nows = new Date().Format("yyyy-MM-dd");
      let myday = GetDateDiff(nows, item["endTime"], 'day');
      item["dayDiff"] = myday;
      gp.push(item);
    })
    gp = gp.sort(compareByType('endTime','asc'));


    const {
      page = 1, limit = 20, filter = {}
    } = JSON.parse(config.body);
    let keys = [];
    //过滤数组当中有空值就不要
    for (let f in filter) {
      if (filter[f] === "") {

      } else {
        keys.push(f);
      }
    }
    let mocklist = gp.filter(item => {
      return keys.every(k => {
        return item[k].indexOf(filter[k]) !== -1
      });
    })


    const userlist = mocklist.filter((item, index) => {
      return index >= limit * (page - 1) && index < limit * page;
    });
    return {
      code: 200,
      total: mocklist.length,
      rows: userlist,
      totalRows: mocklist
    }
  },
  //得到投标数据
  getTenderList: config => {
    const {
      page = 1, limit = 20, filter = {}
    } = JSON.parse(config.body);
    let keys = [];
    //过滤数组当中有空值就不要
    for (let f in filter) {
      if (filter[f] === "") {

      } else {
        keys.push(f);
      }
    }

    // console.log("mykeys"+JSON.stringify(keys)+"filter:"+JSON.stringify(filter));
    // let arr =[{username:'cgh',age:12},{username:'cpp',age:12},{username:'ddd',age:12}]
    // let bbs =keys.every(k=>{return arr[0][k].indexOf(filter[k])!==-1});
    //console.log(JSON.stringify(bbs));
    let mocklist = tenderList.filter(item => {
      return keys.every(k => {
        return item[k].indexOf(filter[k]) !== -1
      });
    })


    const userlist = mocklist.filter((item, index) => {
      return index >= limit * (page - 1) && index < limit * page;
    });
    return {
      code: 200,
      total: mocklist.length,
      rows: userlist,
      totalRows: mocklist
    }
  },
  //得到盖章数据
  getSealList: config => {
    const {
      page = 1, limit = 20, filter = {}
    } = JSON.parse(config.body);
    let keys = [];
    //过滤数组当中有空值就不要
    for (let f in filter) {
      if (filter[f] === "") {

      } else {
        keys.push(f);
      }
    }

    // console.log("mykeys"+JSON.stringify(keys)+"filter:"+JSON.stringify(filter));
    // let arr =[{username:'cgh',age:12},{username:'cpp',age:12},{username:'ddd',age:12}]
    // let bbs =keys.every(k=>{return arr[0][k].indexOf(filter[k])!==-1});
    //console.log(JSON.stringify(bbs));
    let mocklist = sealList.filter(item => {
      return keys.every(k => {
        return item[k].indexOf(filter[k]) !== -1
      });
    })


    const userlist = mocklist.filter((item, index) => {
      return index >= limit * (page - 1) && index < limit * page;
    });
    return {
      code: 200,
      total: mocklist.length,
      rows: userlist,
      totalRows: mocklist
    }
  },
  ///得到明细信息
  getDetail:config=>{
    const {ts,ids}=JSON.parse(config.body);
   let data = mydata[ts].filter(s=>{return s.id===ids});
   
   return data[0];//JSON对象
  },
  
  //////////////////////
  /////////////////////
  //分组统计
  getGroupByList: config => {
    const {
      filter,
      groupby
    } = JSON.parse(config.body);
    let keys = [];
    //过滤数组当中有空值就不要
    for (let f in filter) {
      if (filter[f] === "") {

      } else {
        keys.push(f);
      }
    }

    let mocklist = List.filter(item => {
      return keys.every(k => {
        return item[k].indexOf(filter[k]) !== -1
      });
    });
    let userlist = groupBy(mocklist, s => {
      let str = "";
      groupby.forEach(k => {
        str += s[k] + "-";
      })
      return str.substr(0, str.lastIndexOf('-'));
    })
    let gp = [];
    for (let s in userlist) {
      gp.push({
        name: s,
        value: userlist[s].length
      });
    }

    gp = gp.sort(compare('name'));
    return gp;
  }  
}