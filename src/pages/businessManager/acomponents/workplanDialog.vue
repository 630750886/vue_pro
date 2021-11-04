<template>
    <div class="workgroup">
    <div class="head-button" style="height: 35px;line-height: 35px">
      <public-button name="JI4HUA4DIAO4ZHENG3WAN2CHENG2GUI1DANG" icon="el-icon-edit" title="拟定计划" v-if="basedatapl.cmworkPlanlist.length===0" @click="BtnClick(1,'{}')"></public-button>
    </div>
    <div class="eltable">
      <el-table
      ref="tableRef"
      :data="basedatapl.cmworkPlanlist"
      row-key="keyid"
      border
      align="left"
      default-expand-all
     :tree-props="{children: 'ncurrgroupWorks', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="begindateTime"
      label="计划开始时间"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="enddateTime"
      label="计划结束时间"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="changeDesc"
      label="调整原因"
      show-overflow-tooltip
      width="140px">
    </el-table-column>
    <el-table-column
      prop="accomplishdateTime"
      label="完成时间"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="placeonfiledateTime"
      label="归档时间"
      width="90px">
    </el-table-column>
    <el-table-column
      prop="changeDesc"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column  width="230px" align="center" label="操作">
        <template slot-scope="scope">
              <public-button classhd="hd" :plain="true" type="primary" name="FREE" title="备注" @click="BtnClick(3,scope.row)"></public-button>
              <public-button classhd="hd" :plain="true" type="primary" name="JI4HUA4DIAO4ZHENG3WAN2CHENG2GUI1DANG" title="调整" @click="BtnClick(2,scope.row)"></public-button>
              <public-button classhd="hd" :plain="true" type="primary" name="JI4HUA4DIAO4ZHENG3WAN2CHENG2GUI1DANG" title="完成申报" @click="BtnClick(4,scope.row)"></public-button>
              <public-button classhd="hd" :plain="true" type="primary" name="JI4HUA4DIAO4ZHENG3WAN2CHENG2GUI1DANG" title="归档申请" @click="BtnClick(5,scope.row)"></public-button>
          </template>
    </el-table-column>
  </el-table>
    </div>
    <div class="dialog">
      <addplandialog
        title=""
        width="30%"
        ref="addplanRef"
        @getFormData="addplan"
      ></addplandialog>
      <changeplandialog
        title=""
        width="30%"
        ref="changeplanRef"
        @getFormData="changplan"
      ></changeplandialog>
    </div>
  </div>
</template>
<script>
import addplandialog from "./planDialog/addPlanDialog.vue"
import changeplandialog from "./planDialog/changePlanDialog.vue"
import * as gop from "@/api/webapi-itemWorkGroup.js"
import * as editpro from "@/api/webapi-business.js"
export default {
    name:"workplanlist",
    components:{addplandialog,changeplandialog},
    props: {
        basedatapl:{}
    },
    methods:{

      BtnClick(btn, data){
        console.log(btn);
          switch (btn) {
            case 1:
              this.$refs.addplanRef.openDialog();
              break;
            case 2:
              this.$refs.changeplanRef.openDialog(data);
              break;
            case 3:
              break;
            case 4:
              break;
            case 5:
              break;
          }
      },
      addplan(data){
          data.projectKeyid=this.basedatapl.keyid;//项目编号
	        data.projectName=this.basedatapl.projectName;//项目名称
          gop.addWorkPlan(data).then(item=>{
            if (item.code === 200)
            {
               this.basedatapl.projectStatusKeyId="1";
               this.basedatapl.projectStatusName="进行中"
               editpro.upItem(this.basedatapl);
               this.basedatapl.cmworkPlanlist.push(item.data);
               this.$message.success("增加工作计划完成！")
            }
            else
            {
              this.$message.error("增加工作计划失败！")
            }
          });
      },
      changplan(data){

      }
    }
}
</script>
<style lang='less' scoped>
.eltable{
  width: 98%;
}
</style>