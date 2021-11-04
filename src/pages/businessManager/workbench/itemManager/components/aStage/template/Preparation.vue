<template>
  <div class="content el-scrollbar">
    <el-tabs :active-name="activeName">
      <el-tab-pane label="登记委托联系人" name="1">
        <ContactPersonTable></ContactPersonTable>
      </el-tab-pane>
      <el-tab-pane label="收集资料" name="2">
        <com-document is-add-means code="TYPE-158"></com-document>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddContactsDialog from './component/Preparation/dialog/AddContactsDialog.vue'
  import AddMeansDialog from './component/Preparation/dialog/AddMeansDialog.vue'
  import HeadRightButton from '../button/HeadRightButton.vue'
  import ContactPersonTable from './component/Preparation/table/ContactPersonTable.vue'
  import MeansTable from './component/Preparation/table/MeansTable.vue'
   export default {
    components: {
      AddContactsDialog,
      AddMeansDialog,
      HeadRightButton,
      ContactPersonTable,
      MeansTable
    },
    props: {},
    watch: {},

    //数据节点
    data() {
      return {
        activeName:'1',
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
  .content{
    height: 630px;
    overflow-x: hidden;
    overflow-y: auto;
    .column{
      margin-top: 5px;
      .btn{
        height: 30px;
        background-color: white;
        .el-button{
          float: right;
          margin-right: 10px;
        }
      }
      .plan{
        flex: 2;
      }
    }
  }
</style>
