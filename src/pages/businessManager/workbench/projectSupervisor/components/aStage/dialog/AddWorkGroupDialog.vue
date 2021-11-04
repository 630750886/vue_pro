<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="分管副总经理">
						  <QueryInput></QueryInput>
						</el-form-item>
						<el-form-item label="总监理工程师">
						  <el-select-template v-model="form.engineer" :data="[{}]"></el-select-template>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="经理">
						  <QueryInput></QueryInput>
						</el-form-item>
						<el-form-item label="总监理工程师代表">
						  <QueryInput></QueryInput>
						</el-form-item>
					</el-col>


					<el-col :span="24">

						<el-form-item >
						  <span slot="label" style="font-size: 12px;"><i class="el-icon-circle-plus-outline" @click="num1++"></i>专业监理工程师:</span>
						</el-form-item>

						<template v-for="i in num1">
							<el-row>
								<el-col :span="12">
									<el-form-item :label="'专业监理工程师'+i" >
										<QueryInput></QueryInput>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="专业备注">
										<query-input></query-input>
									</el-form-item>
								</el-col>
							</el-row>

						</template>

						<el-form-item >
						  <span slot="label" style="font-size: 12px;"><i class="el-icon-circle-plus-outline" @click="num2++"></i>安全监理员:</span>
						</el-form-item>
						<el-row>
						<template v-for="i in num2">
								<el-col :span="12">
									<el-form-item :label="'安全监理员'+i" >
										<QueryInput></QueryInput>
									</el-form-item>
								</el-col>
						</template>
						</el-row>

						<el-form-item >
						  <span slot="label" style="font-size: 12px;"><i class="el-icon-circle-plus-outline" @click="num3++"></i>监理员:</span>
						</el-form-item>

						<template v-for="i in num3">
							<el-row>
								<el-col :span="12">
									<el-form-item :label="'监理员'+i" >
										<QueryInput></QueryInput>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="专业备注">
										<query-input></query-input>
									</el-form-item>
								</el-col>
							</el-row>

						</template>

						<el-form-item >
						  <span slot="label" style="font-size: 12px;"><i class="el-icon-circle-plus-outline" @click="num4++"></i>见证取样人员:</span>
						</el-form-item>
						<el-row>
						<template v-for="i in num4">
						<el-col :span="12">
							<el-form-item :label="'见证取样人员'+i" >
								<QueryInput></QueryInput>
							</el-form-item>
						</el-col>
						</template>
						</el-row>


						<el-form-item >
						  <span slot="label" style="font-size: 12px;"><i class="el-icon-circle-plus-outline" @click="num5++"></i>其他人员:</span>
						</el-form-item>
						<template v-for="i in num5">
							<el-row>
								<el-col :span="12">
									<el-form-item :label="'其他人员'+i" >
										<QueryInput></QueryInput>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="工作备注">
										<query-input></query-input>
									</el-form-item>
								</el-col>
							</el-row>

						</template>

					</el-col>


				</el-row>








      </el-form>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}" @cancelBtn="dialogClose" okBtn="提 交" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {

    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      },
      updateData:''
    },
    watch: {
      updateData(newValue){
        this.form=this.$myfunction.copyData(newValue)
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
				num1:1,
				num2:1,
				num3:1,
				num4:1,
				num5:1,
        form:{
         engineer:'',
        },
        formRules:{},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(key,value){
        this.$set(this.form,key,value)
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.resetForm()
      },
      submitFormData(){
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm(){
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
