<template>
    <div>
        <el-form ref="changform" :model="form" label-width="100px">
            <el-form-item label="合同编号" prop="contractCode">
          <rea-query-input
            v-model="form.contractCode"
            url="agr/busicontractbase/findwhere"
            :filter-obj="{ contractTypeKeyId: form.contractTypeCode }"
            filter-key="contractCode"
            @getObject="
              item => {
                form.contractName = item.contractName;
                form.contractKeyid = item.keyid;
              }
            "
          ></rea-query-input>
        </el-form-item>
        <el-form-item label="合同名称" prop="contractName">
          <el-input v-model="form.contractName" readonly></el-input>
        </el-form-item>
        <el-form-item label="新合同名号" prop="contractName">
          <el-input v-model="form.newcontractcode"></el-input>
        </el-form-item>

        <el-form-item label="合同归属" prop="contractName">
          <el-cascader
                ref="vestinref"
                :options="roleOrgTree"
                :props="{checkStrictly:true,value:'keyid',label:'label',children:'children'}"
                clearable
                :show-all-levels="false"
                @change="getorginfo"></el-cascader>
        </el-form-item>
        <el-form-item label="合同完成状态" prop="contractName">
           <el-radio v-model="form.allstatuscode" label="2">已完成合同任务！</el-radio>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改合同号</el-button>
            <el-button type="primary" @click="upcontractinfo">修改合同归属</el-button>
            <el-button type="primary" @click="upcontractstatus">修改合同状态</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:"changeCode",
    //数据节点
  data() {
    return {
        form: {
          keyid:"",
          contractTypeCode:"",
          contractName:"",
          contractKeyid:"",
          contractCode:"",
          newcontractcode:"",
          studyOutOrgKeyid:"",
          studyOutOrgName:"",
          allstatuscode:"",
          allstatusname:""
        },
        roleOrgTree: [],
    };
  },
  mounted(){
    this.get_orgtreeinfo();
  },
  methods:{
    getorginfo(orgnode)
      {
         let mynode=this.$refs.vestinref.getCheckedNodes(false);
         this.form.studyOutOrgKeyid=mynode[0].value?mynode[0].value:"";
         this.form.studyOutOrgName=mynode[0].label?mynode[0].label:"";
         console.log(this.form);
        
      },
      upcontractinfo()
      {
        console.log(this.form);
        let neworg={
          keyid:this.form.contractKeyid,
          studyOutOrgKeyid:this.form.studyOutOrgKeyid,
          studyOutOrgName:this.form.studyOutOrgName
        }

        // /agr/busicontractbase/edits
        this.javaHttp("/agr/busicontractbase/edits", neworg).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
        } else {
          this.$message.success(item.message);
        }
        this.$refs.changform.resetFields();
      });
      },
      upcontractstatus(){
         let neworg={
          keyid:this.form.contractKeyid,
          allstatuscode:this.form.allstatuscode,
          allstatusname:"已完成！"
        }

        // /agr/busicontractbase/edits
        this.javaHttp("/agr/busicontractbase/edits", neworg).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
        } else {
          this.$message.success(item.message);
        }
        this.$refs.changform.resetFields();
      });
      },
      get_orgtreeinfo()
      {
        this.javaHttp("/sysorgs/findtree", {keyid:"0000"}).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.roleOrgTree = item.data;
        } else {
          this.$message.success(item.message);
        }
      });
      },
    onSubmit(){
        const newitem={
            contractcode:this.form.contractCode,
            newcontractcode:this.form.newcontractcode
        };
        console.log(newitem);
        this.$confirm(
        "此操作将（修改合同号）, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log(newitem);
          this.javaHttp("agr/busicontractbase/changcontractcode", newitem).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message);
            } else {
              this.$message.success(item.message);
            }
          });
          this.$refs.changform.resetFields();
        })
        .catch(() => {
          this.form.newcontractcode="";
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
}
</script>

<style lang="less" scoped>
</style>