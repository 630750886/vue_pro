<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站名称" prop="webName" label-width="120px">
              <el-input v-model="form.webName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="链接" label-width="120px" >
              <el-input v-model="form.webUrl" clearable></el-input>
            </el-form-item>
            <el-form-item  label="网站使用简要介绍" label-width="120px">
              <el-input type="textarea"  v-model="form.webDesc" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名"  label-width="120px">
              <el-input v-model="form.webUserName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="密码"  label-width="120px">
              <el-input v-model="form.webUserPassword" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <divider></divider>
          <div>
          <span>手机绑定情况</span><span class="myspanright"><el-button type="text"  @click="delphone" size="mini">清空手机绑定</el-button></span>
          </div>
        </div>
        <el-row>
           <el-col :span="12">
            <el-form-item label="手机号" >
              <rea-query-input v-model="form.phonecode"
                               url="xz/MessagePhone/autofindwhere"
                               filter-key="contextcode"
                               @getObject='item=>{form.phonename=item.contextname,form.phoneManager=item.address,form.phoneDepartment=item.datatypename}'></rea-query-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机管理人" >
              <el-input v-model="form.phoneManager" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机主" >
              <el-input v-model="form.phonename" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机管理部门" >
              <el-input v-model="form.phoneDepartment" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
              <span slot="label"><i class="el-icon-circle-plus-outline" @click="oncontract"></i>合同相关:</span>
          </div>
        <template v-for="(citem,index) in contractBase">
          <el-row :key="index">
            <el-col :span="11">
            <el-form-item label="合同编号" prop="contractCode">
              <rea-query-input
                v-model="citem.contractBasecode"
                url="/nonagr/contractbaseInfo/findwhere"
                :filter-obj="{ contractTypeKeyId: form.contractTypeCode}"
                filter-key="contractCode"
                @getObject="
                  item => {
                    citem.contractBasecode = item.contractCode;
                    citem.contractBasename = item.contractName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
              </el-col>
            <el-col :span="11">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="citem.contractBasename" readonly></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="2">
                  <el-form-item label="" label-width="10px">
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removecontraitem(index)"></el-button>
                  </el-form-item>
                </el-col>
          </el-row>
        </template>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="保存" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";
  import YesOrNoTemplate from "../../../acomponents/YesOrNoTemplate.vue";
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
  import Divider from "../../../acomponents/Divider.vue";
  import PushButton from '../../../acomponents/PushButton.vue'
  import RemoveButton from '../../../acomponents/RemoveButton.vue'
  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate,
      YesOrNoTemplate,
      ElTextareaTemplate,
      Divider,
      PushButton,
      RemoveButton
    },
    props: {
      title: '',
      width:{
        type:String,
        default:'50%'
      },
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
        num:1,
        dialogVisible: false,
        //表单对象
        form: {
          keyid:'',
          webName:'',//;//名称
          webUrl:'',//定位
          webUserName:'',//用户
          webUserPassword:'',//口令
          webDesc:'',//描述
          phoneKeyid:'',
          contractBaseKeyid:'',
          phonecode:"",
          phonename:"",
          phoneManager:"",
          phoneDepartment:"",
          contractBasecode:"",
          contractBasename:"",
          phones:[],
          contractBase:[]
        },
        //表单验证规则
        formRules: {
          webName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
        },
        contractBase:[
        ]
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      delphone(){
        this.form.phonecode="";
        this.form.phoneManager="";
        this.form.phonename="";
        this.form.phoneDepartment="";
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      oncontract(){
      let currcontr={
         contractBasecode:"",
         contractBasename:""
       }
       this.contractBase.push(currcontr);
      },
      removecontraitem(index)
      {
        console.log(index);
        this.contractBase.splice(index,1);
      },
      submitFormData() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            let contractinfo="";
            this.contractBase.forEach(element => {
              contractinfo=contractinfo+element.contractBasecode+"|"+element.contractBasename+";"
            });
            this.form.contractBasecode=contractinfo.substring(0,contractinfo.lastIndexOf(";"));
            console.log(contractinfo);
            this.$emit('getFormData', this.$myfunction.copyData(this.form))
            this.dialogClose()
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });

        //})
      },
      openDialog(data) {
        //ary.splice(0,ary.length);
        this.contractBase.splice(0,this.contractBase.length);
        if (data !== undefined) {
          this.form=data
          if (this.form.contractBasecode.length>5)
          {
            this.form.contractBasecode.split(";").forEach(item=>{
            let v=item.split("|");
            this.contractBase.push({contractBasecode:v[0],contractBasename:v[1]});
            });
          }
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
  .title{
    margin-bottom: 15px;
  }
  .myspanright{
    float: right;
  }
</style>
