import {getOrgTree, getPost, getTypeListByCode, getRegion,getCascaderType,getCommpany} from '../../../api/webapi-sys.js'

const module = {
  namespaced: true,
  state: {
    //组织
    organizeList: [],
    //岗位
    positionList: [],
    //公司
    commpanyList:[],
    //行政区
    region: [
    ],
    nomalytpe:[],
    //人事模块
    hrCodeList: [
      'personType',
      'education',
      'titleLevel',
      'titleType',
      'practiceType',
      'recruitType',
      'recruitDegree',
      'quitType',
      'quitReason'
    ],
    //人员类型
    personType: {
      code: 'TYPE-001',
      list: []
    },
    //学历类型编号
    education: {
      code: 'TYPE-002',
      list: []
    },
    //职称等级
    titleLevel: {
      code: 'TYPE-003',
      list: []
    },
    //职称类型
    titleType: {
      code: 'TYPE-004',
      list: []
    },
    //执业类型编号
    practiceType: {
      code: 'TYPE-005',
      list: []
    },
    //招聘类型
    recruitType: {
      code: 'TYPE-006',
      list: []
    },
    //招聘程度
    recruitDegree: {
      code: 'TYPE-007',
      list: []
    },
    //离职类型
    quitType: {
      code: 'TYPE-008',
      list: []
    },
    //离职原因
    quitReason: {
      code: 'TYPE-009',
      list: []
    },
    /**
     * 客户模块
     */
    cusCodeList: ['unitNature', 'serviceBusiness','returnWay','returnTypes','serviceLevel'],
    //单位性质
    unitNature: {
      code: 'TYPE-010',
      list: []
    },
    //服务业务
    serviceBusiness: {
      code: 'TYPE-011',
      list: []
    },
    //回访方式
    returnWay:{
      code: 'TYPE-012',
      list: []
    },
    //回访类型
    returnTypes:{
      code: 'TYPE-013',
      list: []
    },
    //服务评价
    serviceLevel:{
      code: 'TYPE-014',
      list: []
    },
    /**
     * 合同模块
     */
    conCodeList:['businessType','busConType','disputeType','cancelType'],
    //业务类型
    businessType:{
      code: 'TYPE-015',
      list: []
    },
    //业务合同类型
    busConType:{
      code: 'TYPE-016',
      list: []
    },
    //合同争议解决
    disputeType:{
      code: 'TYPE-022',
      list: []
    },
    //合同取消
    cancelType:{
      code: 'TYPE-023',
      list: []
    },
    /**
     * 业务模块工作台
     */
    businessWorkbench:['projectConsultWorkbenchService'],
    //工程咨询服务类型
    projectConsultWorkbenchService:{
      code:'TYPE-047',
      list:[],
    },

    //项目状态
    projectStatus:{
      code:'TYPE-066',
      list:[],
    },
    //工作台
    workbenchType:{
      code:'TYPE-046',
      list:[],
    },
    /**
     * 业务模块工程咨询项目
     */
    //专业工程分类
    projectConsultMajorProject:{
      code:'TYPE-057',
      list:[],
    },
    //决策类型
    projectConsultDecisionType:{
      code:'TYPE-058',
      list:[],
    },
    //项目类型
    projectConsultItemType:{
      code:'TYPE-059',
      list:[],
    },
    //取消类型
    projectConsultItemCancelType:{
      code:'TYPE-063',
      list:[],
    },
    projectConsultWorkGroup:{
      code:'TYPE-064',
      list:[],
    },
    /**
     * 造价咨询项目
     */
    //专业工程分类
    projectCostMajorProject:{
      code:'TYPE-057',
      list:[],
    },
    //项目类型
    projectCostItemType:{
      code:'TYPE-068',
      list:[],
    },
    /**
     * 招标代理
     */
    //专业工程项目
    biddingAgencyMajorProject:{
      code:'TYPE-057',
      list:[],
    },
    //招标类型 biddingAgencyItemType
    biddingAgencyType:{
      code:'TYPE-071',
      list:[],
    },
    //项目类型
    biddingAgencyItemType:{
      code:'TYPE-072',
      list:[],
    },
    //招标平台
    biddingPlatform:{
      code:'TYPE-080',
      list:[],
    },
    //备案机构
    agencyType:{
      code:'TYPE-081',
      list:[],
    },
    //工程监理
    projectSupervisorMajorProject:{
      code:'TYPE-057',
      list:[],
    },
    //财务明细费用类型
    finDetailType:{
      code:'TYPE-050',
      list:[]
    },
    /**
     * 级联分类
     */
    cascaderCodeList:['nonBusConType','ReimbursReimbursement_bid','Reimbursement_Business','Reimbursement_dept','Reimbursement_commpany','Reimbursement_liu','Reimbursement_zheng'],
    //非业务合同类型
    nonBusConType:{
      code:'TYPE-017',
      list:[]
    },
    //费用报销-投标费用
    ReimbursReimbursement_bid:{
      code:'TYPE-024',
      list:[]
    },
    //费用报销-业务费用
    Reimbursement_Business:{
      code:'TYPE-025',
      list:[]
    },
    //费用报销-部门费用
    Reimbursement_dept:{
      code:'TYPE-026',
      list:[]
    },
    //费用报销-公司费用
    Reimbursement_commpany:{
      code:'TYPE-027',
      list:[]
    },
    //费用报销-刘总费用
    Reimbursement_liu:{
      code:'TYPE-028',
      list:[]
    },
    //费用报销-陈总费用
    Reimbursement_zheng:{
      code:'TYPE-029',
      list:[]
    },
    //审核盖章状态
    reportStatus:{
      code:'TYPE-088',
      list:[]
    }
  },
  getters: {
    Nomalytpe:state=>{
      return state.nomalytpe;
    },
    loadHrType: state => {
      return {
        titleLevelList: state.titleLevel.list,
        personTypeList: state.personType.list,
        educationList: state.education.list,
        titleTypeList: state.titleType.list,
        practiceTypeList: state.practiceType.list,
        organizeList: state.organizeList,
        positionList: state.positionList,
      }
    },
    loadCusType: state => {
      return {
        region: state.region,
        unitNature: state.unitNature.list,
        serviceBusiness: state.serviceBusiness.list
      }
    },
    singleConType:state=>{
      return state.busConType.list.filter((item,index)=> {
        if (index < 7) {
          return item
        }
      })
    },
    singleBusType:state=>{
      return state.businessType.list.filter((item,index)=> {
        if (index < 5) {
          return item
        }
      })
    },
    frameBusType:state=>{
      return state.businessType.list.filter((item,index)=>{
        return index<6
      })
    }
  },
  mutations: {
    updatenomalytpe(state, data){
      state.nomalytpe=data;
    },
    updateOrganizeList(state, data) {
      state.organizeList = data
    },
    updatePositionList(state, data) {
      state.positionList = data
    },
    updateCommpanyList(state,data){

      state.commpanyList=data;
    },
    updateRegion(state,data){
      state.region=data
    },
    updateType(state, {data, type}) {
      state[type].list = data
    },
  },
  actions: {
    networkGetOrgAndPost(context){
      getOrgTree({keyid: '0000'}).then(item => {
        context.commit('updateOrganizeList', item.data)
      }).catch(() => {
        console.log('loadType:获取组织信息异常')
      })
      getPost({}).then(item => {
        context.commit('updatePositionList', item.data)
      }).catch(() => {
        console.log('loadType:获取岗位信息异常')
      })
    },
    //公司
    networkGetCommpany(context){
      getCommpany({}).then(item=>{
        if(item.code==200){

          context.commit('updateCommpanyList', item.data)
        }
      }).catch(()=>{
        console.log('loadType:获取公司信息异常')
      })
    },
    //人事模块
    networkGetHrLoadData(context) {
      getOrgTree({keyid: '0000'}).then(item => {
        context.commit('updateOrganizeList', item.data)
      }).catch(() => {
        console.log('loadType:获取组织信息异常')
      })
      getPost({}).then(item => {
        context.commit('updatePositionList', item.data)
      }).catch(() => {
        console.log('loadType:获取岗位信息异常')
      })
      context.state.hrCodeList.forEach(type => {
        getTypeListByCode({code: context.state[type].code}).then(item => {
          context.commit('updateType', {data: item.data, type: type})
        }).catch(() => {
          console.log('loadType:' + type + '获取异常')
        })
      })
    },
    //行政区
    networkGetRegion(context) {
      getRegion({}).then(item => {
        context.commit('updateRegion', item.data)
      })
    },
    //客户模块
    networkGetCusLoadData(context) {
      context.state.cusCodeList.forEach(type => {
        getTypeListByCode({code: context.state[type].code}).then(item => {
          context.commit('updateType', {data: item.data, type: type})
        }).catch(() => {
          console.log('loadType:' + type + '获取异常')
        })
      })
    },
    //合同模块
    networkGetConLoadData(context){
      context.state.conCodeList.forEach(type => {
        getTypeListByCode({code: context.state[type].code}).then(item => {
          context.commit('updateType', {data: item.data, type: type})
        }).catch(() => {
          console.log('loadType:' + type + '获取异常')
        })
      })
    },
    //获取级联分类
    networkGetCascaderLoadData(context){
      context.state.cascaderCodeList.forEach(type => {

        getCascaderType({code: context.state[type].code}).then(item => {
          context.commit('updateType', {data: item.data, type: type})
        }).catch(() => {
          console.log('loadType:' + type + '获取异常')
        })
      })
    },

    networkGetCascaderNomalData(context,ecode)
    {
      getCascaderType({code:ecode}).then(item => {
        context.commit('updatenomalytpe', item.data)
      }).catch(() => {
        console.log('loadType:' + type + '获取异常')
      })
    },
    //获取业务模块工作台服务类容
    networkBusinessWorkbenchLoadData(context){
      context.state.businessWorkbench.forEach(type => {
        getTypeListByCode({code: context.state[type].code}).then(item => {
          context.commit('updateType', {data: item.data, type: type})
        }).catch(() => {
          console.log('loadType:' + type + '获取异常')
        })
      })
    },
    networkGetSelect(context,array){
      if (Array.isArray(array)){
        array.forEach(type => {
          console.log(context.state[type].code);
          getTypeListByCode({code: context.state[type].code}).then(item => {
            context.commit('updateType', {data: item.data, type: type})
          }).catch(() => {
            console.log('loadType:' + type + '获取异常')
          })
        })
      }
    },
    networkGetCascader(context,array){
      if (Array.isArray(array)){
        array.forEach(type => {
          getCascaderType({code: context.state[type].code}).then(item => {
            context.commit('updateType', {data: item.data, type: type})
          }).catch(() => {
            console.log('loadType:' + type + '获取异常')
          })
        })
      }
    },
    networkGetSelectByCode(context,code){
      return getTypeListByCode({code: code}).then(item => {
        return item.data
      })
    },
    networkGetCascaderByCode(context,code){
      return getCascaderType({code: code}).then(item => {
        return item.data
      })
    },
  }
}
export default module;
