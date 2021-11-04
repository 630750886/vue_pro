<template>
 <div class="workgroup">
    <div class="head-button" style="height: 35px;line-height: 35px">
      <public-button name="REN2YUAN2XIN1JIAN4BIAN4GENG" icon="el-icon-plus" title="新建"   @click="$refs.addChangeRef.openDialog(workjobcurr)"></public-button>
    </div>
    <div class="eltable">
      <el-table ref="tableRef" row-key="keyid" :data="basedatagp.groupWorks" :show-header="false" @expand-change="tableExpandChange" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <expand-table :pkeyid="scope.row.keyid"></expand-table>
          </template>
        </el-table-column>
        <el-table-column prop="projectJobName" min-width="150px" align="left">
          <template slot-scope="scope">
            {{scope.row.projectJobName}}：{{scope.row.projectPersonName}}
          </template>
        </el-table-column>
        <el-table-column min-width="200px">
          <template slot-scope="scope">
            <template v-if="scope.row.projectJobName==='其他人员'">
              <el-col :span="4">工作备注</el-col>
              <el-col :span="20">{{scope.row.jobDesc}}</el-col>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="workItemName" min-width="100px" align="right">
          <template slot-scope="scope">
            <public-button classhd="hd" :plain="true" type="primary" name="REN2YUAN2XIN1JIAN4BIAN4GENG" title="变更人员" @click="openChangePerson(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-person-dialog ref="addChangeRef" width="40%" @getFormData="submitAddFormData"></add-person-dialog>
      <change-person-dialog ref="upChangeRef" width="40%" @getFormData="submitUpFormData"></change-person-dialog>
    </div>
  </div>
</template>
<script>
import * as proservice from "@/api/webapi-itemWorkGroup.js"
import AddPersonDialog from './groupDialog/AddPersonDialog.vue'
import ChangePersonDialog from './groupDialog/ChangePersonDialog.vue'
import expandTable from "./ExpandTable.vue"
export default {
    name:"workgroup",
    props: {
        basedatagp:{}
    },
    components: {
      AddPersonDialog,
      ChangePersonDialog,
      expandTable
    },
    data(){
      return{
      workgroup:[],
      workjobinfo:[],
      workjobcurr:[]
      }
    },
    created(){
       this.getjobinfo(this.basedatagp.contractVocationalTypeCode);
       this.workgroup=this.basedatagp.groupWorks;
       console.log(this.workgroup);
    },
    methods:{
      getarrnew(jobinfo,workgp){
        //取得工作中唯一职务的信息煺组;
        //projectJobKeyid  projectJobName
        let tempjob=[];
        let flage=false;
        let nworkgp=workgp.filter(item=>{ return item.projectJobPnumber==="uq"});
        if (nworkgp.length>0)
        {
          for(let item in jobinfo)
          {
            flage=false;
            for(let value in nworkgp)
            {
              if (nworkgp[value].projectJobKeyid===jobinfo[item].keyid)
                {
                  flage=true;
                  break;
                }
            }
            if (!flage) tempjob.push(jobinfo[item]);
          }
          this.workjobcurr=tempjob;
        }
        else
        {
          this.workjobcurr=jobinfo;
        }
      },
      getjobinfo(vcode)
      {
          this.javaHttp("systypelist/findbycode",{code:vcode}).then(item=>{
            if (item.code === 200) {
              this.workjobinfo=item.data;
              this.getarrnew(this.workjobinfo,this.basedatagp.groupWorks);
            } else {
               this.$message.error(item.message);
            }
          }).catch(error=>{
             this.$message.error(error);
          });
      },
      submitAddFormData(data){
        data.projectKeyid=this.basedatagp.keyid,
        data.projectCode=this.basedatagp.projectCode,
        data.projectName=this.basedatagp.projectName,
        proservice.addWorkGroup(data).then(item=>{
          if (item.code === 200) 
          {
            this.basedatagp.groupWorks.push(item.data);
            this.getarrnew(this.workjobinfo,this.basedatagp.groupWorks);
          }
          else
          {
            this.$message.error(item.message);
          }
        });
      },
      openChangePerson(data){
         this.$refs.upChangeRef.openDialog(data);
      },
      submitUpFormData(data){
        data.keyid="";
        proservice.addWorkGroup(data).then(repitem=>{
          if(repitem.code===2000)
          {
            this.$message.success('添加成功')
          }
        });
      }
    },
}
</script>
<style lang='less' scoped>
.workgroup{
    margin: 0px;
    padding:0px;
}
.eltable{
  width: 58%;
}
</style>