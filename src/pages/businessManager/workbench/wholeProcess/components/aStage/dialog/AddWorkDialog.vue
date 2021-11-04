<template>
  <div>
    <!-- 新建工作计划form表单 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划开始时间">
              <el-date-picker></el-date-picker>
            </el-form-item>
            <el-form-item label="计划服务天数">
              54天
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划完成时间">

            </el-form-item>
            <el-form-item label="计划回访及归档天数">
              <el-input-number ></el-input-number>
              天
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="服务内容:" label-width="75px">
          <service-content-plan ref="contentRef" :data="serviceOptions1"></service-content-plan>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" okBtn="提交" :cancelBtn="{show:false}"
                     @okBtn="submitFormData"></dialog-button>
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
      width: {
        type: String,
        default: '50%'
      },
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {},
        formRules: {},
        checked: [],
        serviceOptions1: [
          {id: 0, name: '工程咨询',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id:1,name:'造价咨询',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 2, name: '招标代理',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 3, name: '工程监理',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 4, name: '项目管理',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 5, name: '其他服务',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
        ],
        /* serviceOptions2: [//造价鉴定
          {id: 0, name: '现场勤验',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id:1,name:'鉴定核对及出具征询意见稿',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 2, name: '出具鉴定意见书 ',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 3, name: '质询及补充鉴定',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 4, name: '其他服务',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
        ],
        serviceOptions3: [//全过程
          {id: 0, name: '投资估算编制',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id:1,name:'投资估算审核',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 2, name: '设计概算编制  ',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 3, name: '设计概算审核',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 4, name: '施工图预算编制',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 5, name: '清单及限价编制',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 6, name: '清单及限价审核',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 7, name: '清标',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 7, name: '实施阶段',checked:false,time:{show:true,value:''},workContent:{show:false,value:''}},
          {id: 8, name: '编制项目资金使用计划',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 9, name: '工程计量与合同价款审核',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 10, name: '询价与核价',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 11, name: '工程变更审核 ',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 12, name: '工程签证审核  ',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 13, name: '工程索赔审核',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 14, name: '工程结算审核 ',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 15, name: '工程造价动态管理',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
          {id: 16, name: '竣工结算审核',checked:false,time:{show:true,value:''},workContent:{show:true,value:''}},
          {id: 17, name: '其他服务',checked:false,time:{show:false,value:''},workContent:{show:true,value:''}},
        ], */
      }
    },
    //生命周期函数节点
    created() {
      //初始化服务选择框
      this.checked = new Array(this.serviceOptions.length);
      for (var i = 0; i < this.checked.length; i++) {
        this.checked[i] = false;
      }
    },
    //自定义函数节点
    methods: {
      openDialog(key, value) {
        this.$set(this.form, key, value)
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$refs.contentRef.getValue()
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
