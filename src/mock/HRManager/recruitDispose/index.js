import Mock from "mockjs";
Mock.Random.extend({
  type:function () {
    const list=['招聘需求','员工转正','员工离职','调岗晋级','补助申请']
    return this.pick(list)
  },
  applyOrg:function () {
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
  applyDep:function () {
    const list=['招标中心','财务部','行政部','投标管理中心']
    return this.pick(list)
  },
  applyTypes:function () {
    const list=['员工辞退','员工离职','业务增量','新增业务','新设部门']
    let array=[]
    const int=Mock.Random.integer(1, 5)
    let bo=false
    for (let i = 0; i < int; i++) {
      let str=list[Mock.Random.integer(0, 4)]
      array.forEach(value => {
        if (value === str) {
          bo=true
        }
      })
      if (!bo) {
        array.push(str)
      }
    }
    return array
  },
  urgency:function () {
    const list=['A：人员需求急，煤田筛选简历并发送，尽快安排面试',
      'B：人员需求比较急，每2-3天筛选简历并发送','C：人员需求不急，加大筛选力度，每4-5天筛选简历并发送']
    let array=[]
    array.push(list[Mock.Random.integer(0, 2)])
    return array
  }
})
let allList=[]
let tatol=40
export function getAllList() {
  for (let i = 0; i < tatol; i++) {
    allList.push(Mock.mock({
      keyid:'@guid',
      applyTime:'@date',
      templateType:'@type',
      applyOrg:'@applyOrg',
      applyDepartment:'@applyDep'
    }))
  }
  return {rows:allList,total:allList.length}
}
export function showData() {
  let become=''
  let quit=''
  let recruit=Mock.mock({
    applyDepartment:'@applyDep',
    recruitStation:'招标助理',
    applyTime: '@date',
    'recruitNumber|1-10': 1,
    applyTypes:'@applyTypes',
    applyReason: '@cparagraph(20)',
    urgency:'@urgency',//
    stationDuty: '@cparagraph(20)',
    education: '本科',
    'workYears|1-10': 1,
    majorReason: '@cparagraph(50)',
    genderReason: '@cparagraph(20)',
    ageReason: 18+'-'+Mock.Random.integer(19,26),
    experience: '@cparagraph(5)',
    otherReason:'@cparagraph(5)',
    departmentManagerOpinion:'@cparagraph(20)',//部门经理意见
    departmentVicePresidentOpinion:'@cparagraph(20)',//部门分管副总意见
    hrVicePresidentOpinion:'@cparagraph(20)'//人力资源分管副总意见
  })
  let subsidy=''
  let transfer=''
  let obj={
    become:become,
    quit:quit,
    recruit:recruit,
    subsidy:subsidy,
    transfer:transfer
  }
  return obj
}
