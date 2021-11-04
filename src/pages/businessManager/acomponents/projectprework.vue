<template>
  <div class="dialog_diy">
    <el-dialog :title="project_title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false" center>
    <el-tabs v-model="activeName" tab-position="left" style="height:80%;">
          <el-tab-pane label="组建人员" name="1" v-if="btnListIndexOf('ZU3JIAN4REN2YUAN')"><workgroup :basedatagp="baseproject" v-if="activeName==='1'"></workgroup></el-tab-pane>
          <el-tab-pane label="进度计划" name="2" v-if="btnListIndexOf('JIN4DU4JI4HUA')"><workplan :basedatapl="baseproject" v-if="activeName==='2'"></workplan></el-tab-pane>
          <el-tab-pane label="产值填报" name="3" v-if="btnListIndexOf('CHAN3ZHI2TIAN2BAO')"><workoutvalue :basedataov="baseproject" v-if="activeName==='3'"></workoutvalue></el-tab-pane>
          <el-tab-pane label="工作内容" name="4" v-if="btnListIndexOf('GONG1ZUO4NEI4RONG')"><workcontent :basedatact="baseproject" v-if="activeName==='4'"></workcontent></el-tab-pane>
    </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' //__是需要手动引入的文件
  import workgroup from "./workgroupDialog.vue";
  import workoutvalue from "./workoutvalueDialog.vue";
  import workplan from "./workplanDialog.vue";
  import workcontent from "./workcontenxDialog.vue"
  export default {
     name:"output_excel",
     components:{
       workgroup,workoutvalue,workplan,workcontent
     },
     props: {
        title: { type: String },
        width: { type: String },
        labelWidth: {
          type: String,
          default: "130px"
        }
      },
    //数据节点
    data() {
      return {
        baseproject:{},
        dialogVisible:false,
        project_title:'',
        activeName:'1'
      }
    },
    //自定义函数节点
    methods: {
      openDialog(data,flag){
        this.baseproject=data;
        this.project_title=data.projectName;
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
      },
      submitFormData(){
          this.dialogClose()
      },
      resetForm(){
      }
    }
  }
</script>
<style lang='less' scoped>
.dialog_diy{
  height:450px;
  ::v-deep .el-dialog__wrapper { // eslint-disable-line
    .el-dialog {
        .el-dialog__body{
          padding: 0px;
          background: #eceaea7e;
          min-height:500px;
        }
        .el-dialog__header{
          padding: 10px 0px;
          background: #eceaea7e;
          border-bottom: 1px solid #f3faff;
        }
        .el-dialog__headerbtn {
          top: 2px;
          right: 10px;
        }
        .el-dialog__headerbtn .el-dialog__close {
          color: #fff;
          height: 10px;
          width: 16px;
        }
         .el-dialog__headerbtn .el-dialog__close:hover {
          color: rgb(63, 60, 250);
        }
    }
  }
}
</style>
