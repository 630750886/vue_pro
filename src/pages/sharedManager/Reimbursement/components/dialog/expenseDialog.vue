<template>
    <el-dialog
    :visible.sync="dialogVisible"
    width="30%"
    :title="title"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef"  label-width="110px">
     <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="报销申请表" prop="fileAttach" :rules="[{ required: true, message: '报销申请表为必填项', trigger: 'blur' }]">
              <upload-button v-model="form.fileAttach"></upload-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报销证明">
              <upload-button v-model="form.proveAttach"></upload-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.mark"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>费用项</span>
                <span style="margin-left: 40px">费用合计(元):{{sumAll}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="addItem()"
                  >添 加</el-button
                >
              </div>
              <div
                v-for="(item, index) in form.tables"
                :key="index"
                class="demo-form-inline"
              >
              <template v-if="category === '0'">
              <el-row  style="margin-top: 8px">
                <el-col :span="24" >
                  <el-form-item
                    label="所属组织"
                     :prop="'tables.' + index + '.orgId'"
                    :rules="[
                                { required: true, message: '所属组织为必填项', trigger: 'blur' },
                            ]"
                  >
          <rea-cascader
            v-model="item.orgId"
            :data="orgTree"
            :props="optionProps"
            @getLabel="
              (s) => {
                item.orgName = s.split('/')[s.split('/').length - 1];
              }
            "
          ></rea-cascader>
                  </el-form-item>
                </el-col>                  
              </el-row>
              </template>
              <template v-if="category === '1'">
              <el-row :gutter="20" style="margin-top: 8px">
                <el-col :span="12">
                  <el-form-item
                    label="合同编号"
                     :prop="'tables.' + index + '.contractId'"
                    :rules="[
                                { required: true, message: '合同编号为必填项', trigger: 'blur' },
                            ]"
                  >
                    <rea-query-input
                v-model="item.contractId"
                url="agr/busicontractbase/findall"
                filter-obj="{}"
                filter-key="contractCode"
                @getObject="
                  (iss) => {
                    item.contractName = iss.contractName;
                    item.orgName =
                      iss.allSysOrgName.split('/')[
                        iss.allSysOrgName.split('/').length - 1
                      ];
                  }
                "
              ></rea-query-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                   <el-form-item label="合同名称">
                      <el-input v-model="item.contractName" readonly></el-input>
                   </el-form-item>
                </el-col>
              </el-row>
              </template>

             
                  <template v-for="(itemChild,index_child) in item.children">
                     <el-row :gutter="20" style="margin-top: 8px" :key="index.toString()+index_child">
                     <el-col :span="12"  :tts="index_child">
                        <el-form-item label="报销类型" :prop="'tables.'+index+'.children.' + index_child + '.totalClass'" :rules="[{ required: true, message: '请输入费用类型', trigger: 'blur' }]">
                          <rea-cascader
                            v-model="itemChild.totalClass"
                            :data="typeListAll"
                            :props="optionProps"                           
                            @getLabelArr="
                                        (s) => {
                                                if(s.length>1){
                                                  itemChild.Aclass=s[0];
                                                  itemChild.Bclass=s[1];
                                                }else{
                                                  itemChild.Aclass=s[0];
                                                }                                               
                                                }
                                        "
                            ></rea-cascader>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="费用(元)" :prop="'tables.'+index+'.children.' + index_child + '.expense'"  :rules="[
                                { required: true, message: '费用为必填项', trigger: 'blur' },
                            ]">
                            <el-input v-model="itemChild.expense" clearable></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="2" :key="index_child" style="margin-top:6px"><i class="el-icon-plus" @click="item.children.push({totalClass:'',expense:0})"></i></el-col>
                        </el-row>
                  </template>
                 
            
             
                            
              </div>
            </el-card>
          </el-col>
        </el-row>
    </el-form>

    <dialog-button
      resetBtn="false"
      :cancelBtn="{ show: false }"
      ok-btn="登 记"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>
<script>
import DialogButton from "../../../components/DialogButton.vue";
import { getCascaderType } from "../../../../../api/webapi-sys.js";
import { mapState, mapActions } from "vuex";
export default {
    components: {
    DialogButton   
  },
  props:{
      category:{
          type:String,
          default:()=>{
              return "0";
          }          
      },
      title:[String]
  },
    data(){
        return {
                // 弹窗显示控制
                dialogVisible: false,
                form:{
                    tables: []
                },
                optionProps: {
                        value: "keyid",
                        label: "label",
                        children: "children",
                        emitPath: false
                },
                typeList:[],
        typelist_new_gl:[
        {
          keyid: "2c93d0ca7b94fcdf017b953d0e250362",
          pkeyid: "0000",
          code: "TYPE-50011",
          label: "直接人工",
          children: "",
        },
         {
          keyid: "2c93d0ca7b94fcdf017b953d67200363",
          pkeyid: "0000",
          code: "TYPE-50012",
          label: "福利费",
          children: "",
        },
         {
          keyid: "2c93d0ca7b94fcdf017b953d67200364",
          pkeyid: "0000",
          code: "TYPE-50013",
          label: "培训费",
          children: "",
        },
        {
          keyid: "2c93d0ca7b94fcdf017b953d67200365",
          pkeyid: "0000",
          code: "TYPE-50014",
          label: "项目奖金",
          children: "",
        }
      ],
      typelist_new_yw:[
        {
          keyid: "2c93d0ca7b94fcdf017b953d0e250362",
          pkeyid: "0000",
          code: "TYPE-50021",
          label: "直接人工",
          children: "",
        },
         {
          keyid: "2c93d0ca7b94fcdf017b953d67200363",
          pkeyid: "0000",
          code: "TYPE-50022",
          label: "福利费",
          children: "",
        },
         {
          keyid: "2c93d0ca7b94fcdf017b953d67200364",
          pkeyid: "0000",
          code: "TYPE-50023",
          label: "培训费",
          children: "",
        }        
      ]
        }
    },   
    computed: {
    ...mapState({
      orgTree: (state) => state.loadType.organizeList // state.orgAndPost.orgTree
    }),
    sumAll(){     
      let sumMoney = this.form.tables.reduce((sum,n)=>{         
         let mysum = n.children.reduce((sum1,n1)=>{
         return parseFloat(sum1)+parseFloat(n1.expense);
        },0);
        return parseFloat(sum)+parseFloat(mysum);    
      },0); 
       this.form.sumMoney=sumMoney;    
      return sumMoney;
    },
    typeListAll(){
        if(this.category==="0"){
                 this.typelist_new_yw.forEach(async item=>{
                     await getCascaderType({ code: item.code }).then(res=>{
                          if(res.data.length>0){
                              item.children = res.data;
                          }
                         
                     })
                 });
                 return this.typelist_new_yw;
                 
             }else{
                  this.typelist_new_gl.forEach(async item=>{
                     await getCascaderType({ code: item.code }).then(res=>{
                          if(res.data.length>0){
                              item.children = res.data;
                          }
                     })
                 });
                 return this.typelist_new_gl;
             }
    }
  },
     methods: {
        async getTypeList(){              
             //0业务1管理
             if(this.category==="0"){
                 this.typelist_new_yw.forEach(async item=>{
                     await getCascaderType({ code: item.code }).then(res=>{
                          if(res.data.length>0){
                              item.children = res.data;
                          }
                         
                     })
                 });
                 return this.typelist_new_yw;
                 
             }else{
                  this.typelist_new_gl.forEach(async item=>{
                     await getCascaderType({ code: item.code }).then(res=>{
                          if(res.data.length>0){
                              item.children = res.data;
                          }
                     })
                 });
                 return this.typelist_new_gl;
             }
         },
        addItem() {
            this.form.tables.push({orgId:'',orgName:'',contractId:'',contractName:'',children:[{totalClass:'',expense:0}]});
            //this.form.tables.push({ expense: 0, totalClass: "" });
      
        },
    openDialog() {
    //   forms = Object.assign(forms, {
    //     sumMoney: JSON.stringify(forms.sumMoney),
    //   });
      this.form = {tables: []};
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      // console.log(this.form);
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("getFormData", this.$myfunction.copyData(this.form));
          this.dialogClose();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      //this.$refs.formRef.resetFields();
    },
    uploadFile() {
      this.$message.success("ok");
    },
  }

}
</script>