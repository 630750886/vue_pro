<template>
  <div>
   <el-form :model="form" ref="formRef" :rules="formRules" label-width="160px" style="width: 100%;float: left;">
		 <el-col :span="12">
			 <el-form-item label="拦标价/预算价(万元)">
				 <el-input v-model="form.budgetprice" :readonly="readonly"></el-input>
			 </el-form-item>
			 <el-form-item label="上传拦标价/预算价公示截图">
				 <download-button :value="form.budgetImageFile"></download-button>
				 <upload-button v-if="!readonly" v-model="form.budgetImageFile"></upload-button>
			 </el-form-item>
			 <el-form-item label="上传拦标价/预算价相关文件">
				 <download-button :value="form.budgetFile"></download-button>
				 <upload-button v-if="!readonly" v-model="form.budgetFile"></upload-button>
			 </el-form-item>
		 </el-col>
		 <el-button v-if="readonly"
								style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="readonly=false">
			 <span style="margin-right: 100px">编</span><span>辑</span>
		 </el-button>
		 <el-button v-if="!readonly"
								style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="submitFormData">
			 <span style="margin-right: 100px">保</span><span>存</span>
		 </el-button>
   </el-form>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'
  import {getSureBudget,addSureBudget,upSureBudget,delSureBudget} from '../../../../../../../api/workbench/webapi-biddingAgency.js'

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
    },
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        readonly:true,
        isDataInfo:true,
				form:{
          budgetprice:'',
          budgetImageFile:'',
          budgetFile:'',
				},
				formRules:{},
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetData()
		},
    //自定义函数节点
    methods: {
      networkGetData() {
        let ref={
          projectKeyid:this.currentItem.keyid,
        }
        getSureBudget(ref).then(item=>{
          if (!this.$myfunction.isEmpty(item.data[0])) {
            this.form=item.data[0]
					}
        })
      },
      networkAddData(formData) {
        formData.projectKeyid=this.currentItem.keyid
        addSureBudget(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetData()
          }
        })
      },
      networkUpData(formData) {
        upSureBudget(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetData()
          }
        })
      },
      networkDelData(formData) {
        delSureBudget(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetData()
          }
        })
      },
      submitFormData(){
				if (!this.$myfunction.isEmpty(this.form.keyid)) {
				  this.networkUpData(this.form)
				}else {
          this.networkAddData(this.form)
				}
				this.readonly=true
			}
    }
  }
</script>
<style lang='less' scoped>

</style>
