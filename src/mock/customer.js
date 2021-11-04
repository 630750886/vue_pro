import Mock from "mockjs";
import qs from "qs";
import {
  groupBy
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

const count = 200;
let List = [];
let relationShipList = []; //客户关系表
let bussinessList=[];
let visitList=[];//回访信息
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    commpanyName: Mock.Random.commpanyName(),
    emplyeerName: Mock.Random.userName(),
    address: Mock.mock('@county(true)'),
    province: Mock.Random.province(),
    city: Mock.Random.city(),
    corpType: Mock.Random.corporationType(),
    IstaxPayer: Mock.Random.yesOrNo(),
    taxPayerNum: /\d{18}/,
    userCountNum: /\d{17}/,
    phoneNum: /\d{13}/,
    bankName: Mock.Random.banks(),
    scope: Mock.Random.scopes(),
    addMan:Mock.Random.cname(),
    bfb:Mock.Random.integer(1,98),
  }))
}


for (let i = 0; i < 50; i++) {
  relationShipList.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    commpanyName: Mock.Random.commpanyName(),
    department: Mock.Random.department(),
    duty: Mock.Random.duty(),
    userName: Mock.Random.userName(),
    phone: /\d{13}/

  }))
}


for (let i = 0; i < 150; i++) {
  bussinessList.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    commpanyName: Mock.Random.commpanyName(),
    scopeList: Mock.Random.scopes(),
    firstTime: Mock.Random.datetime(),
    contractNum: /\d{13}/,
    contractName: Mock.Random.ctitle(4,20),
    contractPrice:Mock.Random.float(1, 999999, 2,2)
  }))
}

for (let i = 0; i < 89; i++) {
  visitList.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    commpanyName: Mock.Random.commpanyName(),//客户名称   
    visitTime: Mock.Random.datetime(),//回访时间
    visitType: Mock.Random.visitType(),//回访方式
    visitClass:Mock.Random.visitClass(),//回访类型
    contractNo:/\d{13}/,//合同编号
    scopes:Mock.Random.scopes(),//业务类型
    department:Mock.Random.department(),//被访人部门
    duty:Mock.Random.duty(),//被访人职位
    userName:Mock.Random.cname(),//被访人姓名
    phoneNum: /\d{13}/,//被访人电话
    projectName:Mock.Random.projectName(),//项目名称
    techValuate:Mock.Random.cparagraph(6,20),//技术质量评价
    techLevels:Mock.Random.levels(),//技术质量评价等级
    serValuate:Mock.Random.cparagraph(6,20),//服务质量评价
    serLevels:Mock.Random.levels(),//服务质量评价等级
    options:Mock.Random.cparagraph(2,20),//意见和建议
    complain:Mock.Random.yesOrNo(),//是否存在投诉
    responseMan:Mock.Random.cname(),//责任人
    status:Mock.Random.integer(1,4)//状态（回访中、回访完成、事件审核中、审核退回、审核完成）
  }))
}
export default {
  login: config => {
    const {
      username,
      pwd
    } = JSON.parse(config.body);
    let userList = {};
    userList = {
      code: 200,
      token: "admin",
      role: "admin",
      loginId: "cgh",
      userName: "张三"
    }
    return userList;
  },
  getList: config => {
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
    let mocklist = List.filter(item => {
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
  getVisitList: config => {
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
    let mocklist = visitList.filter(item => {
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


  getRowDetail:config=>{
    return {
      code: 200,     
      rows: visitList    
    };
  },
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
  },
  //得到客户关系表
  getRelationShipList: config => {
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
    let mocklist = relationShipList.filter(item => {
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
  //得到业务关系表
  getBussinessList: config => {
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
    let mocklist = bussinessList.filter(item => {
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
  }
}