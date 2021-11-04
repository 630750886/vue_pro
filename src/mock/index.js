import Mock from "mockjs";
import definevalue from "./defineValue";
import userAPI from "./user";
import pageindexAPI from "./pageIndex";
import customerAPI from "./customer";
import biddingAPI from "./bidding";
import contractAPI from "./conract";
import projectAPI from "./project";
import financeAPI from "./finance";
import archiveAPI from "./archive";
import sysAPI from "./system";
import HumanResourceAPI from "./humanResource";

Mock.mock(/\/user\/login/, "get", userAPI.login);
Mock.mock(/\/page\/getCalendar/, "get", pageindexAPI.getCalendar);
Mock.mock(/\/page\/getTask/, "get", pageindexAPI.getTaskList);
Mock.mock(/\/user\/getUserList/, "get", userAPI.getUserList);
Mock.mock(/\/user\/getComstomList/, "get", userAPI.getComstomList);
Mock.mock(/\/customer\/getList/, "get", customerAPI.getList); //得到用户信息
Mock.mock(/\/customer\/getGroupByList/, "get", customerAPI.getGroupByList); //得到分组信息
Mock.mock(
  /\/customer\/getRelationShipList/,
  "get",
  customerAPI.getRelationShipList
);
Mock.mock(/\/customer\/getBussinessList/, "get", customerAPI.getBussinessList);
Mock.mock(/\/customer\/getRowDetail/, "get", customerAPI.getRowDetail);
Mock.mock(/\/customer\/getVisitList/, "get", customerAPI.getVisitList); //得到维护用户信息
//Mock.mock(/\/user\/gettest/, 'get', userAPI.gettest);//gettest
Mock.mock(/\/bidding\/getbiddingList/, "get", biddingAPI.getbiddingList);
Mock.mock(/\/bidding\/getInviteList/, "get", biddingAPI.getInviteList);
Mock.mock(/\/bidding\/getDetail/, "get", biddingAPI.getDetail);
Mock.mock(/\/bidding\/getTenderList/, "get", biddingAPI.getTenderList);
Mock.mock(/\/bidding\/getSealList/, "get", biddingAPI.getSealList); //
//contract
Mock.mock(/\/contract\/getqueryList/, "get", contractAPI.getqueryList);
Mock.mock(/\/contract\/getapplyList/, "get", contractAPI.getapplyList);
//project
Mock.mock(/\/project\/getqueryList/, "get", projectAPI.getqueryList);
Mock.mock(/\/project\/getresourceList/, "get", projectAPI.getresourceList);
//finance
Mock.mock(/\/finance\/getqueryList/, "get", financeAPI.getqueryList);
//archive
Mock.mock(/\/archive\/getqueryList/, "get", archiveAPI.getqueryList);
//system
Mock.mock(/\/system\/getqueryList/, "get", sysAPI.getqueryList);
//HR
Mock.mock(/\/HR\/getqueryList/, "get", HumanResourceAPI.getqueryList);
Mock.mock(/\/HR\/getDetail/, "get", HumanResourceAPI.getDetail);
Mock.mock(/\/HR\/getRecruitList/, "get", HumanResourceAPI.getRecruitList);
Mock.mock('api/engineering_consult/queryData','post',{
    code:200,
    message:'查询成功',
    data:[{
        id:'@increment(1)'
    }]
})
export default Mock;
