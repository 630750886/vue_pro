import Vue from 'vue'
import {getItem,getItemByKeyId,addItem,upItem,delItem} from '../../../../api/webapi-business.js'
const _this = new Vue()

let model = {
  namespaced: true,
  state: {
    activeName:'1',
    advancedQuery:{
      contractVocationalTypeKeyId: '402880fa74c3492d0174d45ebe360015',
    },
    items:{
      dataList:[],
      total:0
    },
    item:{}
  },
  getters: {

  },
  mutations: {
    updateActiveName(state,data){
      state.activeName=data
    },
    updateAdvancedQuery(state,data){
      state.advancedQuery=data
    },
    updateItems(state,data){
      state.items=data
    },
    updateItem(state,data){
      state.Item=data
    },
  },
  actions: {
    networkGetItems(context,pageShow){
      getItem(pageShow).then(item=>{
        let ref={
          dataList: item.data.content,
          total:item.data.totalElements
        }
        context.commit('updateItems',ref)
      })
    },
    networkGetItemByKeyId(context,keyid){
      return getItemByKeyId({keyid:keyid}).then(item=>{
        context.commit('updateItem',item.data[0])
        return item.data[0]
      })
    },
    networkAddItem(context,formData){
      formData.projectOrgCode=context.rootState.currentUser.orgId
      formData.projectOrgName=context.rootState.currentUser.orgName
      addItem(formData).then(item=>{
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetItems',{
            pageInfo:{page:1,limit:30},
            advancedQuery:{
              contractVocationalTypeKeyId:formData.contractVocationalTypeKeyId,
              projectStatusKeyId:formData.projectStatusKeyId
            }
          })
        }else {
          _this.$message.error(item.message)
        }
      })
    },
    networkUpItem(context,formData){
      return upItem(formData).then(item=>{
        if (item.code === 200) {
          _this.$message.success(item.message)
          context.dispatch('networkGetItems',{
            pageInfo:{page:1,limit:30},
            advancedQuery:{
              contractVocationalTypeKeyId:formData.contractVocationalTypeKeyId,
              projectStatusKeyId:formData.projectStatusKeyId
            }
          })
          context.commit('updateActiveName',(parseInt(formData.projectStatusKeyId)+1)+'')
          return item
        }else {
          _this.$message.error(item.message)
        }
      })
    }
  }
}
export default model
