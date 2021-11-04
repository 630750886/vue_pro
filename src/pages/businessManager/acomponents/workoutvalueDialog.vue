<template>
    <div class="workgroup">
    <div class="head-button" style="height: 30px;line-height: 30px">
      <public-button name="CHAN3ZHI2TIAN2BAO4SHAN1CHU" title="项目总产值填报" @click="projectdialogVisible=true"></public-button>
      <public-button name="CHAN3ZHI2TIAN2BAO4SHAN1CHU" icon="el-icon-plus" title="月产值填报" @click="monthdialogVisible=true"></public-button>
    </div>
     <div class="baseinfo">
      <span>合同编号：{{basedataov.contractCode}}</span><br>
      <span>合同名称：{{basedataov.contractName}}</span><br>
      <span>合同总产值(元)：{{basedataov.contractbase.contractSum}}</span><br>
      <span>项目编号：{{basedataov.projectCode}}</span><br>
      <span>项目名称：{{basedataov.projectName}}</span><br>
      <span>项目总产值(元)：{{basedataov.projectSum}}</span><br>
      <span>项目完成产值(元)：{{basedataov.outputValueSum}}</span>
    </div>
    <div class="eltable">
      <el-table
      :data="basedataov.cmprojectOutputValuelist"
      border
      align="left">
    <el-table-column
      prop="outputValueAccomplishDateTime"
      label="填报时间"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="createddateTime"
      label="产值完成时间"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="projectOutputValue"
      label="完成产值(元)"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="projectOutputValueDesc"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column  width="200px" align="center" label="操作">
       <template slot-scope="scope">
            <public-button classhd="hd" :plain="true" type="primary" name="CHAN3ZHI2TIAN2BAO4SHAN1CHU" title="备注" @click="changeDesc(scope.row)" ></public-button>
             <public-button classhd="hd" :plain="true" type="primary" name="CHAN3ZHI2TIAN2BAO4SHAN1CHU" title="删除"  @click="deloutvalue(scope.row)"></public-button>
       </template>
    </el-table-column>
  </el-table>
    </div>
    <div class="dialog">
      <el-dialog
        title="项目总产值："
        :visible.sync="projectdialogVisible"
        v-if="projectdialogVisible"
        width="25%"
        :before-close="handleClose"
        :close-on-click-modal="false"
        append-to-body>
        <el-input-number v-model="projectvalue" @change="handleChange" :min="1" :max="90000000" label="" :controls="false"></el-input-number>
        <dialog-button v-if="true" reset-btn="false"  :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
      </el-dialog>
       <el-dialog
        title="产值"
        :visible.sync="monthdialogVisible"
        v-if="monthdialogVisible"
        width="25%"
        :before-close="handleClose"
        append-to-body
        :close-on-click-modal="false">
        <el-form ref="outvalue" :model="outvalue" label-width="80px">
          <el-form-item label="填报时间">
            <el-date-picker
            v-model="outvalue.outputValueAccomplishDateTime"
            type="month"
            value-format="yyyy/MM"
            format="yyyy/MM"
            placeholder="填报时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="完成产值(元)">
            <el-input-number v-model="outvalue.projectOutputValue" :controls="false"></el-input-number>
          </el-form-item>
        </el-form>
        <dialog-button v-if="true" reset-btn="false"  :cancelBtn="{show:false}" @okBtn="submitFormout" @cancelBtn="dialogClose"></dialog-button>
      </el-dialog>
       <el-dialog
        title="产值"
        :visible.sync="descdialogVisible"
        v-if="descdialogVisible"
        width="25%"
        :before-close="handleClose"
        append-to-body
        :close-on-click-modal="false">
        <span>备注</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="descdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="descdialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as project from "@/api/webapi-business.js"
import * as proservice from "@/api/webapi-itemWorkGroup.js"
export default {
   name:"workoutvalue",
   props: {
        basedataov:{}
    },
    data(){
      return {
        projectdialogVisible:false,
        monthdialogVisible:false,
        descdialogVisible:false,
        projectvalue:0,
        form:{
        },
        outvalue:{
          projectKeyid:'',
          projectName:'',
          outputValueAccomplishDateTime:'',
          projectOutputValue:0
        }
      }
    },
    mounted(){
      console.log(this.basedataov);
    },
    methods:{
      changeDesc(data){

      },
      submitFormout()
      {
        this.outvalue.projectKeyid=this.basedataov.projectKeyid;
        this.outvalue.projectName=this.basedataov.projectName;
        proservice.addoutvalue(this.outvalue).then(item=>{
          if (item.code===200)
          {
              this.$message("更新成功!");
              this.basedataov.cmprojectOutputValuelist.push(item.data);
              this.monthdialogVisible=false;
          }
        });
      },
      submitForm(){
        this.basedataov.projectSum=this.projectvalue;
        project.upItem(this.basedataov).then(item=>{
          if (item.code===200)
          {
              this.$message("更新成功!");
          }
        });
        this.projectdialogVisible=false;
      },
      deloutvalue(data)
      {
        this.$confirm(
        "此操作将删除项目月产值数据,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
          proservice.deloutvalue(data).then(item=>{
          if (item.code===200)
          {
              this.$message("删除成功");
              this.basedataov.cmprojectOutputValuelist.remov;
          }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }
    }
}
</script>
<style lang='less' scoped>
.baseinfo{
  margin: 10px 2px;
  padding:2px;
  color: #746c6c;
  width: 98%;
  border: 1px solid #bbbbbd;
}
.eltable{
  width: 80%;
}
.dialog{
  .el-input-number{
    .el-input__inner
    {
      text-align: left!important;
    }
  }
}
</style>