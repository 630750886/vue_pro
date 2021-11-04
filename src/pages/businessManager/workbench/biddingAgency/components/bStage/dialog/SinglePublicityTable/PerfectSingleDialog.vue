<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width"
							 @close="dialogClose" :close-on-click-modal="false">
			<publicity-template v-model="data" @delData="delRef=>{delData.push(delRef)}"></publicity-template>
			<dialog-button reset-btn="false" :cancelBtn="{show:false}"
										 @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
		</el-dialog>
	</div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import PublicityTemplate from '../../acomponents/PublicityTemplate.vue'
  import {GetHttp} from "../../../../../../../../utils/http";
  export default {
    components: {
      PublicityTemplate
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
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form:{},
        data:[],
        formRules: {},
        delData:[]
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
          GetHttp('java_post','/pro/publicitylist/findwhere','post',{pkeyid:data.keyid}).then(item=>{
            this.data=item.data
          })
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
        this.data=[]
        this.delData=[]
      },
      submitForm() {
        let copeForm=this.$myfunction.copyData(this.form)
        this.data.forEach(ref=>{
          if (this.$myfunction.isEmpty(ref.keyid)) {
            this.$set(ref,'pkeyid',copeForm.keyid)
            GetHttp('java_post','/pro/publicitylist/adds','post',ref).then(item=>{
              if (item.code === 200) {
                this.$message.success(item.message)
              }
            })
          }
        })
        this.delData.forEach(ref=>{
          GetHttp('java_post','/pro/publicitylist/deletes','post',ref).then(item=>{
            if (item.code === 200) {
              this.$message.success(item.message)
            }
          })
        })
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
