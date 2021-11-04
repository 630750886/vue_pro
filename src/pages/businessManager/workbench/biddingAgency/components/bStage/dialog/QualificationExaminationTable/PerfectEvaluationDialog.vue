<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"
     v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="180px">
				<rea-divider title="专家构成(数量)"></rea-divider>
				<el-form-item label="专业库专家">
					<rea-number-input v-model="form.poolExpert"></rea-number-input>
				</el-form-item>
				<el-form-item label="业主专家">
					<rea-number-input v-model="form.ownerExpert"></rea-number-input>
				</el-form-item>
				<rea-divider></rea-divider>
				<el-form-item label="抽取专家的相关资料">
					<upload-button v-model="form.getexpertFile"></upload-button>
				</el-form-item>
				<el-form-item label="业主代表专家的授权委托书">
					<upload-button v-model="form.ownerRepresentativeFile"></upload-button>
				</el-form-item>
				<el-form-item label="进场交易授权委托书">
					<upload-button v-model="form.inRepresentativeFile"></upload-button>
				</el-form-item>
				<el-form-item label="投标文件递送情况记录表">
					<upload-button v-model="form.bidInInfoFile"></upload-button>
				</el-form-item>
				<el-form-item label="专家签到表">
					<upload-button v-model="form.expertSignFile"></upload-button>
				</el-form-item>
				<el-form-item label="开标记录表">
					<upload-button v-model="form.openBidRecordFile"></upload-button>
				</el-form-item>
				<el-form-item label="主管部门,业主,来宾签到表">
					<upload-button v-model="form.ownerSignFile"></upload-button>
				</el-form-item>
				<el-form-item label="评标专家个人打分表及汇总表">
					<upload-button v-model="form.expertExamFile"></upload-button>
				</el-form-item>

				<rea-divider title="投标文件"></rea-divider>
				<my-file-tem ref="myFileRef" :filter-keyid="form.filesalekeyid" v-model="form.tenderfile" @removeData="item=>{this.removeData.push(item)}"></my-file-tem>
				<rea-divider></rea-divider>

				<el-form-item label="评标报告">
					<upload-button v-model="form.bidReportFile"></upload-button>
				</el-form-item>
				<el-form-item label="中标确认函">
					<upload-button v-model="form.biddingFile"></upload-button>
				</el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import myFileTem from '../../acomponents/OrgAndFileTempalte.vue'

  export default {
    components: {
      myFileTem,
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
          poolExpert:'',
          ownerExpert:'',
          getexpertFile:'',
          ownerRepresentativeFile:'',
          inRepresentativeFile:'',
          bidInInfoFile:'',
          expertSignFile:'',
          openBidRecordFile:'',
          ownerSignFile:'',
          expertExamFile:'',
          tenderfile:[],
          bidReportFile:'',
          biddingFile:'',
        },
        formRules:{},
        removeData:[]
      }
    },
    //生命周期函数节点
    created() {},
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
				this.removeData=[]
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
				if (!this.$myfunction.isEmpty(this.removeData)) {
          this.$emit('removeData',this.$myfunction.copyData(this.removeData))
				}
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
