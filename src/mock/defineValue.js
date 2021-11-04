import Mock from "mockjs";
Mock.Random.extend({
    corporationType: function (date) {
      var st = ["国企", "事业单位", "企业", "高校", "医院", "银行", "金融机构"];
      return this.pick(st);
    }
  })  
 
  
  Mock.Random.extend({
    banks: function (date) {
      var st = ["建设银行", "工商银行", "农业银行", "中国银行", "兴业银行", "招商银行", "华夏银行"];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
    scopes: function (date) {
      var st = ["工程咨询", "工程造价", "招标代理", "工程监理", "全过程工程咨询"];
      return this.pick(st);
    }
  }) 
  
  
  Mock.Random.extend({
    yesOrNo: function (date) {
      var st = ["是", "否"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    status: function (date) {
      var st = ["通过", "不通过"];
      return this.pick(st);
    }
  })

  Mock.Random.extend({
    projectStatus: function (date) {
      var st = ["在建", "已建","竣工","终止"];
      return this.pick(st);
    }
  })

  Mock.Random.extend({
    applyType: function (date) {
      var st = ["差旅费", "标书采购费","业务咨询费","其它费用"];
      return this.pick(st);
    }
  })
 

  Mock.Random.extend({
    resourceType: function (date) {
      var st = ["项目前期", "项目中期","项目后期", "成果文件","项目管理成果", "其它"];
      return this.pick(st);
    }
  })

  Mock.Random.extend({
    visitType: function (date) {
      var st = ["电话", "面访","电子邮件"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    visitClass: function (date) {
      var st = ["项目回访","非项目回访"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    tenderType: function (date) {
      var st = ["报价函形式","招标形式","比选形式"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    levels: function (date) {
      var st = ["优","良","中","差"];
      return this.pick(st);
    }
  })
  
  
  Mock.Random.extend({
    banks: function (date) {
      var st = ["建设银行", "工商银行", "农业银行", "中国银行", "兴业银行", "招商银行", "华夏银行"];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
    scopes: function (date) {
      var st = ["工程咨询", "工程造价", "招标代理", "工程监理", "全过程工程咨询"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    inviteType: function (date) {
      var st = ["委托招标", "自主招标"];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
    department: function (date) {
      let st = ["造价部", "招标部", "监理部", "咨询部", "财务部", "经营管理部"];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
    duty: function (date) {
      let st = ["总经理", "副总经理", "经理", "主管", "员工","纪委书记","总经理助理","后勤主管","宣传主管","文书主管","综合主管","工程主管","预算主管","设计主管","培训主管"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    org: function (date) {
      let st = ['总经办','经营管理中心','造价中心','招标中心','监理中心','咨询中心','财务部'];
      return this.pick(st);
    }
  })  
  Mock.Random.extend({
    dept: function (date) {
      let st = ['总经办','经营部','行政人资部','招标贵阳部一部','监理贵阳部一部','咨询贵阳部一部','造价重庆部一部','造价重庆部二部','造价重庆部三部','造价贵阳部一部','财务部','重庆分公司','成都分公司','铜仁分公司','遵义分公司','黔东南分公司','黔西南州分公司','广西分公司','日喀则分公司','河南分公司','陕西分公司','毕节办事处','六盘水办事处','云南分公司','新浦分公司','陈晓辉项目团队','袁秀项目团队','海鹰项目团队'];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    posLevel: function (date) {
      let st = ['一级','二级','三级','四级','五级'];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    contractType: function (date) {
      let st = ['合同工A类','合同工B类','劳务工A类','劳务工B类'];
      return this.pick(st);
    }
  })

  Mock.Random.extend({
    recruitType: function (date) {
      let st = ['人员需求','员工转正','员工离职'];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
    commpanyName: function(date) {
      let st = ["测试公司1", "测试公司2", "测试公司3", "测试公司4", "测试公司5", "测试公司6", "测试公司7"];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
    userName: function (date) {
      let st = ["测试员工1", "测试员工2", "测试员工3", "测试员工4", "测试员工5", "测试员工6", "测试员工7"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    mainbody: function(date) {
      let st = ["经营部", "遵义分公司", "都匀分公司", "毕节分公司", "六盘水分公司", "铜仁分公司", "黔西南分公司", "安顺水分公司"];
      return this.pick(st);
    }
  })
  Mock.Random.extend({
    yesOrNo: function (date) {
      var st = ["是", "否"];
      return this.pick(st);
    }
  })
  
  Mock.Random.extend({
      classify: function(date) {
        let st = ["工程咨询", "工程造价", "招标代理", "工程监理", "全过程工程咨询"];
        return this.pick(st);
      }
    })
    
    Mock.Random.extend({
      ways: function(date) {
        let st = ["公开招标", "邀请招标", "公开竞争性谈判", "邀请竞争性谈判", "公开竞争性磋商", "邀请竞争性磋商", "询价"];
        return this.pick(st);
      }
    })
    Mock.Random.extend({
      projectName: function(date) {
        let st = ["人民大道A段", "人民大道B段", "人民大道C段", "人民大道D段", "中环路A段","中环路B段", "中环路C段", "中环路D段", "云峰大道A段", "云峰大道B段", "云峰大道C段", "云峰大道D段","青云路A段", "青云路B段", "青云路C段", "青云路D段","文化路A段", "文化路B段", "文化路C段", "文化路D段","宝山路A段", "宝山路B段", "宝山路C段", "宝山路D段","新华路A段", "新华路B段", "新华路C段", "新华路D段"];
        return this.pick(st);
      }
    })
 
