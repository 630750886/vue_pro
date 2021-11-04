<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" width="30%"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
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
    },
    data() {
      return {
        dialogVisible:false,
        form:{
          name:''
        }
      }
    },
    methods: {
      openDialog(data) {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
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
