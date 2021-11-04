<template>
    <el-dialog
        title="项目所属组织"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
        :close-on-click-modal="false">
            <el-cascader
                ref="vestinref"
                :options="roleOrgTree"
                :props="{checkStrictly:true,value:'keyid',label:'label',children:'children'}"
                clearable
                :show-all-levels="false"
                @change="getorginfo"></el-cascader>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="upcontractinfo">确 定</el-button>
        </span>
        </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        form:{
            keyid:"",
            studyOutOrgKeyid:"",
            studyOutOrgName:""
        },
        roleOrgTree: [],
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getorginfo(orgnode)
      {
         let mynode=this.$refs.vestinref.getCheckedNodes(false);
         this.form.studyOutOrgKeyid=mynode[0].value?mynode[0].value:"";
         this.form.studyOutOrgName=mynode[0].label?mynode[0].label:"";
         console.log(this.form);
        
      },
      upcontractinfo()
      {
        // /agr/busicontractbase/edits
        this.javaHttp("/agr/busicontractbase/edits", this.form).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.dialogVisible = false;
          this.form={};
        } else {
          this.$message.success(item.message);
        }
      });
      },
      get_orgtreeinfo()
      {
        this.javaHttp("/sysorgs/findtree", {keyid:"0000"}).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.roleOrgTree = item.data;
          this.dialogVisible_data = true;
        } else {
          this.$message.success(item.message);
        }
      });
      },
      openDialog(data){
         this.form.keyid=data.keyid;
         this.form.studyOutOrgKeyid=data.studyOutOrgKeyid;
         this.form.studyOutOrgName=data.studyOutOrgName;
         this.get_orgtreeinfo();
         this.dialogVisible=true;
      }
    }
  };
</script>