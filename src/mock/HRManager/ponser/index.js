import Mock from "mockjs";
const total=100
let allList=[]
let objById={}
let split=function(list){
  let array=[]
  if (list.length > 0) {
    list.forEach(val=>{
      array.splice(array.length,1,val.label)
      if (val.children!==undefined && val.children.length>0) {
        split(val.children).forEach(str=>{
          array.splice(array.length,1,str)
        })
      }
    })
  }
  return array
}
Mock.Random.extend({
  phone: function () {
    return Mock.mock(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])\d{8}$/)
  },
  personType:function () {
    const list=['合同A类','合同B类','劳务A类','劳务B类']
    return this.pick(list)
  },
  gender:function () {
    return Mock.Random.integer(0, 1)===0?'男':'女'
  },
  orgName:function () {
    let list=["董事会", "测试一", "测试1-4",
      "测试一组", "测试二组", "测试1-2", "测试1-1",
      "测试1-3", "测试1-5", "测试二", "测试2-1",
      "总经办", "财务部", "项目咨询中心", "监理中心",
      "造价中心", "经营管理中心", "分支机构",
      "重庆分公司", "黔西南州分公司", "广西分公司",
      "铜仁分公司", "成都分公司", "毕节办事处", "黔东南分公司",
      "日喀则分公司", "陕西分公司", "遵义分公司",
      "河南分公司", "六盘水办事处", "经营部", "市场营销",
      "投标", "外阜服务", "行政人事部", "人事", "行政",
      "招标中心", "战略投资中心", "测试三"]
    return this.pick(list)
  },
  posName:function () {
    let list=['董事长','公司经理','财务副总经理','分管副总']
    return this.pick(list)
  },
  maxEducation:function () {
    let list=['博士','研究生','本科','大专','中专/高中','初中','初中以下']
    return this.pick(list)
  }
})

export function getAllList(){
  for (let i = 0; i <= total; i++) {
    allList.push(Mock.mock({
      keyid:'@guid',
      userName:'@cname',
      gender:'@gender',
      'age|18-60':1,
      birthday:'@date',
      idCard:'@id',
      phone:'@phone',
      personType:'@personType',
      orgName:'@orgName',
      posName:'@posName',
      maxEducation:'@maxEducation'
    }))
  }
  return allList
}
