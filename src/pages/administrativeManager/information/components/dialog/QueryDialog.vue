<template>
  <div>
    <el-dialog :activeName="activeName" :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <!--
          <el-form-item v-if="activeName=='1' " label="手机号" prop="phoneCode">
            <el-input v-model="form.phoneCode"></el-input>
          </el-form-item>
          <el-form-item v-if="activeName=='1' " label="手机管理人" prop="phoneManager">
            <el-input v-model="form.phoneManager"></el-input>
          </el-form-item>
        -->
        <el-form-item v-if="activeName=='2' " label="网站名称" prop="webName">
          <rea-query-inputa
              v-model="form.webName"
              url="xz/MessageWeb/autofindwhere"
              filter-key="contextname"
              @getObject="getItem"
            ></rea-query-inputa>
        </el-form-item>
        <el-form-item v-if="activeName=='3' " label="协会名称" prop="isocName">
          <rea-query-inputa
              v-model="form.isocName"
              url="xz/Messageisoc/autofindwhere"
              filter-key="contextname"
              @getObject="getItem"
            ></rea-query-inputa>
        </el-form-item>
        <el-form-item v-if="activeName=='4' " label="社会角色名称" prop="socialRoleName">
          <rea-query-inputa
              v-model="form.socialRoleName"
              url="xz/MessageSocialRole/autofindwhere"
              filter-key="contextname"
              @getObject="getItem"
            ></rea-query-inputa>
        </el-form-item>
        <el-form-item v-if="activeName=='4' " label="任职单位" prop="socialRoleOrg">
          <rea-query-inputa
              v-model="form.socialRoleOrg"
              url="xz/MessageSocialRole/autofindwhere"
              filter-key="contextcode"
              @getObject="getItem"
            ></rea-query-inputa>
        </el-form-item>
        <el-form-item v-if=" activeName=='3' || activeName=='2' " label="是否绑定手机" prop="isPhone">
          <el-radio v-model="form.isPhone" label="true">是</el-radio>
        </el-form-item>
        <el-form-item v-if="activeName=='3' " label="是否缴纳会费" prop="isPay">
          <el-radio v-model="form.isPay" label="true">是</el-radio>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="true" :cancelBtn="{show:false}" okBtn="筛选" @resetBtn="resetForm"   @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";

  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate
    },
    props: {
      activeName:'',
      title: '',
      station: {
        type: Object,
        default: () => {
          return {
            organize: [],
          }
        }
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        //表单对象
        form: {
          webName:"",
          isocName:"",
          socialRoleName:"",
          socialRoleOrg:"",
          isPhone:"",
          isPay:""
        },
        //表单验证规则
        formRules: {

        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getItem(item){
        console.log(item);
      },
      resetForm()
      {
        this.$refs.formRef.resetFields()
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      openDialog() {
        if (this.activeName=='1')
        {
          this.$message("手机信息没有查询！");
          this.dialogClose();
        }
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>
  .btn-right {
    float: right;
    margin-right: 0 !important;
  }
</style>
