<template>
  <div>
    <div class="table">
      <el-table
        ref="tableRef"
        :data="dataList"
        style="width: 100%"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="tradingPlatformname"
          label="网站名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="tradingPlatformUrl"
          label="网站"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="tradingPlatformUser"
          label="用户名"
        ></el-table-column>
        <el-table-column
          prop="tradingPlatformpd"
          label="密码"
        ></el-table-column>
        <el-table-column
          prop="tradingPlatformopfile"
          label="办事流程图"
        >
          <template slot-scope="scope">
            <download-button
              :value="scope.row.tradingPlatformopfile"
            ></download-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300px"
          fixed="right"
        >
          <template slot-scope="scope">
            <public-button
              name="WANG3ZHAN4XIN1JIAN4XIU1GAI3SHAN1CHU"
              title="修改"
              classhd="hd" :plain="true" type="primary"
              @click="$refs.upRef.openDialog(scope.row)"
            ></public-button>
            <delete-button
              v-if="btnListIndexOf('WANG3ZHAN4XIN1JIAN4XIU1GAI3SHAN1CHU')"
              :data="scope.row"
              @click="networkDelData"
            ></delete-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <platform-dialog
        ref="upRef"
        @getFormData="networkUpData"
      ></platform-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import PlatformDialog from "../dialog/PlatformDialog.vue";
import {
  getPlatformWebsite,
  addPlatformWebsite,
  delPlatformWebsite,
  upPlatformWebsite
} from "../../../../../api/webapi-bidRecord.js";
export default {
  components: {
    PlatformDialog
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {
      dataList: []
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetDataList();
  },
  //自定义函数节点
  methods: {
    networkGetDataList() {
      getPlatformWebsite({}).then(item => {
        this.dataList = item.data;
      });
    },
    networkUpData(formData) {
      upPlatformWebsite(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDataList();
        }
      });
    },
    networkDelData(formData) {
      delPlatformWebsite(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDataList();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
