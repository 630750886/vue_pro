<template>
  <div class="content">
    <el-row v-loading="loading"
            :element-loading-text="message"
            element-loading-spinner="el-icon-reading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form v-model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-form-item label="延期天数">
          {{form.postponeFinalReportDays}}天
        </el-form-item>
        <rea-divider position="left" title="工作延期原因"></rea-divider>
        <rea-textarea v-model="form.postponeFinalReportDesc" max-height="20" min-height="20"></rea-textarea>
        <el-button v-if="form.postponeFinalReportDays>0" style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="submitFormData">
          <span style="margin-right: 100px">提</span><span>交</span>
        </el-button>
      </el-form>
      <el-button v-if="!$myfunction.isEmpty(currWorkPlan)&&form.postponeFinalReportDays<=0 " style="width: 100%; margin-top: 10px" type="primary" size="mini" @click="submitFormData">
        <span style="margin-right: 100px">提</span><span>交</span>
      </el-button>
    </el-row>
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
        if (parseInt(this.currentItem.projectStatusKeyId)<3) {
          this.loading=true
          this.message='项目未完成'
        }else if (parseInt(this.currentItem.projectStatusKeyId) === 4) {
          this.loading=false
          const end = new Date().getTime()
          const curr = new Date(newValue.enddateTime).getTime()
          let leftTime = parseInt((end - curr) / 1000)
          this.form.postponeFinalReportDays = parseInt(leftTime / (24 * 60 * 60)+newValue.finalReportDays);
        }else if(parseInt(this.currentItem.projectStatusKeyId)>5){
          this.loading=true
          this.message=this.projectStatus.find(item=>{
            return this.currentItem.projectStatusKeyId===item.staticsCode
          }).listname
        }

      },
      'form.postponeFinalReportDays': function (newValue) {
        if (parseInt(this.currentItem.projectStatusKeyId)<3) {
          this.loading=true
          this.message='项目未完成'
        }else if (parseInt(this.currentItem.projectStatusKeyId) === 4) {
          this.loading=false
          if (newValue <= 0) {
            this.loading = true
            this.message = '剩余' + Math.abs(newValue) + '天'
          }else {
            this.loading = false
          }
        }else if(parseInt(this.currentItem.projectStatusKeyId)>5){
          this.loading=true
          this.message=this.projectStatus.find(item=>{
            return this.currentItem.projectStatusKeyId===item.staticsCode
          }).listname
        }
      },
      'currentItem.projectStatusKeyId':function (newValue) {
        if (parseInt(newValue) >=4) {
          this.loading = true
          this.message=this.projectStatus.find(item=>{
            return this.currentItem.projectStatusKeyId===item.staticsCode
          }).listname
        }else {
          this.loading = false
        }
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
        message: '',
        formRules: {},
        form: {
          postponeFinalReportDays: '',
          postponeFinalReportDesc: '',
        },
      }
    },
    //生命周期函数节点
    created() {
      if (parseInt(this.currentItem.projectStatusKeyId)<3) {
        this.loading=true
        this.message='项目未完成'
      }else if (parseInt(this.currentItem.projectStatusKeyId) === 4) {
        this.loading=false
      }else
        if(parseInt(this.currentItem.projectStatusKeyId)>5){
        this.loading=true
        this.message=this.projectStatus.find(item=>{
          return this.currentItem.projectStatusKeyId===item.staticsCode
        }).listname
      }
    },
    //自定义函数节点
    methods: {
      ...mapActions('workbench/cStage', {
        networkGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        networkUpCurrWorkPlan: 'networkUpCurrWorkPlan',
        networkUpItem: 'networkUpItem'
      }),
      dialogClose() {

      },
      submitFormData() {
        let ref = this.$myfunction.copyData(this.currWorkPlan)
        Object.assign(ref, this.form)
        this.networkUpCurrWorkPlan(ref).then(()=>{
          let ref=this.currentItem
          ref.projectStatusKeyId='4'
          this.networkUpItem(ref)
        })
        this.resetForm()
      }
    }
  }
</script>
<style lang='less' scoped>
  .content {
  }
</style>
