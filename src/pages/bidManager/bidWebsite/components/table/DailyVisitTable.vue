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
          prop="sourceName"
          label="网站名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sourceUrl"
          label="网站"
        ></el-table-column>
        <el-table-column
          prop="oparetionPerson"
          label="浏览负责人"
        ></el-table-column>
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
      <website-dialog ref="upRef" @getFormData="networkUpData"></website-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import WebsiteDialog from "../dialog/WebsiteDialog.vue";
import {
  getBrowseWebsite,
  upBrowseWebsite,
  delBrowseWebsite
} from "../../../../../api/webapi-bidRecord.js";
export default {
  components: {
    WebsiteDialog
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
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.$refs.upRef.openDialog(data);
          break;
        case 2:
          this.networkDelData(data);
          break;
        case 3:
          break;
      }
    },
    networkGetDataList() {
      getBrowseWebsite({}).then(item => {
        this.dataList = item.data;
      });
    },
    networkUpData(formData) {
      upBrowseWebsite(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDataList();
        }
      });
    },
    networkDelData(formData) {
      delBrowseWebsite(formData).then(item => {
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
