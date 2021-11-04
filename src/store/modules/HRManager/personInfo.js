import Vue from 'vue'
import {getAllPerson,getPersonByKeyid,queryPersonByStatus,queryPerson,addPerson,changeposPerson,
  upPerson,
  findEducationByPersonId,
  findHonorByPersonId,
  findInsuranceByPersonId,
  findPracticeByPersonId,
  findSocialfundByPersonId,
  findTitleByPersonId,
  addEducation,
  addHonor,
  addInsurance,
  addPractice,
  addSocialfund,
  addTitle,
  upEducation,
  upHonor,
  upInsurance,
  upPractice,
  upTitle,
  findcredentialsByPersonId,
  addcredentials,
  deletescredentials,
  findagreementByPersonId,
  addagreement,
  deletesagreement,
  deletesEducation,
  deletesHonor,
  deletesInsurance,
  deletesPractice,
  deletesTitle,
} from '../../../api/webapi-hr.js'

let _this = new Vue()
const module = {
  namespaced: true,
  state: {
    //当前人员id
    currentPersonId: '',
    pageShow:{
      pageInfo:{
        page:1,
        limit:30
      },
      advancedQuery:{
        statusid:'0'
      },
    },

    allPerson: {
      dataList:[],
      total:0
    },
    //查看的人员信息
    baseInfo: {},
    education: [],
    honor:[],
    insurance: [],
    practice: [],
    socialFund: [],
    title: [],
    agreementInfo:[],
    CredentialsInfo:[]
  },
  getters: {
    personInfo:state=>{
      return state.baseInfo
    },
    agreementinfo: state => {
      return {
        dataList: state.agreementInfo,
        total: state.agreementInfo.length
      }
    },
    credentialsinfo: state => {
      return {
        dataList: state.CredentialsInfo,
        total: state.CredentialsInfo.length
      }
    },
    education: state => {
      return {
        dataList: state.education,
        total: state.education.length
      }
    },
    honor: state => {
      return {
        dataList: state.honor,
        total: state.honor.length
      }
    },
    insurance: state => {
      return {
        dataList: state.insurance,
        total: state.insurance.length
      }
    },
    practice: state => {
      return {
        dataList: state.practice,
        total: state.practice.length
      }
    },
    social: state => {
      return {
        dataList: state.socialFund.filter(item => {
          if (item.types == '0') {
            return item
          }
        }),
        total: state.socialFund.filter(item => {
          if (item.types == '0') {
            return item
          }
        }).length
      }
    },
    fund: state => {
      return {
        dataList: state.socialFund.filter(item => {
          if (item.types == '1') {
            return item
          }
        }),
        total: state.socialFund.filter(item => {
          if (item.types == '1') {
            return item
          }
        }).length
      }
    },
    title: state => {
      return {
        dataList: state.title,
        total: state.title.length
      }
    },
  },
  mutations: {
    updateagreement(state, date) {
      state.agreementInfo = date
    },
    updatecredentials(state,data){
      state.CredentialsInfo=data
    },

    updatePersonId(state, date) {
      state.currentPersonId = date
    },
    updatePageShow(state,data){
      state.pageShow=data
    },
    updatePageInfo(state,data){
      state.pageShow.pageInfo=data
    },
    updateAdvancedQuery(state,data){
      state.pageShow.advancedQuery=data
    },
    updateAllPerson(state, data) {
      state.allPerson = data
    },
    updateBaseInfo(state, data) {
      state.baseInfo = data
    },
    updateEducation(state, data) {
      state.education = data
    },
    updateHonor(state, data) {
      state.honor = data
    },
    updateInsurance(state, data) {
      state.insurance = data
    },
    updatePractice(state, data) {
      state.practice = data
    },
    updateSocialFund(state, data) {
      state.socialFund = data
    },
    updateTitle(state, data) {
      state.title = data
    },

  },
  actions: {
    //获得启用中人员信息
    networkAddCredentials(context,formData){
      formData.personKeyid = context.state.currentPersonId
      addcredentials(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetcredentials')
        }
      });
    },
    //   context.dispatch('networkGetagreement')
    //context.dispatch('networkGetcredentials')
    networkDeleteCredentials(context,formData){
      deletescredentials(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetcredentials')
        }
      });
    },

    networkdeletesEducation(context,formData){
      deletesEducation(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetEducation')
        }
      });
    },
    networkdeletesHonor(context,formData){
      deletesHonor(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetHonor')
        }
      });
    },
    networkdeletesInsurance(context,formData){
      deletesInsurance(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetInsurance')
        }
      });
    },
    networkdeletesPractice(context,formData){
      deletesPractice(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetPractice')
        }
      });
    },
    networkdeletesTitle(context,formData){
      deletesTitle(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetTitle')
        }
      });
    },

    networkAddagreement(context,formData){
      formData.personKeyid = context.state.currentPersonId
      addagreement(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetagreement')
        }
      });
    },
    networkDeleteagreement(context,formData){
      deletesagreement(formData).then(item=>{
        if (item.code === 200) {
          context.dispatch('networkGetagreement')
        }
      });
    },
    networkGetAllPerson(context,pageShow) {
      let filter=context.state.pageShow
      if (!_this.$myfunction.isEmpty(pageShow)) {
        filter=pageShow
      }
      getAllPerson(filter).then(item => {
        let ref={
          dataList:item.data.content,
          total:item.data.totalElements
        }
        // console.log(ref)
        context.commit('updateAllPerson', ref)
      }).catch(() => {
        console.log('HRManager:获得人员出错')
      })
    },
    //新增人员
    networkAddPerson(context, formData) {
      addPerson(formData).then((item) => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetAllPerson',{pageInfo:{page:1,limit:30},advancedQuery:{statusid:'0'}})
        } else {
          _this.$message.error(item.message)
        }
      }).catch(item => {
        console.log('HRManager:添加人员出错')
      })
    },
    //调整岗位
    networkChangePerson(context, formData) {
      changeposPerson(formData).then((item) => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetAllPerson',{pageInfo:{page:1,limit:30},advancedQuery:{statusid:'0'}})
        } else {
          _this.$message.error(item.message)
        }
      }).catch(item => {
        console.log('HRManager:修改人员出错')
      })
    },
    //修改状态
    networkUpdateStatus(context, data) {
      upPerson(data).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log("HRManager:状态修改失败")
      }).then(() => {
        context.commit('updateAdvancedQuery',{statusid:data.statusid});
        context.dispatch('networkGetAllPerson',{pageInfo:{page:1,limit:30},advancedQuery:{statusid:data.statusid}})
      })
    },
    networkUpdateBasicInfo(context, formDate) {
      upPerson(formDate).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetBaseInfo')
          context.dispatch('networkGetAllPerson')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:修改人员基本信息异常')
      })
    },
    //查询全部人员信息
    getPersonInfo(context) {
      context.dispatch('networkGetBaseInfo')
      context.dispatch('networkGetEducation')
      context.dispatch('networkGetHonor')
      context.dispatch('networkGetInsurance')
      context.dispatch('networkGetPractice')
      context.dispatch('networkGetSocialFund')
      context.dispatch('networkGetTitle')
      context.dispatch('networkGetagreement')
      context.dispatch('networkGetcredentials')
    },
    networkGetagreement(context){
      findagreementByPersonId({personKeyid: context.state.currentPersonId}).then(item => {
        context.commit('updateagreement', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员学历信息失败')
      })
    },

    networkGetcredentials(context){
      findcredentialsByPersonId({personKeyid: context.state.currentPersonId}).then(item => {
        context.commit('updatecredentials', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员学历信息失败')
      })
    },

    //根据人员id查询用户
    networkGetBaseInfo(context) {
      getPersonByKeyid({keyid: context.state.currentPersonId}).then(item => {
        context.commit('updateBaseInfo', item.data[0])
      }).catch(() => {
        console.log('HRManager:获取人员基本信息失败')
      })
    },
    networkGetEducation(context) {
      findEducationByPersonId({personid: context.state.currentPersonId}).then(item => {
        context.commit('updateEducation', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员学历信息失败')
      })
    },
    networkGetHonor(context) {
      findHonorByPersonId({personid: context.state.currentPersonId}).then(item => {
        context.commit('updateHonor', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员荣誉信息失败')
      })
    },
    networkGetInsurance(context) {
      findInsuranceByPersonId({personid: context.state.currentPersonId}).then(item => {
        context.commit('updateInsurance', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员保险信息失败')
      })
    },
    networkGetPractice(context) {
      findPracticeByPersonId({personid: context.state.currentPersonId}).then(item => {
        context.commit('updatePractice', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员执业信息失败')
      })
    },
    networkGetSocialFund(context) {
      findSocialfundByPersonId({personid: context.state.currentPersonId}).then(item => {
        context.commit('updateSocialFund', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员社保公积金信息失败')
      })
    },
    networkGetTitle(context) {
      findTitleByPersonId({personid: context.state.currentPersonId}).then(item => {
        context.commit('updateTitle', item.data)
      }).catch(() => {
        console.log('HRManager:获取人员职称信息失败')
      })
    },
    //添加学历
    networkAddEducation(context, formData) {
      formData.personid = context.state.currentPersonId
      addEducation(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetEducation')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加学历异常')
      })
    },
    //添加荣誉
    networkAddHonor(context, formData) {
      formData.personid = context.state.currentPersonId
      addHonor(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetHonor')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加荣誉异常')
      })
    },
    //添加保险
    networkAddInsurance(context, formData) {
      formData.personid = context.state.currentPersonId
      addInsurance(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetInsurance')
          getPersonByKeyid({keyid:context.state.currentPersonId}).then(item=>{
            let ref=item.data[0]
            if (!ref.isBuyOtherInsurance) {
              ref.isBuyOtherInsurance=true
              upPerson(ref)
            }
          })
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加保险异常')
      })
    },
    //添加执业
    networkAddPractice(context, formData) {
      formData.personid = context.state.currentPersonId
      addPractice(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetPractice')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加执业异常')
      })
    },
    //添加社保公积金
    networkAddSocialFund(context, formData) {
      formData.personid = context.state.currentPersonId
      addSocialfund(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetSocialFund')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:导入社保公积金异常')
      })
    },
    //添加职称
    networkAddTitle(context, formData) {
      formData.personid = context.state.currentPersonId
      addTitle(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetTitle')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:导入社保公积金异常')
      })
    },
    //修改学历
    networkUpdateEducation(context, formData) {
      upEducation(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetEducation')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加学历异常')
      })
    },
    //修改荣誉
    networkUpdateHonor(context, formData) {
      upHonor(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetHonor')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加荣誉异常')
      })
    },
    //修改保险
    networkUpdateInsurance(context, formData) {
      upInsurance(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetInsurance')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加保险异常')
      })
    },
    //修改执业
    networkUpdatePractice(context, formData) {
      upPractice(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetPractice')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:添加执业异常')
      })
    },
    //修改职称
    networkUpdateTitle(context, formData) {
      upTitle(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetTitle')
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('HRManager:导入社保公积金异常')
      })
    },
  }
}
export default module;
