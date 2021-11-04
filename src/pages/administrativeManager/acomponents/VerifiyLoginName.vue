<template>
  <div>
    <el-dialog title="用户验证" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules">
        <el-form-item  label="用户名" prop="loginName">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item :model="form" label="密码" prop="passWord">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
      </el-form>
      <dialog-button @okBtn="submitFormData" :cancelBtn="{show:false}" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from './DialogButton.vue'
  export default {
    components: {
      DialogButton
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        form:{
          loginName:'',
          passWord: '',
        },
        formRules:{
          loginName:[
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            }
          ],
          passWord: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ],
        },
        dialogVisible:false
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      dialogClose(){
        this.$refs.formRef.resetFelids()
      },
      submitFormData(){
        this.$emit('getFormData',this.form)
      },
      dialogClose(){

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
