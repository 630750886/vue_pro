<template>
  <div class="content">
    <el-row v-loading="loading"
            :element-loading-text="message"
            element-loading-spinner="el-icon-reading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="plan">
      <el-form v-model="form"
               ref="formRef"
               :rules="formRules" label-width="75px">
        <el-form-item label="延期天数">
          {{form.postponeServiceDays}}天
        </el-form-item>
        <rea-divider position="left" title="工作延期原因"></rea-divider>
        <rea-textarea v-model="form.postponeServiceDesc" max-height="20" min-height="20"></rea-textarea>
      </el-form>
      <el-button v-if="!isBtn()" style="width: 100%; margin-top: 10px" type="primary" size="mini"
                 @click="submitFormData">
        <span style="margin-right: 100px">提</span><span>交</span>
      </el-button>
    </el-row>
    <el-button v-if="isBtn()"
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
        if (parseInt(this.currentItem.projectStatusKeyId) >= 2) {
          this.loading = true
          this.message = this.projectStatus.list.find(item => {
            return this.currentItem.projectStatusKeyId === item.staticsCode
          }).listname
        }else if (!this.$myfunction.isEmpty(newValue)) {
          const end = new Date().getTime()
          const curr = new Date(newValue.enddateTime).getTime()
          let leftTime = parseInt((end - curr) / 1000)
          this.form.postponeServiceDays = parseInt(leftTime / (24 * 60 * 60));
        } else {
          this.loading = true
          this.message = '无项目计划'
        }
      },
      'form.postponeServiceDays': function (newValue) {
        if (parseInt(this.currentItem.projectStatusKeyId) >= 2) {
          this.loading = true
          this.message = this.projectStatus.list.find(item => {
            return this.currentItem.projectStatusKeyId === item.staticsCode
          }).listname
        }else if (newValue <= 0) {
          this.loading = true
          this.message = '剩余' + Math.abs(newValue) + '天'
        } else {
          this.loading = false
        }
      },
      'currentItem.projectStatusKeyId': function (newValue) {
        if (parseInt(newValue) >= 2) {
          this.loading = true
          this.message = this.projectStatus.list.find(item => {
            return this.currentItem.projectStatusKeyId === item.staticsCode
          }).listname
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
        message: '',
        formRules: {},
        form: {
          postponeServiceDays: '',
          postponeServiceDesc: '',
        },
      }
    },
    //生命周期函数节点
    created() {

      if (parseInt(this.currentItem.projectStatusKeyId) >= 2) {
        this.loading = true
        this.message = this.projectStatus.list.find(item => {
          return this.currentItem.projectStatusKeyId === item.staticsCode
        }).listname
      }else if (!this.$myfunction.isEmpty(this.currWorkPlan)) {
        const end = new Date().getTime()
        const curr = new Date(this.currWorkPlan.enddateTime).getTime()
        let leftTime = parseInt((end - curr) / 1000)
        this.form.postponeServiceDays = parseInt(leftTime / (24 * 60 * 60));
      } else {
        this.message = '无项目计划'
      }
    },
    //自定义函数节点
    methods: {
      ...mapActions('workbench/cStage', {
        networkGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        networkUpCurrWorkPlan: 'networkUpCurrWorkPlan',
        networkUpItem: 'networkUpItem'
      }),
      isBtn(){
        if (parseInt(this.currentItem.projectStatusKeyId) < 2
            && !this.$myfunction.isEmpty(this.currWorkPlan)
            && form.postponeServiceDays <= 0) {
          return true
        }else {
          return false
        }
      },
      submitFormData() {
        this.ddform('v_2020_ywgl_gcjl_xmwcsb',{
          c:{code:this.currentItem.contractCode,name:this.currentItem.contractName},
          i:{code:this.currentItem.projectCode,name:this.currentItem.projectName},
          muitList:[{name:'工作延期原因',value:form.postponeServiceDesc}],
          numList:[{name:'延期天数',value:form.postponeServiceDays>0?0:Math.abs(this.form.postponeServiceDays)}]
        }).then(flowId=>{
          let ref = this.$myfunction.copyData(this.currWorkPlan)
          Object.assign(ref, this.form)
          this.networkUpCurrWorkPlan(ref).then(() => {
            let ref = this.currentItem
            ref.allstatecode = '2'
            this.networkUpItem(ref).then(item=>{
              this.ddflow(3,1,{
                baseId:item.keyid,
                baseUrl:'/pro/cmbaseproject',
                baseColumn:'allstatecode',
                flowId:flowId,
                fType:'项目完成申报'
              })
            })
          })
        })
        this.resetForm()
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
