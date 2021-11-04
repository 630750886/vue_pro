<template>
	<div class="b-main">
		<el-form v-model="form" ref="formRef" :rules="formRules" label-width="120px">
			<el-form-item label="保修开始时间">
				<rea-datepicker v-model="form.guaranteeBegindateTime" :readonly="readonly"></rea-datepicker>
			</el-form-item>
			<el-form-item label="保修结束时间">
				<rea-datepicker v-model="form.guaranteeEnddateTime" :readonly="readonly"></rea-datepicker>
			</el-form-item>
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
  import {getWarrantyTime,addWarrantyTime,delWarrantyTime,upWarrantyTime} from '../../../../../../../api/workbench/webapi-projectSupervisor.js'
  export default {
		components: {
		},
		props: {},
		watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
		//数据节点
		data() {
			return {
        readonly: true,
				form: {
          guaranteeEnddateTime:'',
          guaranteeBegindateTime:'',
				},
				formRules: {},
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
        }
        getWarrantyTime(ref).then(item=>{
          if (!this.$myfunction.isEmpty(item.data[0])) {
            this.form=item.data[0]
          }
        })
      },
      networkAddData(formData){
        let ref=this.$myfunction.copyData(formData)
        ref.projectKeyid=this.currentItem.keyid
        addWarrantyTime(ref).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(){
        let ref=this.$myfunction.copyData(this.form)
        upWarrantyTime(ref).then(item=>{
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
	.b-main {
		height: 80%;

		.head-button {
			width: 100%;
			margin-bottom: 10px;

			.el-button {
				margin: 10px 10px;
				float: right;
			}
		}
	}
</style>
