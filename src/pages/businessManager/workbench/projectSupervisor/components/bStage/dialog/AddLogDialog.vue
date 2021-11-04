<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="天气">
							<el-input v-model="form.weatherInfo"></el-input>
						</el-form-item>
						<el-form-item label="最高气温">
							<el-input v-model="form.maxLapseRate"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="风力">
							<el-input v-model="form.windPowerInfo"></el-input>
						</el-form-item>
						<el-form-item label="最低气温">
							<el-input v-model="form.minLapseRate"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-tabs v-model="activeName">
					<el-tab-pane label="施工环境情况" name="1">
						<rea-textarea v-model="form.constructionEnv" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
					<el-tab-pane label="工程施工进展情况" name="2">
						<rea-textarea v-model="form.constructionEvolve" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
					<el-tab-pane label="监理工作情况" name="3">
						<rea-textarea v-model="form.supervisorWork" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
					<el-tab-pane label="存在的问题及处理情况" name="4">
						<rea-textarea v-model="form.constructionMatter" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
					<el-tab-pane label="其他有关事项" name="5">
						<rea-textarea v-model="form.constructionAboutItem" min-height="20" max-height="20"></rea-textarea>
					</el-tab-pane>
				</el-tabs>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="保 存" :cancelBtn="{show:false}"
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
    },
    watch: {
      'form.weatherInfo':function (newValue) {
				if (newValue!=='') {
				  this.form.allstatusname=true
				}
      },
      'form.maxLapseRate':function (newValue) {
				if (newValue!=='') {
				  this.form.allstatusname=true
				}
      },
      'form.windPowerInfo':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.minLapseRate':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.constructionEnv':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.constructionEvolve':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.supervisorWork':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.constructionMatter':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      },
      'form.constructionAboutItem':function (newValue) {
        if (newValue!=='') {
          this.form.allstatusname=true
        }
      }
		},
    //数据节点
    data() {
      return {
        activeName:'1',
        dialogVisible: false,
        form:{
          weatherInfo:'',
          maxLapseRate:'',
          windPowerInfo:'',
          minLapseRate:'',
          constructionEnv:'',
          constructionEvolve:'',
          supervisorWork:'',
          constructionMatter:'',
          constructionAboutItem:'',
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
        this.dialogVisible = true
				if (!this.$myfunction.isEmpty(data)) {
				  this.form=this.$myfunction.copyData(data)
				}
      },
      dialogClose() {
        this.dialogVisible = false
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
