import Mock from "mockjs";

const count = 300;
let List = [];
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.now(),
    ip: Mock.mock('@ip'),
    region: Mock.mock('@region'),
    areaId: /\d{7}/,
    email: Mock.Random.email(),
    province: Mock.Random.province(),
    city: Mock.Random.city(),
    county: Mock.Random.county(),
    corpType: Mock.Random.corporationType(),
    IstaxPayer: Mock.Random.yesOrNo(),
    taxPayerNum: /\d{18}/,
    userCountNum: /\d{17}/,
    phoneNum: /\d{13}/,
    bankName: Mock.Random.banks(),
    scope: Mock.Random.integer(0,4),//Mock.Random.scopes()
addMan:Mock.Random.cname(),
bfb:Mock.Random.integer(1,98)
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
  getUserList: config => {
    const {
      limit,
      page
    } = JSON.parse(config.body);
    let mocklist = list;
    const userlist = mocklist.filter((item, index) => {
      return index >= (page - 1) * limit && index < limit * page
    });
    return {
      code: 200,
      total: userlist.length,
      rows: userlist
    }
  },
  getComstomList: config => {


    const {
      page=1,
      limit=20,
      filter={}
    } = JSON.parse(config.body);
    let keys=Object.keys(filter);
    let mocklist = List.filter(item=>{
          return keys.every(k=>{filter[k].indexOf(item[k])!==-1});
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
  gettest:config=>{

  }
}
