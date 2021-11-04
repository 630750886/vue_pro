<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="机主"  prop="phonePersonName">
          <rea-query-input v-model="form.phonePersonName"
                           url="hr/basicinfo/autofindwhere"
                           filter-key="contextname"
                           @getObject="item=>{form.phonePersonName=item.contextname}"></rea-query-input>
        </el-form-item>
        <el-form-item label="手机号"  prop="phoneCode">
          <el-input v-model="form.phoneCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机管理部门" prop="phoneDepartment" >
          <el-cascader
                ref="vestinref"
                :options="roleOrgTree"
                v-model="form.phoneDepartmentkeyid"
                :props="{checkStrictly:false,value:'keyid',label:'label',children:'children',emitPath:false}"
                clearable
                :show-all-levels="false"
                @change="getorginfo"></el-cascader>
        </el-form-item>
        <el-form-item label="手机管理人"  prop="phoneManager">
          <rea-query-input v-model="form.phoneManager"
                           url="hr/basicinfo/autofindwhere"
                           filter-key="contextname"
                           @getObject="item=>{form.phoneManager=item.contextname}"></rea-query-input>
        </el-form-item>
        <el-form-item label="使用范围" prop="phoneDescInfo" >
         <el-input type="textarea"  v-model="form.phoneDescInfo" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="新建" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";

  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate,
      ElTextareaTemplate
    },
    props: {
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
          phonePersonName:'',//机主
          phoneCode:'',//号码
          phoneManager:'',//管理员
          phoneDepartmentkeyid:'',//手机管理部门
          phoneDepartment:'',//手机管理部门
          phoneDescInfo:'',//说明
        },
        roleOrgTree:[],
        //表单验证规则
        formRules: {
          phonePersonName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          phoneCode:[{ pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, required: true, message: '请输入正确手机号', trigger: 'blur' }],
          phoneManager:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          phoneDescInfo:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          phoneDepartment:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
        },
        activityType:[
        ]
      }
    },
    //生命周期函数节点
    created() {
      this.get_orgtreeinfo();
    },
    //自定义函数节点
    methods: {
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      get_orgtreeinfo()
      {
        this.javaHttp("/sysorgs/findtree", {keyid:"0000"}).then(item => {
        if (item.code === 200) {
          this.roleOrgTree = item.data;
        } else {
          this.$message.success(item.message);
        }
      });
      },
      getorginfo(orgnode)
      {
         let mynode=this.$refs.vestinref.getCheckedNodes(true);
         this.form.phoneDepartmentkeyid=mynode[0].value;
         this.form.phoneDepartment=mynode[0].label;
      },
      submitFormData() {
         this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit('getFormData', this.$myfunction.copyData(this.form))
            this.dialogClose()
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });

      },
      openDialog(data) {
				if(data!==undefined){
					this.form=data
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
