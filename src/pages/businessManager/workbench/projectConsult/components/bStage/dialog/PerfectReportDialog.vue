<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
			<el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
				<el-form-item label="报告出具时间">
					<rea-datepicker v-model="form.outPutdateTime"></rea-datepicker>
				</el-form-item>
				<el-form-item label="盖章扫描件">
					<upload-button v-model="form.reportsOutAttchFile"
												 module-type="xm"
												 file-name="报告盖章扫描件"
												 :base-id="currentItem.keyid"
												 ></upload-button>
				</el-form-item>
				<el-form-item label="项目完成的相关证明">
					<upload-button v-model="form.projectFinishDataFile" module-type="xm"
												 file-name="项目完成的相关证明"
												 :base-id="currentItem.keyid"
												 ></upload-button>
				</el-form-item>
				<rea-divider title="咨询工程师执业章"></rea-divider>
				<com-add-person v-model="form.personName" module-type="xm"
												file-name="咨询工程师执业章"
												:base-id="currentItem.keyid"></com-add-person>
				<rea-divider></rea-divider>
			</el-form>
			<dialog-button :cancelBtn="{show:false}" reset-btn="false" @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
		</el-dialog>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'

	export default {
		components: {

		},
		props: {
			title: '',
			width: '',
			labelWidth: {
				type: String,
				default: '130px'
			}
		},
		watch: {},
    computed:{
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
		//数据节点
		data() {
			return {
				dialogVisible: false,
				num: 1,
				form: {
          outPutdateTime:'',
          reportsOutAttchFile:'',
          projectFinishDataFile:'',
          personName:[],
				},
				formRules: {},

			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          let ref = this.$myfunction.copyData(data)
          if (ref.personName.indexOf(',') !== -1) {
            ref.personName = ref.personName.split(',')
          } else if (ref.personName !== '') {
            let arr = []
            arr.push(ref.personName)
            ref.personName = arr
          }else {
            ref.personName = []
					}
          this.form=this.$myfunction.copyData(ref)
        }
				this.dialogVisible = true
			},
			dialogClose() {
				this.dialogVisible = false
			},
			submitForm() {
        this.form.personName=this.form.personName.join(',')
				this.$emit('getFormData', this.$myfunction.copyData(this.form))
				this.dialogClose()
			},
		}
	}
</script>
<style lang='less' scoped>

</style>
