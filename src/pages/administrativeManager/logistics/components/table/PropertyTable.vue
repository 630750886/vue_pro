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
        <!-- <el-table-column prop="" label="房屋用途" align="center"></el-table-column> -->
        <el-table-column
          prop="ownerName"
          label="房东姓名"
        ></el-table-column>
<!--        <el-table-column prop="ownerCardID" label="房东身份证" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <download-button :value="scope.row.ownerCardIDFile">下载</download-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="ownerPhone"
          label="房东电话"
        ></el-table-column>
        <el-table-column
          prop="propertyAddress"
          show-overflow-tooltip
          label="房屋落址"
        ></el-table-column>
        <el-table-column label="相关缴费号" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>水费号：{{scope.row.propertyWaterCode}}</p>
              <p>电费号：{{scope.row.propertyElectricCode}}</p>
              <p>燃气号：{{scope.row.propertyGasCode}}</p>
              <p>网络号：{{scope.row.propertyNetCode}}</p>
              <p>座机号：{{scope.row.propertyPhoneCode}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="ownerConTractAttachFile" label="租赁合同">
          <template slot-scope="scope">
            <download-button :value="scope.row.ownerConTractAttachFile">下载</download-button>
          </template>
        </el-table-column>
        <el-table-column
          label="有效期时间"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.ownerConTractBeginDate|datefmt('YYYY/MM/DD')}}
        </template>
        </el-table-column>
        <el-table-column
            label="有效期结束"
            align="center"
        >
          <template slot-scope="scope">
            {{scope.row.ownerConTractEndDate|datefmt('YYYY/MM/DD')}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="135px">
          <template slot-scope="scope">
<!--    <table-button :scope="scope.row" @click="tableButtonClick"></table-button>-->
            <el-button type="primary" plain size="mini"  @click="$refs.updateRef.openDialog(scope.row)">登记</el-button>
            <el-button type="primary" plain size="mini"  @click="delProperty(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <update-property-dialog
        title="修改"
        ref="updateRef"
        @getFormData="updateproperty"
      ></update-property-dialog>
    </div>
    <!--分页 -->
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import UpdatePropertyDialog from "../dialog/UpdatePropertyDialog.vue";
import * as preperty from "@/api/administration/Property.js"

export default {
  components: {
    TableButton,
    UpdatePropertyDialog
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type: Object,
    }
  },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    // 删除
    delProperty(data){
      console.log(data);
      this.$confirm(`此操作将永久删除${data.ownerName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        preperty.deletes_object({keyid:data.keyid}).then(res =>{
          this.$message.success("删除成功!");

          this.$emit("updataProperty",this.pageShow);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("updataProperty", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("updataProperty", this.pageShow);
    },
    updateproperty(data){
      preperty.edits_object(data).then(item=>{
            if (item.code === 200) {
                    this.$message.success("修改完成!");
                  }
            });
    },
  //   tableButtonClick(btn,data) {
  //   switch (btn) {
  //     case 1:
  //       this.$refs.updateRef.openDialog(data);
  //       break;
  //     case 2:
  //       break;
  //     case 3:
  //       break;
  //   }
  // }
}
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
