<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
			<el-form :model="form" ref="formRef" :rules="formRules" label-width="130px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="旁站开始时间">
							<rea-datepicker v-model="form.begindateTime"></rea-datepicker>
						</el-form-item>
						<el-form-item label="施工单位">
							<el-input v-model="form.buildcomp"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="旁站结束时间">
							<rea-datepicker v-model="form.enddateTime"></rea-datepicker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-tabs v-model="activeName">
					<el-tab-pane label="旁站的关键部位关键工序" name="1">
						<rea-textarea v-model="form.workOrder" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
					<el-tab-pane label="旁站的关键部位、关键工序施工情况" name="2">
						<rea-textarea v-model="form.buildStatusInfo" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
					<el-tab-pane label="发现的问题及处理情况" name="3">
						<rea-textarea v-model="form.constructionMatter" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
				</el-tabs>
			</el-form>
			<dialog-button reset-btn="false" ok-btn="保 存" @okBtn="submitForm" :cancelBtn="{show:false}" @cancelBtn="dialogClose"></dialog-button>
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
		watch: {
      /*'form.begindateTime':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.buildcomp':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },*/
      'form.enddateTime':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.workOrder':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.buildStatusInfo':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.constructionMatter':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
		},
		//数据节点
		data() {
			return {
        activeName:'1',
				dialogVisible: false,
				form: {
          begindateTime:'',
          buildcomp:'',
          enddateTime:'',
          workOrder:'',
          buildStatusInfo:'',
          constructionMatter:'',
          dailyRecordkeyid:''
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
        this.dialogVisible = true
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
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
