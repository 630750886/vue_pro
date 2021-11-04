<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">

				<el-form-item label="见证时间">
					<rea-datepicker v-model="form.meetingDateTime"></rea-datepicker>
				</el-form-item>
				<rea-divider title="见证人"></rea-divider>
				<com-add-person v-model="form.meetingName"></com-add-person>
				<rea-divider></rea-divider>
				<el-form-item label="见证取样记录">
						<upload-button v-model="form.meetingFile"></upload-button>
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
        form:{
          meetingDateTime:'',
          meetingName:[],
          meetingFile:'',
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
					if (data.meetingName.indexOf(',') !== -1) {
					  ref.meetingName=data.meetingName.splice(',')
					}else {
            let arr=[]
            arr.push(ref.meetingName)
            ref.meetingName=arr
					}
					this.form=ref
				}
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitForm() {
        this.form.meetingName=this.form.meetingName.join(',')
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
