<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="45px">
        <el-form-item label="键" prop="key">
          <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="keyValue">
          <el-input v-model="form.keyValue"></el-input>
        </el-form-item>
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
          key:'urladdress',
          keyValue:''
        },
        object:{},
        formRules: {
          key: [
            {
              required: true,
              message:'必填',
              trigger: 'blur'
            }
          ],
          keyValue: [
            {
              required: true,
              message:'必填',
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
          let arr=Object.keys(this.object)
          let index=arr.findIndex(item=>{
            return item===this.form.key
          })
          if (index !== -1) {
            this.object[this.form.key]=this.form.keyValue
            this.$emit('getFormData', this.$myfunction.copyData(this.object))
            this.dialogClose()
          }else {
            this.$message.warning("没有“"+this.form.keyValue+"”这个键！！！")
          }
        })
      },
      dialogClose() {
        this.dialogVisible=false
        this.form=this.$options.data().form
      },
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)){
          this.object=this.$myfunction.copyData(data)
        }
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
