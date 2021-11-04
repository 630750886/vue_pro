<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="acttable">
      <activity-table @updataActivity="updataActivity" :dataList="dataList" :pageShow="pageShow" @pageInfoChange="getPageInfo"></activity-table>
    </div>
    <div class="dialog">
      <add-activity-dialog ref="addRef" @getFormData="getFormData"></add-activity-dialog>
      <query-activity-dialog ref="queryRef" @getFormData="mqueryRef"></query-activity-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import ActivityTable from './table/ActivityTable.vue'
  import AddActivityDialog from './dialog/AddActivityDialog.vue'
  import QueryActivityDialog from './dialog/QueryActivityDialog.vue'
  import * as activity from "@/api/administration/ActivityInfo.js"
  import {
    getContractDetailsCard,
    addContractDetailsCard
  } from '../../../../api/webapi-contract.js'
  export default {
    inject: ["reload"],
    components: {
      HeadButton,
      ActivityTable,
      AddActivityDialog,
      QueryActivityDialog
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName: '1',
        dataList: {},
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
          }
        },
      }
    },
    //生命周期函数节点
    created() {
      this.getActivityData(this.pageShow)
    },
    //自定义函数节点
    methods: {
      updataActivity(){
        this.getActivityData(this.pageShow)
      },
      getPageInfo(data){
        this.getActivityData(data)
      },
      getActivityData(datas){
        activity.advancedquery_object(datas).then(item=>{
          if (item.code === 200) {
            //this.$message.success("查询完成!");
            console.log(item);
            this.dataList=item.data;
          }
        });
      },
      mqueryRef(data) {
        console.log(data);
        this.pageShow.advancedQuery=data
        this.getActivityData(this.pageShow)
      },
      headButtonClick(btn) {
        switch (btn) {
          case 1:
            this.$refs.addRef.openDialog()
            break
          case 2:
            this.$refs.queryRef.openDialog()
            break
          case 9:
          this.reload();
          break;
        }
      },
      getFormData(formData) {
        console.log(formData);
        activity.adds_object(formData).then(item => {
          if (item.code === 200) {
            this.$message.success("增加成功!")
            this.getActivityData(this.pageShow)
          }
        });
      }
    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    height: 35px;
    line-height: 36px;
    padding: 0px 20px;
  }
  .acttable{
    margin-top: 10px;
  }
</style>
