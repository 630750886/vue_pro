<template>
  <div class="main">
    <div class="button">
      <head-right-button title="变更人员" @click="changePerson"></head-right-button>
    </div>
    <div class="table">
      <el-table
              ref="tableRef"
              :data="dataList"
              style="width: 100%"
              align="center"
              highlight-current-row
            
              :header-cell-style="{fontSize:'10px'}">
        <el-table-column prop="time" label="变更时间" align="center"></el-table-column>
        <el-table-column prop="before" label="变更前" align="center"></el-table-column>
        <el-table-column prop="after" label="变更后" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <change-person-dialog title="变更人员" ref="changeRef" width="30%"></change-person-dialog>
    </div>
  </div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import ChangePersonDialog from "../dialog/ChangePersonDialog.vue"

  export default {
    components: {
      HeadRightButton,
      ChangePersonDialog,
    },
    props: {
      data: [],
    },
    watch: {},
    //数据节点
    mounted(){
      //this.dataList = this.data;
    },
    data() {
      return {
        form: {},
        formRules: {},
        dataList: [{time: '2020/1/1', before: '无', after: '张三', status: '已通过'},],
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      submitForm() {

      },
      changePerson() {
        this.$refs.changeRef.openDialog();
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
