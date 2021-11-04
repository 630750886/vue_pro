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
          prop="isocName"
          label="协会名称"
          show-overflow-tooltip
          width="240"
          fixed="left"
        ></el-table-column>
        <el-table-column prop="isocUrl" show-overflow-tooltip label="链接" width="60">
          <template slot-scope="scope">
            <el-link :href="scope.row.isocUrl" target="_blank">{{scope.row.isocUrl}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="isocUserName"
          label="用户名"
          show-overflow-tooltip
          width="187"
        ></el-table-column>
        <el-table-column prop="isocPW" show-overflow-tooltip label="密码" width="60"></el-table-column>
        <el-table-column
          prop="isocDesc"
          label="网站使用简要简介"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="phones" label="手机绑定情况" width="82">
          <template slot-scope="scope">
             <el-popover trigger="click" placement="top">
              <p>机主：{{scope.row.phoneperson}}</p>
              <p>手机号：{{scope.row.phonecode}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="costs" label="会费" border width="50">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table
                :data="scope.row.costs"
                border="">
                <el-table-column
                  prop="costBeginDate"
                  label="缴费时间"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="isoccostSum"
                  label="会费/元"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="isocCostAttachFile"
                  label="凭证" width="60">
                  <template slot-scope="scope">
                      <download-button :value="scope.row.isocCostAttachFile"></download-button>
                  </template>
                </el-table-column>
              </el-table>
            <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px" fixed="right">
          <template slot-scope="scope">
            <el-col :span="12"><el-button v-if="btnListIndexOf('DENG1JI')" type="primary" plain size="mini" @click="$refs.upRef.openDialog(scope.row)">登记</el-button></el-col>
            <el-col :span="12" ><el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delSociety(scope.row)">删除</el-button></el-col>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <society-info-dialog
        title=""
        ref="upRef"
        @getFormData="upsociety"
      ></society-info-dialog>
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
import TableButton from "../button/PhoneTableButton.vue";
import SocietyInfoDialog from "../dialog/SocietyInfoDialog.vue";
import ElPopoverTemplate from "../../../acomponents/ElPopoverTemplate.vue";
import * as Messageisoc from "@/api/administration/Messageisoc.js"
import * as MessageisocCost from "@/api/administration/MessageisocCost.js"
export default {
  components: {
    TableButton,
    SocietyInfoDialog,
    ElPopoverTemplate
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type:Object ,
      default: () => {
        return {};
      }
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      phoneInfo: [
        { label: "机主", prop: "" },
        { label: "手机号", prop: "" }
      ],
      societyMoneyInfo: [
        { label: "缴纳时间", prop: "" },
        { label: "会费/元", prop: "" },
        { label: "缴纳证明材料", prop: "" }
      ]
    };
  },
  //生命周期函数节点
  created() {
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
    //删除
    delSociety(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Messageisoc.deletes_object({keyid:data.keyid}).then(res => {
          this.$emit('updataListisoc');
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
    upsociety(data)
    {
      console.log(data);
      MessageisocCost.deletesby_object({isockeyid:data.keyid}).then(item=>{
        if (item.code === 200) {
            console.log("清理！");
        console.log(data.costs.length);
        data.costs.forEach(element => {
            MessageisocCost.adds_object(element).then(item=>{
                    if (item.code === 200) {
                      console.log("新增会费完成！");
                    }
                  });
         });
       Messageisoc.edits_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("编辑完成!");
        }
      });
      }
    });
    },
    tableButtonClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.upRef.openDialog();
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
  color: #000;
}
</style>
