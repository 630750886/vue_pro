<template>
	<el-dialog :visible.sync="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
		<el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">

			<el-form-item label="展示要求">
				<el-input v-model="form.requirement" value="数据统计"></el-input>
			</el-form-item>

			<el-form-item label="展示时间">
				<el-select v-model="form.timeInterval">
					<el-option label="本年度" value="year"></el-option>
					<el-option label="本月" value="month"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="展示数据">
				<el-select v-model="form.dataType">
					<el-option label="收款总额" value="coll"></el-option>
					<el-option label="往来款总额" value="collAndPay"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="数据分类 ">
				<el-select v-model="form.place" @change="changePlace">
					<el-option v-for="item in placeOptions" :key="item.name" :value="item.id" :label="item.name"></el-option>
				</el-select>


				<el-select v-model="form.department">
					<el-option v-for="item in departmentOptions" :key="item.name" :value="item.id" :label="item.name"></el-option>
				</el-select>
			</el-form-item>

		</el-form>

		<dialog-button :resetBtn="{show:false}"
		 :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
	</el-dialog>
</template>

<script>
	import DialogButton from "../../../acomponents/DialogButton.vue"
	import Station from "../../../acomponents/Station.vue"

	export default {
		components: {
			DialogButton,
			Station
		},
		props: {
			title: {
				type: String,
				dealt: ''
			}
		},
		watch: {
			title(newValue) {
				this.title = newValue
			}
		},
		mounted() {},
		data: function() {

			return {

				//父窗口传递的弹窗标题
				title1: this.title,
				//弹窗显示控制
				dialogVisible: false,
				//地点
				placeOptions: [{
						id: 1,
						name: '总公司'
					},
					{
						id: 2,
						name: '分公司'
					},
					{
						id: 3,
						name: '项目部'
					},

				],
				//部门
				departmentOptions: [],
				//表单对象
				form: {
					requirement: '',
					timeInterval: '',
					dataType: ',',
					place: ',',
					department: ''
				},
				//表单验证规则
				formRules: {}
			}
		},

		methods: {
			//部门选择
			changePlace(place) {
				switch (place) {
					case 1:
						this.departmentOptions = [{
								id: 10,
								name: '各业务部'
							},
							{
								id: 11,
								name: '投标部'
							},
						];
						break;
					case 2:
						this.departmentOptions = [{
							id: 20,
							name: '遵义分公司'
						}, ];
						break;
					case 3:
						this.departmentOptions = [{
							id: 30,
							name: '某某项目部'
						}, ];
						break;
				}
			},

			//设置弹窗显示
			openDialog() {
				this.dialogVisible = true
			},
			dialogClose() {
				this.dialogVisible = false
				this.resetForm()
			},
			submitFormData() {
				this.$emit('getFormData', this.$myfunction.copyData(this.form))
				this.dialogClose()
			},
			resetForm() {
				this.$refs.formRef.resetFields()
			}
		}

	}
</script>

<style scoped>

</style>
