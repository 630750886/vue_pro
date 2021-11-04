<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="会商时间" prop="negotiationsdateTime">
         <rea-datepicker v-model="form.negotiationsdateTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="会商主题" prop="negotiationsTitle">
          <el-input v-model="form.negotiationsTitle"></el-input>
        </el-form-item>
        <rea-divider title="踏勘人"></rea-divider>
        <com-add-person v-model="form.negotiationsPersons"></com-add-person>
        <rea-divider></rea-divider>
        <el-form-item label="相关资料" prop="negotiationsDataFile">
          <upload-button v-model="form.negotiationsDataFile"
                         module-type="xm"
                         file-name="会商相关资料"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="图片或影像记录" prop="negotiationsImageVideoFile">
          <upload-button v-model="form.negotiationsImageVideoFile"
                         module-type="xm"
                         file-name="会商图片或影像记录"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
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
    },
    watch: {
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          negotiationsdateTime:'',
          negotiationsTitle:'',
          negotiationsPersons:[],
          negotiationsDataFile:'',
          negotiationsImageVideoFile:'',
        },
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          let ref = this.$myfunction.copyData(data)
          if (ref.negotiationsPersons.indexOf(',') !== -1) {
            ref.negotiationsPersons = ref.negotiationsPersons.split(',')
          } else {
            let arr = []
            arr.push(ref.negotiationsPersons)
            ref.negotiationsPersons = arr
          }
          this.form=ref
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.form.negotiationsPersons=this.form.negotiationsPersons.join(',')
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.form=this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
