<template>
	<div>
		<el-form v-model="form" :rules="formRule">
			<el-row :gutter="10">
				<el-col :span="12">
					<rea-divider title="审查内容" position="left"></rea-divider>
					<el-form-item>
						<rea-textarea v-model="form.auditContant" min-height="20" max-height="20" :readonly="readonly"></rea-textarea>
					</el-form-item>

				</el-col>
				<el-col :span="12">
					<rea-divider title="审查结论" position="left"></rea-divider>
					<el-form-item>
						<rea-textarea v-model="form.auditResult" min-height="20" max-height="20" :readonly="readonly"></rea-textarea>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-button v-if="!readonly" style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="submitFormData">
			<span style="margin-right: 100px">保</span><span>存</span>
		</el-button>
		<el-button v-if="readonly" style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="readonly=false">
			<span style="margin-right: 100px">编</span><span>辑</span>
		</el-button>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'
  import {getExamination,addExamination,upExamination} from '../../../../../../../api/workbench/webapi-projectSupervisor.js'
	export default {
		components: {

		},
		props: {
      typeCode:{
        type:String,
				default:''
			}
		},
		watch: {},
		computed:{
				...mapState('workbench',{
				  currentItem:'currentItem'
				})
		},
		//数据节点
		data() {
			return{
        readonly:true,
				form:{
          auditContant:'',
          auditResult:'',
				},
				formRule:{},
			}

		},
		//生命周期函数节点
		created() {
		  this.networkGetDatas()
		},
		//自定义函数节点
		methods: {
		  networkGetDatas(){
		    let ref={
          projectKeyid:this.currentItem.keyid,
          typecode:this.typeCode
				}
		    getExamination(ref).then(item=>{
		      if (!this.$myfunction.isEmpty(item.data[0])) {
            this.form=item.data[0]
					}
				})
			},
		  networkAddData(formData){
		    let ref=this.$myfunction.copyData(formData)
				ref.projectKeyid=this.currentItem.keyid
				ref.typecode=this.typeCode
		    addExamination(ref).then(item=>{
		      if (item.code === 200) {
		        this.$message.success(item.message)
            this.networkGetDatas()
					}
				})
			},
			networkUpData(){
        let ref=this.$myfunction.copyData(this.form)
        upExamination(ref).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
						this.networkGetDatas()
          }
        })
			},
      submitFormData(){
		    if (this.$myfunction.isEmpty(this.form.keyid)) {
		      this.networkAddData(this.form)
				}else {
		      this.networkUpData()
				}
				this.form=this.$options.data().form
				this.readonly=true
			}
		}
	}
</script>
<style lang='less' scoped>

</style>
