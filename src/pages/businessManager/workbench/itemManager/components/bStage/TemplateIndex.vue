<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 600px;"><!---->
      <el-tab-pane v-for="item in serviceOptions" :label="item.workItemName" :name="item.keyid"  :key="item.keyid">
        <other-services v-if="activeName===item.keyid" :data="item"></other-services>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import OtherServices from './OtherServices.vue'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getServicePlan} from '../../../../../../api/workbench/webapi-itemManager.js'
  export default {
    components: {
      OtherServices,
    },
    props: {},
    watch: {
      activeName(newValue){
        this.session.setItem('activeName_bStage',newValue)
      }
    },
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        activeName: '',
        serviceOptions:[]
      }
    },
    //生命周期函数节点
    created() {
      /*this.getSelectByCode('051').then(item=>{
        //this.serviceOptions=item.data
        this.activeName=item.data[0].keyid
      })*/
      this.networkItemService()

    },
    //自定义函数节点
    methods: {
      ...mapActions('loadType', {
        networkGetSelectByCode:'networkGetSelectByCode'
      }),
      networkItemService(){//402880fa757204820175723927cc0000
        if (this.currentItem.keyid !== '') {
          this.activeName =this.session.getItem('activeName_bStage')
          getServicePlan({projectKeyid:this.currentItem.keyid}).then(item=>{
            this.serviceOptions=item.data
            if (this.$myfunction.isEmpty(this.session.getItem('activeName_bStage'))) {
              this.activeName= this.serviceOptions[0].keyid
            }
          })
        }else {
          this.serviceOptions=[]
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
