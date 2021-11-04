<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
               @close="dialogClose">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="会议类型">
          <rea-select v-model="form.meetingTypeKeyid"
                      :data="meetingType"
                      @getLabel="item=>{form.meetingTypeName=item}"></rea-select>
        </el-form-item>
        <el-form-item label="会议时间">
          <rea-datepicker v-model="form.meetingDateTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="会议纪要">
          <upload-button v-model="form.meetingFile"></upload-button>
        </el-form-item>
        <el-form-item label="会议图片或影像记录">
          <upload-button v-model="form.meetingVideoImage"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapActions} from 'vuex'

  export default {
    components: {},
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
        form: {
          meetingTypeKeyid: '',
          meetingTypeName: '',
          meetingDateTime: '',
          meetingFile: '',
          meetingVideoImage: '',
        },
        formRules: {},
        meetingType: []
      }
    },
    //生命周期函数节点
    created() {

    },
    mounted(){
      this.getSelectByCode('169').then(item => {
        this.meetingType = item.data
      })
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form = this.$options.data().form
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
