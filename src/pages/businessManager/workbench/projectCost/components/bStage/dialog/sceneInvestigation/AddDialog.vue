<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">

        <el-form-item label="勘验时间">
          <rea-datepicker v-model="form.tripdateTime"></rea-datepicker>
        </el-form-item>

        <rea-divider title="踏勘人"></rea-divider>
        <com-add-person v-model="form.workPersonName"></com-add-person>
        <rea-divider></rea-divider>

        <el-form-item label="相关资料">
          <upload-button v-model="form.tripDataFile"
                         module-type="xm"
                         file-name="勘验相关资料"
                         :base-id="$store.state.workbench.currentItem"></upload-button>
        </el-form-item>
        <el-form-item label="图片或影像资料">
          <upload-button v-model="form.tripImageFile"
                         module-type="xm"
                         file-name="勘验图片或影像资料"
                         :base-id="$store.state.workbench.currentItem"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
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
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      },
      data:{},
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        num:1,
        form:{
          tripdateTime:'',
          workPersonName:[],
          tripDataFile:'',
          tripImageFile:'',
        },
        formRules:{},

      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          let ref=this.$myfunction.copyData(data)
          if (ref.workPersonName.indexOf(',')!==-1) {
            ref.workPersonName=ref.workPersonName.split(',')
          }else {
            let arr=[]
            arr.push(ref.workPersonName)
            ref.workPersonName=arr
          }
          this.form=this.$myfunction.copyData(ref)
        }

        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitForm() {
        this.form.workPersonName=this.form.workPersonName.join(',')
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
