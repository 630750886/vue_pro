import Vue from 'vue'
import {
  getAgency,
  getTradingPlatform,
  getWebsite,
  addAgency,
  addTradingPlatform,
  addWebsite,
  upAgency,
  upTradingPlatform,
  upWebsite, delAgency,
  delTradingPlatform,
  delWebsite
} from '../../../../api/webapi-bidPlatform.js'

const _this = new Vue()

let model = {
  namespaced: true,
  state: {
    activeName:'',
    //查询对象
    advancedQuery: {},
    platforms: {
      dataList: [],
      total: 0
    },
    agencies: {
      dataList: [],
      total: 0
    },
    websites: {
      dataList: [],
      total: 0
    }
  },
  getters: {},
  mutations: {
    updateActiveName(state,data){
      state.activeName=data
    },
    updateAdvancedQuery(state,data){
      state.advancedQuery=data
    },
    updatePlatforms(state, data) {
      state.platforms = data
    },
    updateAgencies(state, data) {
      state.agencies = data
    },
    updateWebsites(state, data) {
      state.websites = data
    }
  },
  actions: {
    /**
     * 交易平台
     * @param context
     */
    networkGetPlatforms(context) {
      getTradingPlatform({}).then(item=>{
        let ref={
          dataList:item.data,
          total:item.data.length
        }
        context.commit('updatePlatforms',ref)
      })
    },
    networkAddPlatforms(context, formData) {
      addTradingPlatform(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetPlatforms')
        }
      })
    },
    networkDelPlatforms(context, formData) {
      delTradingPlatform(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetPlatforms')
        }
      })
    },
    networkUpPlatforms(context, formData) {
      upTradingPlatform(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetPlatforms')
        }
      })
    },
    /**
     * 备案机构
     */
    networkGetAgencies(context,filter) {
      getAgency(filter).then(item=>{
        let ref={
          dataList:item.data,
          total:item.data.length
        }
        context.commit('updateAgencies',ref)
      })
    },
    networkAddAgency(context, formData) {
      addAgency(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetAgencies',{orgTypeKeyid:formData.orgTypeKeyid})
        }
      })
    },
    networkDelAgency(context, formData) {
      delAgency(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetAgencies',{orgTypeKeyid:formData.orgTypeKeyid})
        }
      })
    },
    networkUpAgency(context, formData) {
      upAgency(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetAgencies')
        }
      })
    },
    /**
     * 网站管理
     */
    networkGetWebsites(context) {
      getWebsite({}).then(item=>{
        let ref={
          dataList:item.data,
          total:item.data.length
        }
        context.commit('updateWebsites',ref)
      })
    },
    networkAddWebsite(context, formData) {
      addWebsite(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetWebsites')
        }
      })
    },
    networkDelWebsite(context, formData) {
      delWebsite(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetWebsites')
        }
      })
    },
    networkUpWebsite(context, formData) {
      upWebsite(formData).then(item=>{
        if (item.code===200){
          _this.$message.success(item.message)
          context.dispatch('networkGetWebsites')
        }
      })
    },
  }
}
export default model
