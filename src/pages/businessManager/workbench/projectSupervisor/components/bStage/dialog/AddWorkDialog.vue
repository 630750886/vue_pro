<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
							 @close="dialogClose" :close-on-click-modal="false">
			<el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
				<el-form-item label="工作名称">
					<el-input v-model="form.workName"></el-input>
				</el-form-item>

				<el-form-item label="记录时间">
					<rea-datepicker v-model="form.workdateTime"></rea-datepicker>
				</el-form-item>
				<el-form-item label="工作内容">
					<rea-textarea v-model="form.workContant"></rea-textarea>
				</el-form-item>

				<el-form-item label="相关资料">
					<upload-button v-model="form.workFile"></upload-button>
				</el-form-item>
				<el-form-item label="图片或影像资料">
					<upload-button v-model="form.workimagevideoFile"></upload-button>
				</el-form-item>
				<el-form-item label="相关成果资料">
					<upload-button v-model="form.workattachFile"></upload-button>
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
          workName:'',
          workdateTime:'',
          workContant:'',
          workFile:'',
          workimagevideoFile:'',
          workattachFile:'',
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
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
