<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.618rem">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="模块类型名称" prop="typeName">
              <el-input v-model="form.typeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <template v-if="show">
              <el-input v-model="form.code" placeholder="识别编号"></el-input>
            </template>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button reset-btn="false"
       :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {
    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      },
    },
    watch: {
    },
    //数据节点
    data() {
      return {
        show:true,
        dialogVisible:false,
        form: {
          code:'',
          typeName:''
        },
        formRules: {
          typeName: [
            {
              required: true,
              trigger: 'blur'
            }
          ],
          code: [
            {
              required: true,
              trigger: 'blur'
            }
          ],
        }
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitFormData: function () {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      dialogClose() {
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
        this.form.code=''
      },
      openDialog(data,isCode){
        if (isCode) {
          this.form.code='TYPE-'
        }
        this.show=isCode
        if (!this.$myfunction.isEmpty(data)){
          this.form=this.$myfunction.copyData(data)
          if (data.code !== '') {
            this.form.code=data.code
          }
        }
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
