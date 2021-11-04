import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Index from "../oldV/index.vue";
import login from "@/views/login.vue";

Vue.use(VueRouter);

const myroutes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "home",
    component: Home,
    children: [
      {
        path: "",
        name: "nindex",
        component:Index,
        meta: {
          title: "工作台"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "nlogin",
    component: login,
    meta: {
      title: "登录管理"
    }
  },
  {
    //客户
    path: "/customer",
    name: "ncustomer",
    component: Home,
    meta: {
      title: "客户管理"
    },
    children: [
      {
        path: "customerManager",
        name: "ncustomerManager",
        component:() => import('../pages/customerManager/customerInfo/index.vue'),//customerInfo,
        meta: {
          title: ""
        }
      },
      {
        path: "upkeepManager",
        name: "nupkeepManager",
        component:() => import('../pages/customerManager/customerMaintenance/index.vue'),//upkeepInfo,
        meta: {
          title: ""
        }
      },
      /*新增*/
      {
        path: "basicManager",
        name: "nbasicManager",
        component:() => import('../pages/customerManager/customerInfo/custBasicInfo/index.vue'),//basicInfo,
        meta: {
          title: ""
        }
      },
      {
        path: "custMainManager",
        name: "ncustMainManager",
        component:() => import('../pages/customerManager/customerMaintenance/custMainBasicInfo/index.vue'),//custMainBasicInfo,
        meta: {
          title: ""
        }
      },
      {
        path: "",
        name: "custMainManager",
        component:() => import('../pages/customerManager/customerMaintenance/custMainBasicInfo/index.vue'),//custMainBasicInfo,
        meta: {
          title: ""
        }
      },
      {
        path: "original_template",
        name: "noriginal_template",
        component:() => import('../pages/originalTemplate/index.vue'),//original_template,
        meta: {
          title: ""
        }
      }
    ]
  },
  {
    //合同
    path: "/contract",
    name: "ncontract",
    component: Home,
    children: [
      {
        path: "business",
        name: "nbusiness",
        component:() => import('../pages/contractManager/businessContract/index.vue'),//contract_query,
        meta: {
          title: ""
        }
      },

      {
        path: "original_script",
        name: "noriginal_script",
        component:() => import('../pages/contractManager/xOriginalScriptManager/index.vue'),//contract_original_script,
        meta: {
          title: "合同原件"
        }
      },
      {
        path: "template_manager",
        name: "ntemplate_manager",
        component:() => import('../pages/originalTemplate/index.vue'),//original_template,
        meta: {
          title: "合同模板"
        }
      },
      {
        path: "non_business",
        name: "nnon_business",
        component:() => import('../pages/contractManager/nonBusContract/index.vue'),//Non_business,
        meta: {
          title: "非业务合同"
        }
      },
      {
        path: "basic_manager",
        name: "nbasic_manager",
        component:() => import('../pages/contractManager/nonBusContract/showBasicInfo/index.vue'),//basic_info,
        meta: {
          title: "非业务合同基本信息"
        }
      },
      {
        path: "business_basic_manager",
        name: "nbusiness_basic_manager",
        component:() => import('../pages/contractManager/businessContract/showBasicInfo/index.vue'),//business_basic,
        meta: {
          title: "非业务合同基本信息"
        }
      }
    ]
  },
  {
    //投标管理
    path: "/bid",
    name: "bid",
    component: Home,
    children: [
      {
        path: "record_manager",
        name: "nrecord_manager",
        component:() => import('../pages/bidManager/bidHomepage/index.vue'),//record_manager,
        meta: {
          title: "投标备案"
        }
      },
      {
        path: "bid_basic",
        name: "nbid_basic",
        component:() => import('../pages/bidManager/bidHomepage/showBasic/index.vue'),//bid_basic,
        meta: {
          title: "项目情况登记"
        }
      },
      {
        path: "website_manager",
        name: "nwebsite_manager",
        component:() => import('../pages/bidManager/bidWebsite/index.vue'),//website_manager,
        meta: {
          title: "投标网站管理"
        }
      },
      {
        path: "bid_template",
        name: "nbid_template",
        component:() => import('../pages/originalTemplate/index.vue'),//original_template,
        meta: {
          title: "投标模板管理"
        }
      },
      {
        path: "workbench",
        name: "nworkbench",
        component:() => import('../pages/bidManager/workbench/index.vue'),//bid_workbench,
        meta: {
          title: "投标工作台"
        }
      }
    ]
  },
  {
    //业务管理
    path: "/business",
    name: "business",
    component: Home,
    children: [
      {
        path: "project_consult",
        name: "project_consult",
        component:() => import('../pages/businessManager/projectConsult/index.vue'),//project_consult,
        meta: {
          title: "工程咨询"
        }
      },
      {
        path: "project_cost",
        name: "project_cost",
        component:() => import('../pages/businessManager/projectCost/index.vue'),//project_cost,
        meta: {
          title: "造价咨询"
        }
      },
      {
        path: "project_supervisor",
        name: "project_supervisor",
        component:() => import('../pages/businessManager/projectSupervisor/index.vue'),//project_supervisor,
        meta: {
          title: "工程监理"
        }
      },
      {
        path: "bidding_agency",
        name: "bidding_agency",
        component:() => import('../pages/businessManager/biddingAgency/index.vue'),//bidding_agency,
        meta: {
          title: "招标代理"
        }
      },
      {
        path: "whole_process",
        name: "whole_process",
        component:() => import('../pages/businessManager/wholeProcess/index.vue'),//whole_process,
        meta: {
          title: "全过程咨询"
        }
      },
      {
        path: "item_manager",
        name: "item_manager",
        component:() => import('../pages/businessManager/itemManager/index.vue'),//item_manager,
        meta: {
          title: "项目管理"
        }
      },
      {
        path: "integrated_service",
        name: "integrated_service",
        component:() => import('../pages/businessManager/integratedService/index.vue'),//integrated_service,
        meta: {
          title: "综合业务"
        }
      },
      {
        path: "item_original",
        name: "item_original",
        component:() => import('../pages/businessManager/itemOriginalManager/index.vue'),//item_original,
        meta: {
          title: "项目原件管理"
        }
      },
      {
        path: "trading_platform",
        name: "trading_platform",
        component:() => import('../pages/businessManager/biddingAgency/tradingPlatform/index.vue'),//item_original,
        meta: {
          title: "项目原件管理"
        }
      },
      {
        path: "template",
        name: "template",
        component:() => import('../pages/originalTemplate/index.vue'),//original_template,
        meta: {
          title: "模板管理"
        }
      },
      {
        path: "staregist",
        name: "staregist",
        component:() => import('../pages/businessManager/strategist/index.vue'),//strategist,
        meta: {
          title: "统计分析"
        }
      },

      {
        path: "workbench",
        name: "workbench",
        component:() => import('../pages/businessManager/workbench/index.vue'),//workbench,
        meta: {
          title: "工作台"
        }
      }
    ]
  },
  {
    //财务
    path: "/finance",
    name: "finance",
    component: Home,
    children: [
      {
        path: "collect_fees",
        name: "collect_fees",
        component:() => import('../pages/financeManager/collectFees/index.vue'),//finance_collect_fees,
        meta: {
          title: "收款管理"
        }
      },
      {
        path: "invoice",
        name: "invoice",
        component:() => import('../pages/financeManager/invoice/index.vue'),//finance_invoice,
        meta: {
          title: "发票管理"
        }
      },
      {
        path: "other",
        name: "other",
        component:() => import('../pages/financeManager/other/index.vue'),//finance_other,
        meta: {
          title: "其他管理"
        }
      }
    ]
  },
  {
    //档案
    path: "/archive",
    name: "archive",
    component: Home,
    children: [
      {
        path: "hr_archive",
        name: "hr_archive",
        component:() => import('../pages/archiveManager/hrArchive/index.vue'),//hr_archive,
        meta: {
          title: "人事档案"
        }
      },
      {
        path: "administration_archive",
        name: "administration_archive",
        component:() => import('../pages/archiveManager/administrativeArchive/index.vue'),//administration_archive,
        meta: {
          title: "行政档案"
        }
      },
      {
        path: "finance_archive",
        name: "finance_archive",
        component:() => import('../pages/archiveManager/financeArchive/index.vue'),//finance_archive,
        meta: {
          title: "财务档案"
        }
      },
      {
        path: "bid_archive",
        name: "bid_archive",
        component:() => import('../pages/archiveManager/bidArchive/index.vue'),//bid_archive,
        meta: {
          title: "投标档案"
        }
      },
      {
        path: "contract_archive",
        name: "contract_archive",
        component:() => import('../pages/archiveManager/contractArchive/index.vue'),//contract_archive,
        meta: {
          title: "合同档案"
        }
      },
      {
        path: "business_archive",
        name: "business_archive",
        component:() => import('../pages/archiveManager/businessArchive/index.vue'),//business_archive,
        meta: {
          title: "业务档案"
        }
      }
    ]
  },
  {
    //系统
    path: "/sys",
    name: "sys",
    component: Home,
    children: [
      {
        path: "org_manager",
        name: "org_manager",
        component:() => import('../pages/systemManager/orgAndPosManager/index.vue'),//org_index,
        meta: {
          title: "组织和岗位"
        }
      },
      {
        path: "sys_type",
        name: "sys_type",
        component:() => import('../pages/systemManager/sysType/index.vue'),//sys_type,
        meta: {
          title: "系统类型"
        }
      },
      {
        path: "sys_user",
        name: "sys_user",
        component:() => import('../pages/systemManager/sysUser/index.vue'),//sys_user,
        meta: {
          title: "系统用户"
        }
      },
      {
        path: "sys_menu",
        name: "sys_menu",
        component:() => import('../pages/systemManager/sysMenu/index.vue'),//sys_menu,
        meta: {
          title: "系统菜单"
        }
      },
      {
        path: "flow_manager",
        name: "flow_manager",
        component:() => import('../pages/flowManager/index.vue'),//flow_manager,
        meta: {
          title: "流程管理"
        }
      },
      {
        path: "sys_role",
        name: "sys_role",
        component:() => import('../pages/systemManager/sysrole/index.vue'),//sys_role,
        meta: {
          title: "角色管理"
        }
      },
      {
        path: "changCode",
        name: "changCode",
        component:() => import('../pages/systemManager/changeContract/index.vue'),//changeContract,
        meta: {
          title: "修改合同号！"
        }
      }
    ]
  },
  {
    //人事
    path: "/HR",
    name: "HR",
    component: Home,
    children: [
      {
        path: "base_manager",
        name: "base_manager",
        component:() => import('../pages/HRManager/personInfo/index.vue'),//base_index,
        meta: {
          title: ""
        }
      },
      {
        path: "base_personInfo",
        name: "base_personInfo",
        component:() => import('../pages/HRManager/personInfo/basiceMode/index.vue'),//basiceMode_index,
        meta: {
          title: ""
        }
      },
      {
        path: "plat_manager",
        name: "plat_manager",
        component:() => import('../pages/policies/standard/index.vue'),//platForm_index,
        meta: {
          title: "模板管理"
        }
      },
      {
        path: "hdpolicies",
        name: "hdpolicies",
        component:() => import('../pages/policies/template/policies.vue'),//policies,
        meta: {
          title: "政策法规管理"
        }
      },
      {
        path: "recruit_manager",
        name: "recruit_manager",
        component:() => import('../pages/HRManager/recruitDispose/index.vue'),//recruit_index,
        meta: {
          title: ""
        }
      },
      {
        path: "card_manager",
        name: "ncard_manager",
        component:() => import('../pages/sharedManager/MaterialSeal/index.vue'),//card_index,
        meta: {
          title: ""
        }
      },
      {
        path: "dataInfo_manager",
        name: "dataInfo_manager",
        component:() => import('../pages/HRManager/personInfo/dataExhibition/index.vue'),//dataInfo_index,
        meta: {
          title: ""
        }
      },
      {
        path: "original_template",
        name: "original_template",
        component:() => import('../pages/originalTemplate/index.vue'),//original_template,
        meta: {
          title: "人事相关模板"
        }
      }
    ]
  },
  {
    //共享
    path: "/shared",
    name: "shared",
    component: Home,
    children: [
      {
        path: "card_manager",
        name: "card_manager",
        component:() => import('../pages/sharedManager/MaterialSeal/index.vue'),//card_index,
        meta: {
          title: "其它资料盖章"
        }
      },
      {
        path: "card_fy",
        name: "card_fy",
        component:() => import('../pages/sharedManager/Reimbursement/index.vue'),//fy,
        meta: {
          title: "费用报销"
        }
      },
      {
        path: "policies",
        name: "policies",
        component:() => import('../pages/policies/standard/index.vue'),//policies,
        meta: {
          title: "文档模板"
        }
      }
    ]
  },
  {
    //行政
    path: "/administrative",
    name: "administrative",
    component: Home,
    children: [
      {
        path: "activity",
        name: "activity",
        component:() => import('../pages/administrativeManager/activity/index.vue'),//administrative_activity,
        meta: {
          title: "活动管理"
        }
      },
      {
        path: "information",
        name: "information",
        component:() => import('../pages/administrativeManager/information/index.vue'),//administrative_information,
        meta: {
          title: "信息管理"
        }
      },
      {
        path: "document",
        name: "document",
        component:() => import('../pages/administrativeManager/document/index.vue'),//administrative_document,
        meta: {
          title: "文件管理"
        }
      },
      {
        path: "qualification",
        name: "qualification",
        component:() => import('../pages/administrativeManager/qualificationHonor/index.vue'),//administrative_qualification,
        meta: {
          title: "资质荣誉工商管理"
        }
      },
      {
        path: "seal_ca_lock",
        name: "seal_ca_lock",
        component:() => import('../pages/administrativeManager/sealAndCALock/index.vue'),//administrative_seal_ca_lock,
        meta: {
          title: "印章CA锁管理"
        }
      },
      {
        path: "purchase_use",
        name: "purchase_use",
        component:() => import('../pages/administrativeManager/purchaseUse/index.vue'),//administrative_purchase_use,
        meta: {
          title: "采购领用管理"
        }
      },
      {
        path: "logistics",
        name: "logistics",
        component:() => import('../pages/administrativeManager/logistics/index.vue'),//administrative_logistics,
        meta: {
          title: "后勤管理"
        }
      }
    ]
  },
  {
    path:"/statisticalanalysis",
    name:"statisticalanalysis",
    component:Home,
    meta:{
      title:"统计与分析"
    },
    children:[
      {
        path: "bidtender",
        name: "bidtender",
        component:() => import('../pages/statisticalanalysis/bidtender/bidtender.vue'),//administrative_activity,
        meta: {
          title: "投标分析"
        }
      },
      {
        path: "business",
        name: "tbusiness",
        component:() => import('../pages/statisticalanalysis/business/business.vue'),//administrative_activity,
        meta: {
          title: "业务统计"
        }
      },
      {
        path: "contract",
        name: "contract",
        component:() => import('../pages/statisticalanalysis/contract/contract.vue'),//administrative_activity,
        meta: {
          title: "合同分析"
        }
      },
      {
        path: "customer",
        name: "customer",
        component:() => import('../pages/statisticalanalysis/customer/customer.vue'),//administrative_activity,
        meta: {
          title: "客户统计"
        }
      },
      {
        path: "hrpersion",
        name: "hrpersion",
        component:() => import('../pages/statisticalanalysis/hr/hrpersion.vue'),//administrative_activity,
        meta: {
          title: "人员统计"
        }
      },
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  routes: myroutes,
});

export default router;
