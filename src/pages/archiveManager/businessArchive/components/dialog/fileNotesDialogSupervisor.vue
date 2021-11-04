<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" width="30%"
               @close="dialogClose" :close-on-click-modal="false">
      <el-row>
        <el-col :span="3"><span>档案备注：</span> </el-col>
        <el-col :span="21"><el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" maxlength="500" size="mini ">

        </el-input></el-col>
      </el-row>
      <el-divider>档案修改记录</el-divider>
      <el-row>
        <el-col :span="4"><span>1次修改日期：</span> </el-col>
        <el-col :span="20">2021-10-12</el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="3"><span>档案备注：</span> </el-col>
        <el-col :span="21"><el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" maxlength="500" size="mini ">

        </el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitForm" ok-btn="保存" @cancelBtn="dialogClose()"></dialog-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import DialogButton from "../button/DialogButton.vue";
  export default {//组件里面data必须写函数，而且要有返回值return
    props: {
      title: '',
      width: '',
    },
    data() {
      return {
        dialogVisible:false,
        checkList:[],
        textarea:''
      }
    },
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.checkList))
        this.dialogClose()
      },
    },
    components: {
      DialogButton,
    },
    //生命周期
    created() {
    },
    computed: {},

  }
</script>

<style lang="less" scoped>

</style>
