<template>
  <el-dialog :visible.sync="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">

    <el-form :model="form" ref="formRef" :rules="formRules" label-width="220px">

      <span style="margin-left: 50px">填写保证金缴纳信息：</span>
      <el-form-item label="保证金收款账户名" prop="bankAccout">
        <el-input v-model="form.bankAccout"></el-input>
      </el-form-item>
      <el-form-item label="保证金收款账户开户行" prop="bank">
        <el-input v-model="form.bank"></el-input>
      </el-form-item>
      <el-form-item label="保证金收款账户号" prop="bankAccoutId">
        <el-input v-model="form.bankAccoutId"></el-input>
      </el-form-item>
      <el-form-item label="缴纳金额(元)" prop="collMoney">
        <el-input v-model="form.collMoney"></el-input>
      </el-form-item>
      <!-- <el-form-item label="递交截至时间" prop="cutoffTime">
        <el-data-picker-template type="datetime" v-model="form.cutoffTime" value-type="yyyy/MM/DD HH:mm"
                                 format="yyyy/MM/DD HH:mm"></el-data-picker-template>
      </el-form-item>
      <el-form-item label="附言或用途" prop="remark">
        <el-textarea-template v-model="form.remark"></el-textarea-template>
      </el-form-item> -->
    </el-form>

    <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData"
                   @cancelBtn="dialogClose"></dialog-button>
  </el-dialog>
</template>

<script>

  import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue"
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue"

  export default {
    components: {
      ElDataPickerTemplate,
      ElTextareaTemplate
    },
    props: {
      title: {
        type: String,
        dealt: ''
      }
    },
    watch: {
      title(newValue) {
        this.title = newValue
      }
    },
    mounted() {
    },
    data: function () {

      return {
        //父窗口传递的弹窗标题
        title1: this.title,
        //弹窗显示控制
        dialogVisible: false,

        //缴纳类型
        paymentTypeOptions: [
          //风险（履约）保证金、投标保证金、其他往来款
          {
            id: 5,
            name: '风险（履约）保证金'
          },
          {
            id: 6,
            name: '投标保证金'
          },
          {
            id: 7,
            name: '其他往来款'
          },
        ],
        //合同编号集
        contractNumOptions: [],
        //上传按钮显示控制
        showUpload: false,
        //文件列表
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],

        fileList2: [],
        //系统表单对象
        form: {},
        //表单验证规则
        formRules: {},

      }
    },

    methods: {

      //文件上传相关
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      //设置弹窗显示
      openDialog(data) {
        this.form = data;
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

<style scoped>

</style>
