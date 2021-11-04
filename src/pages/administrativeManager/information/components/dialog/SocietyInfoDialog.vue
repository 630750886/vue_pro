<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="协会名称" prop="isocName" label-width="120px">
              <el-input v-model="form.isocName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="链接" label-width="120px">
             <el-input v-model="form.isocUrl" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="网站使用简要介绍" prop="isocDesc" label-width="120px">
              <el-input type="textarea" v-model="form.isocDesc" placeholder="请输入内容"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="isocUserName" label-width="120px">
             <el-input v-model="form.isocUserName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="isocPW" label-width="120px">
              <el-input v-model="form.isocPW" placeholder="请输入内容"></el-input>
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
                               @getObject='item=>{form.phoneperson=item.contextname,form.phoneManager=item.address,form.phoneDepartment=item.datatypename}'></rea-query-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机管理人" >
              <el-input v-model="form.phoneManager" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机主" >
              <el-input v-model="form.phoneperson" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机管理部门" >
              <el-input v-model="form.phoneDepartment" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <divider></divider>
          <span slot="label"><i class="el-icon-circle-plus-outline" @click="addcostinfo"></i>相关会费:</span>
        </div>
        <template v-for="(item,index) in this.form.costs">
          <el-row :key="index">
            <el-col :span="8">
              <el-form-item label="缴纳时间" prop="costBeginDate" label-width="60px">
              <el-date-picker
                v-model="item.costBeginDate"
                type="date"
                placeholder="选择日期"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会费(元)" prop="isoccostSum" label-width="60px">
                 <el-input v-model="item.isoccostSum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="缴纳证明" prop="isocCostAttachFile" label-width="60px">
                <upload-button
                v-model="item.isocCostAttachFile"
              ></upload-button>
              </el-form-item>
            </el-col>
             <el-col :span="2">
                  <el-form-item label="" label-width="10px">
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removecost(index)"></el-button>
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
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";
  import YesOrNoTemplate from "../../../acomponents/YesOrNoTemplate.vue";
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
  import Divider from "../../../acomponents/Divider.vue";
  import PushButton from '../../../acomponents/PushButton.vue'
  import RemoveButton from '../../../acomponents/RemoveButton.vue'
  // import __ from '__' // __是需要手动引入的文件
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
          isocName:'',
          isocUrl:'',
          isocUserName:'',
          isocPW:'',
          isocDesc:'',
          phoneKeyid:'',
          phoneperson:'',
          phonecode:'',
          phoneManager:"",//手机管理人
          phoneDepartment:"",//手机管理部门
          costs:[]
        },
        costsinfo:{
          keyid:'',
          isockeyid:'',
          costBeginDate:'',
          isoccostSum:0.0,
          isocCostAttachFile:''
        },
        //表单验证规则
        formRules: {
          isocName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          },
        activityType:[
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
        this.form.phoneperson="";
        this.form.phonename="";
        this.form.phoneManager="";
        this.form.phoneDepartment="";
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      addcostinfo()
      {
        let constinfo={
          keyid:'',
          isockeyid:this.form.keyid,
          costBeginDate:'',
          isoccostSum:0.0,
          isocCostAttachFile:''
        }
        this.form.costs.push(constinfo);
      },
      removecost(index)
      {
          this.form.costs.splice(index,1);
      },
      submitFormData() {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
      },
      openDialog(data) {
        if (data !== undefined) {
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
   .title{
    margin-bottom: 15px;
  }
  .myspanright{
    float: right;
  }
</style>
