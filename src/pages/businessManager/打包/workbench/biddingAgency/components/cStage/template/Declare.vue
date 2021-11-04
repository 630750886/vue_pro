<template>
  <div class="content">
    <el-row v-loading="loading"
            :element-loading-text="message"
            element-loading-spinner="el-icon-reading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="plan">
      <el-form :model="form"
               ref="formRef"
               :rules="formRules" label-width="75px">
        <el-form-item label="延期天数">
          {{form.postponeServiceDays<0? Math.abs(form.postponeServiceDays)+'天' : '暂无延期'}}
        </el-form-item>
        <rea-divider position="left" title="工作延期原因"></rea-divider>
        <rea-textarea v-model="form.postponeServiceDesc" max-height="20" min-height="20"></rea-textarea>
      </el-form>
      <el-button v-if="!isBtn() && parseInt(currentItem.projectStatusKeyId)<3" style="width: 100%; margin-top: 10px" type="primary" size="mini"
                 @click="submitFormData">
        <span style="margin-right: 100px">提</span><span>交</span>
      </el-button>
    </el-row>
    <el-button v-if="isBtn() && parseInt(currentItem.projectStatusKeyId)<3"
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
      currWorkPlan(newValue) {
        this.init()
      },
      'form.postponeServiceDays': function (newValue) {
        this.init()
      },
      'currentItem.projectStatusKeyId': function (newValue) {
        if (parseInt(newValue) >= 2) {
          this.loading = true
          this.message = '项目已完成'
        }
      },
    },
    computed: {
      ...mapState('workbench/cStage', {
        currWorkPlan: 'currWorkPlan',
        currentItem: 'currentItem'
      }),
      ...mapState('loadType', {
        projectStatus: 'projectStatus'
      })
    },
    //数据节点
    data() {
      return {
        loading: true,
        message: '无项目计划',
        formRules: {},
        form: {
          postponeServiceDays: '',
          postponeServiceDesc: '',
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    mounted(){
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
        if (parseInt(this.currentItem.projectStatusKeyId) >= 2) {
          this.loading = true
          this.getSelectByCode('066').then(({data:item})=>{
            let ref=item.find(item => {
              return this.currentItem.projectStatusKeyId === item.staticsCode
            })
            if (ref) {
              this.message=ref.listname
            }
          })
        }else if (!this.$myfunction.isEmpty(this.currentItem.projectPlanKeyid)) {
          this.form.postponeServiceDays = this.$myfunction.countdownTime(this.currWorkPlan.enddateTime,'number');
          if (this.form.postponeServiceDays > 0) {//Math.abs(newValue)
            this.loading = true
            this.message = '剩余' + this.form.postponeServiceDays + '天'
          } else {
            this.loading = false
          }
        } else {
          this.message = '无项目计划'
        }
      },
      isBtn(){
        if (parseInt(this.currentItem.projectStatusKeyId) < 2
            && !this.$myfunction.isEmpty(this.currWorkPlan)
            && this.form.postponeServiceDays > 0) {
          return true
        }else {
          return false
        }
      },
      submitFormData() {
        let copeForm={
          postponeServiceDays: '',
          postponeServiceDesc: '',
        }
        if (parseInt(this.form.postponeServiceDays)>0) {
          copeForm.postponeServiceDays=0
          copeForm.postponeServiceDesc='无延期'
        }else {
          copeForm.postponeServiceDays=Math.abs(this.form.postponeServiceDays)
          copeForm.postponeServiceDesc=this.form.postponeServiceDesc
        }

        this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(() => 
	{
	 this.ddform('v_2020_ywgl_gcjl_xmwcsb',{
          c:{code:this.currentItem.contractCode,name:this.currentItem.contractName},
          i:{code:this.currentItem.projectCode,name:this.currentItem.projectName},
          muitList:[{name:'工作延期原因',value:this.form.postponeServiceDesc}],
          numList:[{name:'延期天数',value:this.form.postponeServiceDays>0?0:Math.abs(this.form.postponeServiceDays)}]
        }).then(flowId=>{
          let ref = this.$myfunction.copyData(this.currWorkPlan)
          Object.assign(ref,copeForm)
          this.networkUpCurrWorkPlan(ref).then(() => {
            let ref = this.$myfunction.copyData(this.currentItem)
            ref.projectStatusKeyId = '2'
            this.networkUpItem(ref)
          })
          this.ddflow(3,1,{
            baseId:this.currentItem.keyid,
            baseUrl:'/pro/cmbaseproject',
            baseColumn:'projectStatusKeyId',
            flowId:flowId,
            fType:'项目完成申报'
          })
        })
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});

       

        //this.resetForm()
      },
      resetForm() {
        this.form = this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>
  .content {
  }
</style>
