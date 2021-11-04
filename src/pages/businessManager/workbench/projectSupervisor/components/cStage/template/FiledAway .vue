<template>
  <div class="content">
    <el-row v-loading="loading"
            :element-loading-text="message"
            element-loading-spinner="el-icon-reading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form v-model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-form-item label="延期天数">
          {{form.postponeFinalReportDays<0?Math.abs(form.postponeFinalReportDays)+'天':'暂无延期'}}
        </el-form-item>
        <rea-divider position="left" title="工作延期原因"></rea-divider>
        <rea-textarea v-model="form.postponeFinalReportDesc" max-height="20" min-height="20"></rea-textarea>
        <el-button v-if="form.postponeFinalReportDays<0 && currentItem.projectStatusKeyId==3" style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="submitFormData">
          <span style="margin-right: 100px">提</span><span>交</span>
        </el-button>
      </el-form>
    </el-row>
    <el-button v-if="form.postponeFinalReportDays>=0 && currentItem.projectStatusKeyId==3"
               style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="submitFormData">
      <span style="margin-right: 100px">提</span><span>交</span>
    </el-button>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {},
    props: {},
    watch: {
      currentItem(newValue) {
        if (parseInt(this.currentItem.projectStatusKeyId)<3) {
          this.loading=true
          this.message='项目未完成'
        }else if (parseInt(this.currentItem.projectStatusKeyId) === 4) {
          this.loading=false
          let endDay = this.$myfunction.countdownTime(this.currWorkPlan.enddateTime,'number');
          this.form.postponeFinalReportDays = endDay+parseInt(newValue.finalReportDays);
        }else if(parseInt(this.currentItem.projectStatusKeyId)>5){
          this.loading=true
          this.message=this.projectStatus.find(item=>{
            return this.currentItem.projectStatusKeyId===item.staticsCode
          }).listname
        }

      },
      'form.postponeFinalReportDays': function (newValue) {
        if (parseInt(this.currentItem.projectStatusKeyId) === 3) {
          this.loading=false
          if (newValue >= 0) {
            this.loading = true
            this.message = '剩余' + newValue + '天'
          }else {
            this.loading = false
          }
        }else {
          this.init()
        }
      },
      'currentItem.projectStatusKeyId':function (newValue) {
        this.init()
      },
    },
    computed:{
      ...mapState('workbench/cStage', {
        currWorkPlan: 'currWorkPlan',
        currentItem: 'currentItem'
      }),
      ...mapState('loadType', {
        projectStatus:'projectStatus'
      })
    },
    //数据节点
    data() {
      return {
        loading: true,
        message: '无项目计划',
        formRules: {},
        form: {
          postponeFinalReportDays: 0,
          postponeFinalReportDesc: 0,
        },
      }
    },
    //生命周期函数节点
    created() {
      if (this.currWorkPlan) {
        this.init()
      }
    },
    //自定义函数节点
    methods: {
      ...mapActions('workbench/cStage', {
        networkGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        networkUpCurrWorkPlan: 'networkUpCurrWorkPlan',
        networkUpItem: 'networkUpItem'
      }),
      init(){
        let endDay = this.$myfunction.countdownTime(this.currWorkPlan.enddateTime,'number');
        this.form.postponeFinalReportDays = endDay+parseInt(this.currWorkPlan.finalReportDays);
        if (parseInt(this.currentItem.projectStatusKeyId)<3) {
          this.loading=true
          this.message='项目未完成'
        }else if (parseInt(this.currentItem.projectStatusKeyId) === 3) {
          this.loading=false
        }else if (parseInt(this.currentItem.projectStatusKeyId) === 4) {
          this.loading=true
          this.message='归档审核中'
        }else if(parseInt(this.currentItem.projectStatusKeyId)===5){
          this.loading=true
          this.message='已归档'
        }else if(parseInt(this.currentItem.projectStatusKeyId)===6){
          this.loading=true
          this.message='项目已取消'
        }
      },
      submitFormData() {
        if (parseInt(this.form.postponeFinalReportDays)>0) {
          this.form.postponeFinalReportDays=0
          this.form.postponeFinalReportDesc='无延期'
        }else {
          this.form.postponeFinalReportDays=Math.abs(this.form.postponeFinalReportDays)
        }
        this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
        {
           this.ddform('v_2020_ywgl_xmgl_zlgd',{
          c:{code:this.currentItem.contractCode,name:this.currentItem.contractName},
          i:{code:this.currentItem.projectCode,name:this.currentItem.projectName},
          muitList:[{name:'工作延期原因',value:this.form.postponeFinalReportDesc}],
          numList:[{name:'延期天数',value:this.form.postponeFinalReportDays>0?0:Math.abs(this.form.postponeFinalReportDays)}]
        }).then(flowId=>{
          let ref = this.$myfunction.copyData(this.currWorkPlan)
          Object.assign(ref, this.form)
          this.networkUpCurrWorkPlan(ref).then(()=>{
            let ref=this.$myfunction.copyData(this.currentItem)
            ref.projectStatusKeyId='4'
            this.networkUpItem(ref)
          })
          this.ddflow(5,3,{
            baseId:this.currentItem.keyid,
            baseUrl:'pro/cmbaseproject',
            baseColumn:'projectStatusKeyId',
            flowId:flowId,
            fType:'归档审核'
          })
        })
        }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
        //this.resetForm()
      }
    }
  }
</script>
<style lang='less' scoped>
</style>
