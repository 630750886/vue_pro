<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="总咨询师">
              <QueryInput></QueryInput>
            </el-form-item>
            <el-form-item label="造价咨询负责人">
              <QueryInput></QueryInput>
            </el-form-item>
						<el-form-item label="工程监理负责人">
						  <QueryInput></QueryInput>
						</el-form-item>
          </el-col>
          <el-col :span="12">
						<el-form-item label="工程咨询负责人">
						  <QueryInput></QueryInput>
						</el-form-item>
            <el-form-item label="招标代理负责人">
              <QueryInput></QueryInput>
            </el-form-item>
            <el-form-item label="项目管理负责人">
              <QueryInput></QueryInput>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <span slot="label"><i class="el-icon-circle-plus-outline" @click="num2++"></i>其他人员</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <template v-for="i in num2">
							<el-row>
								<el-col :span="12">
								  <el-form-item :label="'其他人员'+i">
								    <QueryInput></QueryInput>
								  </el-form-item>
								</el-col>
								<el-col :span="12">
								  <el-form-item :label="'工作备注'+i">
								    <QueryInput></QueryInput>
								  </el-form-item>
								</el-col>
							</el-row>

            </template>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" okBtn="提交" :cancelBtn="{show:false}"
                     @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件


  export default {
    components: {

    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
      updateData: ''
    },
    watch: {
      updateData(newValue) {
        this.form = this.$myfunction.copyData(newValue)
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        num: 1,
        num2: 1,
        form: {
          name: '',
          phone: '',
          department: '',
          duty: '',
        },
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(key, value) {
        this.$set(this.form, key, value)
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
