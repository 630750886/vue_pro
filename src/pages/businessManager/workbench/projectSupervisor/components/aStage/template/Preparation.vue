<template>
  <div class="content el-scrollbar">
    <el-tabs v-model="activateName" tab-position="top">

      <el-tab-pane label="登记委托联系人" name="1">
        <contact-person-table></contact-person-table>
      </el-tab-pane>
      <!-- type ：  资料类型 -->
      <el-tab-pane label="收集资料" name="2">
        <com-document is-add-means code="TYPE-091"></com-document>
      </el-tab-pane>

      <el-tab-pane label="施工许可阶段文件" name="3">
        <com-document code="TYPE-098"></com-document>
      </el-tab-pane>

      <el-tab-pane label="监理文件" name="4">
        <com-document code="TYPE-099"></com-document>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ContactPersonTable from '../table/ContactPersonTable.vue'
  import {mapState} from 'vuex'
  import {initItemFiles} from '@/api/workbench/webapi-fileManager.js'
  export default {
    components: {
      ContactPersonTable,
    },
    props: {},
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        activateName: '1',
        code:['091','098','099']
      }
    },
    //生命周期函数节点
    created() {
      //this.initFile()
    },
    //自定义函数节点
    methods: {
      initFile() {
        this.code.forEach(item=>{
          initItemFiles({projectkeyid: this.currentItem.keyid, typeCode:'TYPE-'+item})
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .content {
    height: 630px;
    overflow-x: hidden;
    overflow-y: auto;

    .column {
      margin-top: 5px;

      .btn {
        height: 30px;
        background-color: white;

        .el-button {
          float: right;
          margin-right: 10px;
        }
      }

      .plan {
        flex: 2;
      }
    }
  }
</style>
