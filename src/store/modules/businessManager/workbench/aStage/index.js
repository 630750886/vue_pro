import Vue from 'vue'
import {
  getCurrWorkGroup,
  getHistoryWorkGroup,
  addWorkGroup,
  upWorkGroup,
  delWorkGroup,
  getWorkPlanByKeyid,
  getWorkPlanByWhere,
  getWorkPlanDataList,
  addWorkPlan,
  addWorkPlanDataList,
  upWorkPlan,
  delWorkPlan,
  getContacts,
  addContact,
  delContact,
  upContact,
  getMaterials,
  addMaterial,
  delMaterial,
  upMaterial
} from '../../../../../api/webapi-itemWorkGroup.js'
import {upItem, getItemByKeyId} from '../../../../../api/webapi-business.js'
import {getBusById} from '../../../../../api/webapi-contract.js'

const _this = new Vue()

let model = {
  namespaced: true,
  state: {
    //当前项目
    currentItem: {},
    //当前工作组成员
    currWorkGroupInfo: [],
    //工作组成员变更记录
    historyWorkGroupInfo: [],
    //当前工作计划
    currWorkPlan: {},
    //历史计划
    historyWorkPlan: [],
    //计划明细
    workPlanList: [],
    //项目联系人
    itemContacts: [],
    //收集的资料
    materialList: []
  },
  getters: {},
  mutations: {
    updateCurrentItem(state, data) {
      state.currentItem = data
    },
    updateCurrWorkGroupInfo(state, data) {
      data.forEach(item=>{
        if (item.projectJobName==='项目经理') {

        }
      })
      state.currWorkGroupInfo = data
    },
    updateHistoryWorkGroupInfo(state, data) {
      state.historyWorkGroupInfo = data
    },
    updateCurrWorkPlan(state, data) {
      state.currWorkPlan = data
    },
    updateHistoryWorkPlan(state, data) {
      state.historyWorkPlan = data
    },
    updateWorkPlanList(state, data) {
      state.workPlanList = data
    },
    updateItemContacts(state, data) {
      state.itemContacts = data
    },
    updateMaterialList(state, data) {
      state.materialList = data
    }
  },
  actions: {
    networkGetItemByKeyId(context) {
      return getItemByKeyId({keyid: context.state.currentItem.keyid}).then(item => {
        context.commit('updateCurrentItem', item.data[0])
        return item.data[0]
      })
    },
    //新增工作组成员
    networkAddWorkGroup(context, formData) {
      let item = context.state.currentItem
      if (item.projectKeyid !== '') {
        let ref = {
          projectKeyid: item.keyid,
          projectCode: item.projectCode,
          projectName: item.projectName,
          currStatus: 'curr'
        }
        Object.assign(formData, ref)
        return addWorkGroup(formData).then(item => {
          if (item.code === 200) {
            _this.$message.success('添加成功')
            context.dispatch('networkCurrWorkGroupInfo')
            return item.data
          } else {
            _this.$message.error('添加失败')
          }
        })
      } else {
        console.log('没有项目')
      }
    },
    //变更工作组成员
    networkUpWorkGroup(context, formData) {
      formData.keyid = ''
      return addWorkGroup(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success('变更成功')
          context.dispatch('networkCurrWorkGroupInfo')
          return true
        } else {
          _this.$message.error('变更失败')
        }
      })
    },
    //获得当前工作组
    networkCurrWorkGroupInfo(context) {
      getCurrWorkGroup({projectKeyid: context.state.currentItem.keyid, currStatus: 'curr'}).then(item => {
        context.commit('updateCurrWorkGroupInfo', item.data)
      })
    },
    //获取人员变更历史信息
    networkHistoryWorkGroupInfo(context, data) {
      return getHistoryWorkGroup({keyid:data.pkeyid}).then(item => {
        context.commit('updateHistoryWorkGroupInfo', item.data)
        return item.data
      })
    },
    //获取当前工作计划
    networkGetCurrWorkPlan(context) {
      //projectPlanKeyid  项目当前生效计划id
      return getWorkPlanByKeyid({keyid: context.state.currentItem.projectPlanKeyid}).then(item => {
        context.commit('updateCurrWorkPlan', item.data[0])
        return item.data[0]
      })
    },
    //获取历史工作计划
    networkGetHistoryWorkPlan(context) {
      getWorkPlanByWhere({projectKeyid: context.state.currentItem.keyid}).then(item => {
        context.commit('updateHistoryWorkPlan', item.data)
      })
    },
    //获得计划明细
    networkGetWorkPlanList(context, keyid) {
      getWorkPlanDataList({workPlanKeyId: keyid}).then(item => {
        context.commit('updateWorkPlanList', item.data)
      })
    },
    //添加工作计划
    networkAddWorkPlan(context, formData) {
      let item = context.state.currentItem
      if (item.keyid !== '') {
        let ref = {
          projectKeyid: item.keyid,
          projectCode: item.projectCode,
          projectName: item.projectName,
        }
        Object.assign(formData, ref)
        return addWorkPlan(formData).then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message)
            context.dispatch('networkGetHistoryWorkPlan')
            //添加工作计划的服务类容
            formData.serviceContent.forEach(ref => {
              Object.assign(ref, {workPlanKeyId: item.data.keyid})
              addWorkPlanDataList(ref)
            })
            return item.data
          } else {
            _this.$message.error(item.message)
          }

        })
      } else {
        _this.$msgbox.alert('项目异常，请联系管理员')
      }

    },
    //审核通过，变更当前计划
    networkSuccessWorkPlan(context, newKeyid) {//projectPlanKeyid
      if (_this.$myfunction.isEmpty(context.state.currentItem.projectPlanKeyid)) {
        let ref = context.state.currentItem
        ref.projectPlanKeyid = newKeyid
        upItem(ref).then(item => {
          if (item.code === 200) {
            _this.$message.success('计划已生效')
            //设置生效计划
            getWorkPlanByKeyid({keyid: newKeyid}).then(item => {
              let ref = item.data[0]
              ref.workplanstatusname = '生效中'
              upWorkPlan(ref).then(item => {
                if (item.code === 200) {
                  context.dispatch('networkGetCurrWorkPlan')
                }
              })
            })
          }
        })
      }else {
        getWorkPlanByKeyid({keyid: context.state.currentItem.projectPlanKeyid}).then(item => {
          let ref = item.data[0]
          ref.workplanstatusname = '已废弃'
          //把当前生效的计划废弃
          upWorkPlan(ref).then(item => {
            if (item.code === 200) {
              //设置生效计划
              getWorkPlanByKeyid({keyid: newKeyid}).then(item => {
                let ref = item.data[0]
                ref.workplanstatusname = '生效中'
                upWorkPlan(ref).then(item => {
                  if (item.code === 200) {
                    let ref = context.state.currentItem
                    ref.projectPlanKeyid = newKeyid
                    upItem(ref).then(item => {
                      if (item.code === 200) {
                        _this.$message.error('计划已生效')
                        context.dispatch('networkGetItemByKeyId')
                      }
                    })
                  }
                })
              })
            }
          })
        })
      }
    },
    //审核不通过，更改计划状态
    networkErrorWorkPlan(context, keyid) {
      getWorkPlanByKeyid({keyid: keyid}).then(item => {
        let ref = item.data[0]
        ref.workplanstatusname = '审核不通过'
        upWorkPlan(ref).then(item => {
          if (item) {
            context.dispatch('networkGetHistoryWorkPlan')
          }
        })
      })
    },
    //获得项目联系人
    networkGetItemContacts(context) {
      getContacts({projectKeyid: context.state.currentItem.keyid}).then(item => {
        context.commit('updateItemContacts', item.data)
      })
    },
    //新增项目联系人
    networkAddContact(context, formData) {
      formData.projectKeyid = context.state.currentItem.keyid
      formData.projectCode = context.state.currentItem.projectCode
      formData.projectName = context.state.currentItem.projectName
      addContact(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetItemContacts')
        }
      })
    },
    networkUpContact(context, formData) {
      upContact(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetItemContacts')
        }
      })
    },
    networkDelContact(context, formData) {
      delContact(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetItemContacts')
        }
      })
    },
    /**
     * 收集的资料接口
     */
    networkGetMaterials(context,filterData){
      if (_this.$myfunction.isEmpty(filterData)) {
        filterData={}
      }
      Object.assign(filterData,{projectKeyid: context.state.currentItem.keyid})
      getMaterials(filterData).then(item=>{
        context.commit('updateMaterialList', item.data)
      })
    },
    networkAddMaterial(context,formData){
      formData.projectKeyid = context.state.currentItem.keyid
      formData.projectCode = context.state.currentItem.projectCode
      formData.projectName = context.state.currentItem.projectName
      addMaterial(formData).then(item=>{
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetMaterials',{projectTypeKeyId:formData.projectTypeKeyId})
        }
      })
    },
    networkUpMaterial(context,formData){
      upMaterial(formData).then(item=>{
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetMaterials',{projectTypeKeyId:formData.projectTypeKeyId})
        }
      })
    },
    networkDelMaterial(context,formData){
      delMaterial(formData).then(item=>{
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetMaterials',{projectTypeKeyId:formData.projectTypeKeyId})
        }
      })
    },
  }
}
export default model
