<template>
	<div class="body">
		<div class="head-button">
			<head-button @click="headButtonClick"></head-button>
		</div>
		<div class="table">
			<el-tabs style="margin:0 5px" v-model="activeName">
				<el-tab-pane name="1">
					<span slot="label">资质</span>
					<qualification-table @aptitudePageInfoChange="aptitudePageInfoChange" :pageShow="pageShow" :dataList="dataListOrgAptitudeInfo"></qualification-table>
				</el-tab-pane>
				<el-tab-pane name="2">
					<span slot="label">荣誉</span>
					<honor-table @honorPageInfoChange="honorPageInfoChange" :pageShow="pageShow" :dataList="dataListOrgHonourableInfo"></honor-table>
				</el-tab-pane>
				<el-tab-pane name="3">
					<span slot="label">公司</span>
					<company-table @companyPageInfoChange="companyPageInfoChange" :pageShow="pageShow" :dataList="dataListOrgCompany"></company-table>
				</el-tab-pane>
				<el-tab-pane name="4">
					<span slot="label">检查</span>
					<administrative-inspection-table @inspectionPageInfoChange="inspectionPageInfoChange" :pageShow="pageShow" :dataList="dataListOrgLicenceCheck"></administrative-inspection-table>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="dialog">
			<add-qualifications-dialog ref="addQualiRef" @getFormData="addQuali"></add-qualifications-dialog>
<!--			<add-honor-dialog title="新增荣誉" ref="addHonorRef" @getFormData="addHonor"></add-honor-dialog>-->
<!--			<add-company-dialog title="新增公司" ref="addCompanyRef" @getFormData="addCompany"></add-company-dialog>-->
<!--			<add-check-dialog title="行政检查名称" ref="addCheckRef" @getFormData="addCheck"></add-check-dialog>-->
		</div>
		<el-dialog
				:visible.sync="dialogVisible"
				v-if="dialogVisible"
				width="500px">
			<el-form style="margin-right: 20px" ref="queryFormRef" :rules="queryFormRules" :model="queryForm" label-width="20%" >
               <el-form-item prop="queryName" v-if="activeName=='1'" label="名称">
					<rea-query-inputa
						v-model="queryForm.queryName"
						url="xz/OrgAptitudeInfo/autofindwhere"
						filter-key="contextname"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<el-form-item prop="queryName" v-if="activeName=='2'" label="名称">
					<rea-query-inputa
						v-model="queryForm.queryName"
						url="xz/OrgHonourableInfo/autofindwhere"
						filter-key="contextname"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<el-form-item prop="queryName" v-if="activeName=='3'" label="名称">
					<rea-query-inputa
						v-model="queryForm.queryName"
						url="xz/OrgCompany/autofindwhere"
						filter-key="contextname"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<el-form-item prop="queryName" v-if="activeName=='4'" label="名称">
					<rea-query-inputa
						v-model="queryForm.queryName"
						url="xz/OrgLicenceCheck/autofindwhere"
						filter-key="contextname"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>

				<el-form-item prop="queryLevel" v-if="activeName=='1'" label="资质等级">
					<rea-query-inputa
						v-model="queryForm.queryLevel"
						url="xz/OrgAptitudeInfo/autofindwhere"
						filter-key="contextcode"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<el-form-item prop="queryLevel" v-if="activeName=='2'" label="荣誉等级">
					<rea-query-inputa
						v-model="queryForm.queryLevel"
						url="xz/OrgHonourableInfo/autofindwhere"
						filter-key="contextcode"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<el-form-item prop="queryUnits" v-if="activeName=='2'"  label="颁发单位">
					<rea-query-inputa
						v-model="queryForm.queryUnits"
						url="xz/OrgHonourableInfo/autofindwhere"
						filter-key="datatypename"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<el-form-item prop="queryUnits" v-if="activeName=='4' " label="检查单位">
					<rea-query-inputa
						v-model="queryForm.queryUnits"
						url="xz/OrgLicenceCheck/autofindwhere"
						filter-key="contextcode"
						@getObject="getItem"
						></rea-query-inputa>
				</el-form-item>
				<!--
				<el-form-item prop="licenceCheckResult" v-if="activeName=='4' " label="检查结果">
  					<el-radio v-model="queryForm.licenceCheckResult" label="false">未通过</el-radio>
				</el-form-item>
				<el-form-item prop="licenceCheckChangeREsult" v-if="activeName=='4' " label="整改结果">
  					<el-radio v-model="queryForm.licenceCheckChangeREsult" label="false">未通过</el-radio>
				</el-form-item>-->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="warning" @click="resetform">重 置</el-button>
				<el-button type="primary" @click="queryGo">筛 选</el-button>
			</span>

		</el-dialog>
	</div>
</template>
<script>
	//import __ from '__' // __是需要手动引入的文件
	import HeadButton from './button/HeadButton.vue'
	import CompanyTable from './table/CompanyTable.vue'
	import HonorTable from './table/HonorTable.vue'
	import QualificationTable from './table/QualificationTable.vue'
	import AdministrativeInspectionTable from './table/AdministrativeInspectionTable.vue'
	import addQualificationsDialog from './dialog/AddQualificationsDialog.vue'
	// import addHonorDialog from './dialog/AddHonorDialog.vue'
	// import addCompanyDialog from './dialog/AddCompanyDialog.vue'
    import * as OrgAptitudeInfo from "@/api/administration/OrgAptitudeInfo.js"
	import * as OrgCompany from "@/api/administration/OrgCompany.js"
	import * as OrgHonourableInfo from "@/api/administration/OrgHonourableInfo.js"
	import * as OrgLicenceCheck from "@/api/administration/OrgLicenceCheck.js"
	import * as OrgLicenceCheckAssist from "@/api/administration/OrgLicenceCheckAssist.js"

	export default {
		inject: ["reload"],
		components: {
			HeadButton,
			CompanyTable,
			HonorTable,
			QualificationTable,
			AdministrativeInspectionTable,
			addQualificationsDialog,

			// addHonorDialog,
			// addCompanyDialog,
			// addCheckDialog,
		},
		props: {

		},
		watch: {
			activeName(newVal){
				this.pageShow= {
					pageInfo: {
						page: 1,
						limit: 30
					},
					advancedQuery: {

					}
				}
				switch (newVal) {
					case "1":
						this.dataListOrgAptitudeInfo={} ,
						this.getAptitudeInfo(this.pageShow);
						break
					case "2":
						this.dataListOrgHonourableInfo={},
						this.getHonourableInfo(this.pageShow);
						break
					case "3":
						this.dataListOrgCompany={},
						this.getCompany(this.pageShow);
						break
					case "4":
						this.dataListOrgLicenceCheck={},
						this.getLicenceCheck(this.pageShow);

				}
			}
		},
		//数据节点
		data() {
			return {
				queryFormRules:{
					queryName:[],
					queryLevel:[],
					queryUnits:[],
					licenceCheckResult:[],
					licenceCheckChangeREsult:[]
				},
				//content
				dialogVisible:false,
				queryForm:{
					queryName:'',
					queryLevel:'',
					queryUnits:'',//颁发单位
					licenceCheckResult:'',//检查结果
					licenceCheckChangeREsult:''//整改结果
				},
				activeName: '1',
				dataListOrgAptitudeInfo:{} ,
				dataListOrgCompany: {},
				dataListOrgHonourableInfo: {},
				dataListOrgLicenceCheck: {},
				pageShow: {
					pageInfo: {
						page: 1,
						limit: 30
					},
					advancedQuery: {

					}
				},
			}
		},
		//生命周期函数节点
		created() {
			//资质
			this.getAptitudeInfo(this.pageShow)
		},
		//自定义函数节点
		methods: {
			//查询
			queryGo(){
				this.$refs.queryFormRef.validate(valid=>{
					if(!valid) return;
					switch (this.activeName) {
						case "1":
							const newform1={
								aptitudeName:this.queryForm.queryName,
								aptitudeLevel:this.queryForm.queryLevel
							};
							this.pageShow.advancedQuery=newform1;
							console.log(this.pageShow);
							this.getAptitudeInfo(this.pageShow);
							break
						case "2":
							const newform2={
								honourableName:this.queryForm.queryName,
								honourableLevel:this.queryForm.queryLevel,
								issuanceUnits:this.queryForm.queryUnits
							};
							this.pageShow.advancedQuery=newform2;
							this.getHonourableInfo(this.pageShow);
							break
						case "3":
							const newform3={
								companyName:this.queryForm.queryName,
							};
							this.pageShow.advancedQuery=newform3;
							this.getCompany(this.pageShow);
							break
						case "4":
							const newform4={
								licenceCheckName:this.queryForm.queryName,
								licenceCheckResult:this.queryForm.licenceCheckResult,
								licenceCheckChangeREsult:this.queryForm.licenceCheckChangeREsult,
								licenceCheckUnit:this.queryForm.queryUnits
							};
							this.pageShow.advancedQuery=newform4;
							this.getLicenceCheck(this.pageShow);
						    break
					}
				})
				this.queryForm={}
				this.dialogVisible=false
			},
			resetform(){
				this.$refs.queryFormRef.resetFields()
			},
			queryData(data){

			},
			//获取资质数据
			getAptitudeInfo(data){
				OrgAptitudeInfo.advancedquery_object(data).then(res => {
					if (res.code === 200) {
						//this.$message.success("查询完成!");
						this.dataListOrgAptitudeInfo=res.data;
						console.log(res.data);
					}
				})
			},
			aptitudePageInfoChange(data){
				this.getAptitudeInfo(data)
			},
			//获取公司数据
			getCompany(data){
				OrgCompany.advancedquery_object(data).then(res => {
					if (res.code === 200) {
						//this.$message.success("查询完成!");
						this.dataListOrgCompany=res.data;
					}
				})
			},
			companyPageInfoChange(data){
				this.getCompany(data)
			},
			//获取荣誉数据
			getHonourableInfo(data){
				OrgHonourableInfo.advancedquery_object(data).then(res => {
					if (res.code === 200) {
						//this.$message.success("查询完成!");
						this.dataListOrgHonourableInfo=res.data;
					}
				})
			},
			honorPageInfoChange(data){
				this.getHonourableInfo(data)
			},

			//获取检查数据
			getLicenceCheck(data){
				OrgLicenceCheck.advancedquery_object(data).then(res => {
					if (res.code === 200) {
						//this.$message.success("查询完成!");
						this.dataListOrgLicenceCheck=res.data;
						console.log(res.data);
					}
				})
			},
			inspectionPageInfoChange(data){
				this.getLicenceCheck(data)
			},
            getItem(item){
				console.log(item);
			},
			headButtonClick(btn) {
				switch (btn) {
					case 1:
						this.$refs.addQualiRef.openDialog();
						break;
					// case 2:
					// 	this.$refs.addHonorRef.openDialog();
					// 	break;
					// case 3:
					// 	this.$refs.addCompanyRef.openDialog();
					// 	break;
					// case 4:
					// 	this.$refs.addCheckRef.openDialog();
					// 	break;
						case 5:
							this.dialogVisible=true
						break;
					case 9:
						this.reload();
						break;
				}
			},

			// addCheck(formdata)
			// {
			// 	OrgLicenceCheck.adds_object(formdata).then(item=>{
			// 	if (item.code === 200) {
			// 	console.info(item);
			// 	this.$message.success("新增检查成功!");
			// 	}
			// });
			// },

			// addCompany(formdata){
			// 	OrgCompany.adds_object(formdata).then(item=>{
			// 	if (item.code === 200) {
			// 	console.info(item);
			// 	this.$message.success("新增检查成功!");
			// 	}
			// });
			// },

			// addHonor(formdata){
			// 	OrgHonourableInfo.adds_object(formdata).then(item=>{
			// 	if (item.code === 200) {
			// 	console.info(item);
			// 	this.$message.success("新增检查成功!");
			// 	}
			// });
			// },

			//添加数据节点
			addQuali(formdata){
				switch (formdata.addType) {
					case "1":
						OrgAptitudeInfo.adds_object({aptitudeName:formdata.addName}).then(item=>{
							if (item.code === 200) {
								console.info(item);
								this.$message.success("新增资质成功!");
								this.getAptitudeInfo(this.pageShow);
							}
						});
						break
					case "2":
						OrgHonourableInfo.adds_object({honourableName:formdata.addName}).then(item=>{
							if (item.code === 200) {
								this.$message.success("新增荣誉成功!");
								this.getHonourableInfo(this.pageShow);
							}
						});
						break
					case "3":
						OrgCompany.adds_object({companyName: formdata.addName}).then(item=>{
							if (item.code === 200) {
								console.info(item);
								this.$message.success("新增公司成功!");
								this.getCompany(this.pageShow);
							}
						});
						break
					case "4":
						OrgLicenceCheck.adds_object({licenceCheckName:formdata.addName}).then(item=>{
							if (item.code === 200) {
								console.info(item);
								this.$message.success("新增检查成功!");
								this.getLicenceCheck(this.pageShow);
							}
						});


				}
			}

		}
	}
</script>
<style lang='less' scoped>
	.head-button {
		height: 35px;
		line-height: 35px;
		padding: 3px 5px;
	}
</style>
