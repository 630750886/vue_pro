import Vue from 'vue'

import {
  getApplyInfo,
  addBecomeApply,
  addQuitApply,
  addRecruitApply,
  addSubsidyApply,
  addTransferApply,
  getApplyRef,
    upApply
} from '../../../api/webapi-hr.js'

const _this = new Vue()

let model = {
  namespaced: true,
  state: {
    pageShow: {},
    recruitInfo: {
      dataList: [],
      total: 0
    },
    applyRef: {}

  },
  getters: {},
  mutations: {
    updatePageShow(state,data){
      state.pageShow=data
    },
    updateRecruitInfo(state, data) {
      state.recruitInfo = data

    },
    updateApplyRef(state, data) {
      state.applyRef = data
    },
  },
  actions: {
    networkGetDataList(context, pageShow) {
      context.commit('updatePageShow',pageShow)
      getApplyInfo(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        }
        context.commit('updateRecruitInfo', ref)
      }).catch(() => {
        console.log('recruitDispose:获取台账异常')
      })
    },
    networkAddRecruit(context, formData) {
      return addRecruitApply(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetDataList',  context.state.pageShow)
          return item.data
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('recruitDispose:添加招聘申请异常')
      })
    },
    networkAddBecome(context, formData) {
     return addBecomeApply(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetDataList', context.state.pageShow)
          return item.data
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('recruitDispose:添加员工转正申请异常')
      })
    },
    networkAddQuit(context, formData) {
     return addQuitApply(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetDataList', context.state.pageShow)
          return item.data
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('recruitDispose:添加员工离职申请异常')
      })
    },
    networkAddTransfer(context, formData) {
      return addTransferApply(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetDataList', context.state.pageShow)
          return item.data
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('recruitDispose:添加员工转岗晋级申请异常')
      })
    },
    networkAddSubsidy(context, formData) {
      return addSubsidyApply(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetDataList', context.state.pageShow)
          return item.data
        } else {
          _this.$message.error(item.message)
        }
      }).catch(() => {
        console.log('recruitDispose:添加补助申请异常')
      })
    },
   networkGetApplyList(context, formData) {
      getApplyRef(formData).then(item => {
        context.commit('updateApplyRef', item.data[0])
      })
    },
    networkUpData(context,formData){
      return upApply(formData).then(item=>{
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetDataList', context.state.pageShow)
          return item.data
        }
      })
    }
  }
}
export default model
