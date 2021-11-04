<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="beginDateTime"
          label="活动举办时间"
          width="85"
          fixed="left"
        >
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="活动名称"
          width="220"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="activityTypeName"
          label="类型"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="activityMain"
          label="主办方名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="activityAddress"
          label="活动举办地点"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          prop="activityPersonSum"
          label="活动规模(人)"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          label="人员"
          align="center"
          width="45"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="300" trigger="click">
              <div>公司活动负责人:{{scope.row.activityLeading}}
                <div v-for="item in scope.row.assists" :key="item.keyid">
                  <p>协助人员:{{item.assistPersonName}} 协助工作:{{item.assistPersonContant}}</p>
                </div>
              </div>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="奖项" align="center" width="45">
          <template slot-scope="scope">
            <el-popover placement="bottom" width="300" trigger="click">
              <el-table :data="scope.row.attachFilePrize" border>
                <el-table-column
                    label="奖项名称"
                    prop="activityAttachName"
                ></el-table-column>
                <el-table-column label="附件" prop="activityAttachFile">
                  <template slot-scope="scope">
                    <download-button :value="scope.row.activityAttachFile">下载</download-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="合同"
          align="center"
          width="45"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="400" trigger="click">
              <el-table :data="scope.row.attachFileContract" border>
                <el-table-column
                  label="合同编号"
                  width="130"
                  prop="activityAttachCode"
                ></el-table-column>
                <el-table-column
                  label="合同名称"
                  prop="activityAttachTypeName"
                ></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="图片资料" align="center" width="70">
          <template slot-scope="scope">
            <download-button :value="scope.row.activityDocumentFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100"
        >
          <template slot-scope="scope">
            <public-button
              name="DENG1JI"
              title="登记"
              classhd="hd" :plain="true" type="primary"
              @click="$refs.updateRef.openDialog(scope.row)"
            ></public-button>
            <public-button name="SHAN1CHU" classhd="hd" :plain="true" type="primary" title="删除"  @click="delActivity(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <update-activity-dialog ref="updateRef" @getFormData="editactivity"></update-activity-dialog>
    </div>
    <!--分页 -->
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    >
    </pagination>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import UpdateActivityDialog from "../dialog/UpdateActivityDialog.vue";

import * as activity from "@/api/administration/ActivityInfo.js"
import * as ActivityAssist from "@/api/administration/ActivityAssist.js"
import * as ActivityAttachFile from "@/api/administration/ActivityAttachFile.js"
import { GetHttp } from "../../../../../utils/http";

export default {
  components: {
    TableButton,
    UpdateActivityDialog
  },
  props: {
    dataList:{
         type:Object,
         default:()=>{
           return {}
         }
    },
    pageShow:{
      type:Object ,
      default: () => {
        return {};
      },
    },
  },
  watch: {},
  //数据节点
  data() {
    return {
      form:{
        keyid:'',
        activityName:'',
        activityTypeKeyId:'',
        activityTypeName:'',
        activityMain:'',
        activityAddress:'',
        beginDateTime:'',
        endDateTime:'',
        activityLong:'',
        activityPersonSum:'',
        activityLeading:'',
        activityDocumentFile:'',
        activitySum:'',
        iscontract:false,
        isprize:false,
        Assists:[],
        attachFileContract:[],
        attachFilePrize:[],
      },
      Assist:{
        activityKeyId:'',
        assistPersonKeyId:'',
        assistPersonName:'',
        assistPersonContant:'',
        assistresults:''
      },
      AttachFile:{
        activityKeyId:'',
        activityAttachTypeKeyId:'',
        activityAttachTypeName:'',
        activityAttachCode:'',
        activityAttachName:'',
        activityAttachFile:''
      }
    };
  },
  //生命周期函数节点
  created() {
    GetHttp(
      "java_post",
      "hr/basicinfo/autofindwhere",
      "post",
      Object.assign({},{} )
    ).then(item => {
      console.log(item.data)
    });
  },
  //自定义函数节点
  methods: {
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    //删除数据
    delActivity(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        activity.deletes_object({keyid:data.keyid}).then(res => {
          this.$emit("updataActivity");
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editactivity(data){
        console.log(data)
        let acpass={activityKeyId:data.keyid};
        console.log(acpass);
        //bydeletes_object
        ActivityAssist.bydeletes_object(acpass).then(item=>{
           if (item.code === 200) {
              data.assists.forEach(element => {
                            ActivityAssist.adds_object(element).then(item=>{
                            if (item.code === 200) {
                              this.$message.success("添加成功!");
                              //this.dataList=item.data;
                            }
                        });
               });
              }
         });

        let acpassfile={activityKeyId:data.keyid,activityAttachTypeKeyId:"001"};
        ActivityAttachFile.bydeletes_object(acpassfile).then(item=>{
            if (item.code === 200) {
              console.log("attach 001");
              data.attachFileContract.forEach(element => {
               ActivityAttachFile.adds_object(element).then(item=>{
              if (item.code === 200) {
                this.$message.success("变更成功!");
                //this.dataList=item.data;
              }
            });
          });
                  }
            });
          let acpassfilep={activityKeyId:data.keyid,activityAttachTypeKeyId:"002"};
          ActivityAttachFile.bydeletes_object(acpassfilep).then(item=>{
            if (item.code === 200) {
              console.log("attach 002");
              data.attachFilePrize.forEach(element => {
               ActivityAttachFile.adds_object(element).then(item=>{
              if (item.code === 200) {
                this.$message.success("变更成功!");
                //this.dataList=item.data;
              }
            });
          });
        }
          });
      activity.edits_object(data).then(item=>{
              if (item.code === 200) {
                this.$message.success("变更成功!");
                //this.dataList=item.data;
              }
            });
    },
    tableButtonClick(btn, data) {
      switch (btn) {
        case 1:
          // this.$refs.updateRef.openDialog(data);
          break;
        case 2:
          // this.delActivity(data)
          break;
        case 3:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
  .beginDateTime{
    cursor:pointer;
    color: #009bff;
  }
</style>
