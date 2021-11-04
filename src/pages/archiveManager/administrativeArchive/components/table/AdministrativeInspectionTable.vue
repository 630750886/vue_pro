<template>
  <div>
    <div class="table">
      <el-table
          :data="dataList.content"
          align="center"
          height="7.5rem"
          highlight-current-row
          :header-cell-style="{ fontSize: '14px' }"
          border
      >
        <el-table-column
            prop="licenceCheckName"
            label="行政检查名称"
            fixed="left"
            width="300px"
            show-overflow-tooltip
            align="center"
        ></el-table-column>
        <el-table-column prop="licenceCheckUnit" show-overflow-tooltip label="检查单位" align="center">
        </el-table-column>
        <el-table-column
            prop="begindateTime"
            label="检查开始日期"
            width="100px"
            show-overflow-tooltip
            align="center"
        ></el-table-column>
        <el-table-column
            prop="enddateTime"
            width="100px"
            label="检查结束日期"
            show-overflow-tooltip
            align="center"
        ></el-table-column>

        <el-table-column
            prop="licenceCheckResult"
            label="检查结果"
            align="center"
            width="100px"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.licenceCheckResult">已通过</p>
            <p v-else>未通过</p>
          </template>
        </el-table-column>
        <el-table-column
            prop="licenceCheckChangeREsult"
            label="整改结果"
            width="100px"
            align="center"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.licenceCheckChangeREsult">已通过</p>
            <p v-else>未通过</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="$refs.notesRef.openDialog(scope.row)">档案备注</el-button>
            <el-button type="primary" plain size="mini" @click="$refs.modifyRef.openDialog(scope.row)">修改档案</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    ></pagination>
    <div class="dialog">
      <downDialog title="下载档案类型：" ref="downRef" @getFormData="getFormData"></downDialog>
      <fileNotesDialog ref="notesRef" @getFormData="getFormData"></fileNotesDialog>
      <ModifyFile ref="modifyRef" @getFormData="getFormModifyData"></ModifyFile>
    </div>
  </div>
</template>

<script>
  import downDialog from "../dialog/downDialog.vue";
  import fileNotesDialog from "../dialog/fileNotesDialogInspection.vue";
  import ModifyFile from "../dialog/ModifyFileInspection.vue";
  export default {//组件里面data必须写函数，而且要有返回值return
    data() {
      return {
      }
    },
    props:{
      dataList: {
        type: Object,
        default: () => {
          return {};
        }
      },
      pageShow:{
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods: {
      getFormData(formData){
        console.log(formData)
      },
      getFormModifyData(data){
        console.log(data)
      },
      //分页
      handleCurrentChange(val) {
        this.pageShow.pageInfo.page = val;
        this.$emit("inspectPageInfoChange", this.pageShow);
      },
      handleSizeChange(val) {
        this.pageShow.pageInfo.limit = val;
        this.$emit("inspectPageInfoChange", this.pageShow);
      },
    },
    components: {
      downDialog,
      fileNotesDialog,
      ModifyFile,
    },
    //生命周期
    created() {
    },
    computed: {},

  }
</script>

<style lang="less" scoped>

</style>
