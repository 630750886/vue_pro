<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef"  label-width="120px">
        <el-form-item label="创建时间" >
          <el-date-picker
          v-model="form.createTime1.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        ></el-date-picker
        >-<el-date-picker
          v-model="form.createTime2.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        ></el-date-picker>
        </el-form-item>
        <el-form-item label="创建组织">
          <!-- <rea-cascader
            v-model="form.orgId"
            :data="orgTree"
            :props="optionProps"
            @getLabel="
              (s) => {
                form.orgname = s.split('/')[s.split('/').length - 1];
              }
            "
          ></rea-cascader> -->
          <el-input placeholder="请输入创建组织" v-model="form.org.value"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input placeholder="请输入创建人" v-model="form.createby.value"></el-input>
        </el-form-item>
         <el-form-item label="申请类型">
        <el-select v-model="form.payType.value" placeholder="请选择">
          <el-option label="申请" value="0"></el-option>
          <el-option label="登记" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报销总额(元)">
        <el-input-number
          size="small"
          v-model="form.summoney1.value"
          :controls="false"
          style="width: 30%"
        ></el-input-number
        >-
        <el-input-number
          size="small"
          v-model="form.summoney2.value"
          :controls="false"
          style="width: 30%"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="审核完成时间">
        <el-date-picker
          v-model="form.auditTime1.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        >
        </el-date-picker
        >-<el-date-picker
          v-model="form.auditTime2.value"
          value-format="yyyy/MM/dd"
          type="date"
          placeholder="请选择日期"
        ></el-date-picker>
      </el-form-item>
       <el-form-item label="合同编号">
          <el-input placeholder="请输入" v-model="form.contractId.value"></el-input>
        </el-form-item>
         <el-form-item label="合同名称">
          <el-input placeholder="请输入" v-model="form.contractName.value"></el-input>
        </el-form-item>
         <el-form-item label="科目一">
          <el-input placeholder="请输入" v-model="form.Aclass.value"></el-input>
        </el-form-item>
         <el-form-item label="科目二">
          <el-input placeholder="请输入" v-model="form.Bclass.value"></el-input>
        </el-form-item>
        <el-form-item label="金额(元)">
        <el-input-number
          size="small"
          v-model="form.money1.value"
          :controls="false"
          style="width: 30%"
        ></el-input-number
        >-
        <el-input-number
          size="small"
          v-model="form.money2.value"
          :controls="false"
          style="width: 30%"
        ></el-input-number>
      </el-form-item>
      </el-form>
      <dialog-button ok-btn="筛 选" reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import { mapState, mapActions } from "vuex";
  export default {
    components: {
      
    },
    
    props: {
      title:'',
      width:{
        type:String,
        default:'30%'
      },
      loadData:{
        type: Object,
        default: ()=>{
          return {}
        }
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          createTime1:{key:'createTime',value:'',op:CekinFunction.morethanequOP,types:'date'},
          createTime2:{key:'createTime',value:'',op:CekinFunction.lessthanequOP,types:'date'},
          org:{key:'orgName',value:'',op:CekinFunction.equOP},
          createby:{key:'createBy',value:'',op:CekinFunction.equOP},
          payType:{key:'Status',value:'',op:CekinFunction.equOP},
          summoney1:{key:'SumMoney',value:'',op:CekinFunction.morethanequOP,types:'float'},
          summoney2:{key:'SumMoney',value:'',op:CekinFunction.lessthanequOP,types:'float'},
          auditTime1:{key:'auditTime',value:'',op:CekinFunction.morethanequOP,types:'date'},
          auditTime2:{key:'auditTime',value:'',op:CekinFunction.lessthanequOP,types:'date'},
          contractId:{key:['children','contractId'],value:'',op:CekinFunction.equOP},
          contractName:{key:['children','contractName'],value:'',op:CekinFunction.equOP},
          Aclass:{key:['children','Aclass'],value:'',op:CekinFunction.equOP},
          Bclass:{key:['children','Bclass'],value:'',op:CekinFunction.equOP},
          money1:{key:['children','expense'],value:'',op:CekinFunction.morethanequOP,types:'float'},
          money2:{key:['children','expense'],value:'',op:CekinFunction.morethanequOP,types:'float'}
        },
       optionProps: {
                        value: "keyid",
                        label: "label",
                        children: "children",
                        emitPath: false
                }

      }
    },
    //生命周期函数节点
    created() {
    },
    computed: {
    ...mapState({
      orgTree: (state) => state.loadType.organizeList // state.orgAndPost.orgTree
    })
    },
    //自定义函数节点
    methods: {
      openDialog(){
        this.dialogVisible=true;
        this.$nextTick(()=>{
          this.form={
            createTime1:{key:'createTime',value:'',op:CekinFunction.morethanequOP,types:'date'},
          createTime2:{key:'createTime',value:'',op:CekinFunction.lessthanequOP,types:'date'},
          org:{key:'orgName',value:'',op:CekinFunction.equOP},
          createby:{key:'createBy',value:'',op:CekinFunction.equOP},
          payType:{key:'Status',value:'',op:CekinFunction.equOP},
          summoney1:{key:'SumMoney',value:'',op:CekinFunction.morethanequOP,types:'float'},
          summoney2:{key:'SumMoney',value:'',op:CekinFunction.lessthanequOP,types:'float'},
          auditTime1:{key:'auditTime',value:'',op:CekinFunction.morethanequOP,types:'date'},
          auditTime2:{key:'auditTime',value:'',op:CekinFunction.lessthanequOP,types:'date'},
          contractId:{key:['children','contractId'],value:'',op:CekinFunction.equOP},
          contractName:{key:['children','contractName'],value:'',op:CekinFunction.equOP},
          Aclass:{key:['children','Aclass'],value:'',op:CekinFunction.equOP},
          Bclass:{key:['children','Bclass'],value:'',op:CekinFunction.equOP},
          money1:{key:['children','expense'],value:'',op:CekinFunction.morethanequOP,types:'float'},
          money2:{key:['children','expense'],value:'',op:CekinFunction.morethanequOP,types:'float'}
          }
        })
      },
      dialogClose(){
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
      },
      submitFormData(){
        const keys = Object.keys(this.form);
      const queryForm = keys.map((s) => {
        return this.form[s];
      });
      var myfilterData = this.$myfunction.deepClone(queryForm);    
      this.$emit("getFormData", myfilterData);
        this.dialogClose()
      },
     
    }
  }
</script>
<style lang='less' scoped>

</style>
