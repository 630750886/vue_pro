<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="180px">
<!--        <el-form-item label="澄清或修改的文件">-->
<!--          <upload-button ref="uploadbtn" v-model="form.objectionchangeFile"></upload-button>-->
<!--        </el-form-item>-->
        <template v-if="form.objectionDoWayName==='投标人或潜在投标人提出'">
          <el-form-item label="提出异议的文件">
            <upload-button v-model="form.objectionFile"></upload-button>
          </el-form-item>
          <el-form-item label="异议处理结果">
            <rea-select v-model="form.objectionDesc"
                        prop="name"
                        label="name"
                        :data="[{id:1,name:'异议驳回'},{id:2,name:'异议接受'}]"></rea-select>
          </el-form-item>
          <el-form-item label="异议处理相关资料">
            <upload-button v-model="form.noObjectionAttachFile"></upload-button>
          </el-form-item>
        </template>
        <el-form-item label="发布公告的方式公布澄清或修改">
          <upload-button v-model="form.objectionPublicityFile" message="公告截图"></upload-button>
        </el-form-item>
        <el-form-item label="书面通知的方式公布澄清或修改">
          <upload-button v-model="form.objectionNoteFile" message="相关通知及回复"></upload-button>
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
      data: {},
    },
    watch: {},
    //数据节点
    data() {
      return {

        dialogVisible: false,
        num: 1,
        form: {
          // objectionchangeFile: '',
          objectionFile: '',
          objectionDesc: '',
          noObjectionAttachFile: '',
          objectionPublicityFile: '',
          objectionNoteFile: '',
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
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
