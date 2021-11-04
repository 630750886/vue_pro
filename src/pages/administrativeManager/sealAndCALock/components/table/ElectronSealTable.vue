<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="center"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="electronicSealName"
          label="电子印章名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="electronicSealTypeName" label="电子印章类型" align="center">
        </el-table-column>
        <el-table-column prop="engineerName" label="工程师" align="center">
        </el-table-column>
        <el-table-column label="电子印章使用的网站" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>网站名称：{{scope.row.electronicSealWebName}}</p>
              <p>
                地址：<el-link :href="scope.row.electronicSealWebUrl" target="_blank">{{scope.row.electronicSealWebUrl}}</el-link>
              </p>
              <p>用户名：{{scope.row.electronicSealWebUserName}}</p>
              <p>密码：{{scope.row.electronicSealWebUserPassWord}}</p>
              <p>网站简要介绍：{{scope.row.electronicSealWebDesc}}</p>
              <p>机主：{{scope.row.electronicSealWebPhonePerson}}</p>
              <p>手机号：{{scope.row.electronicSealWebPhonCode}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="electronicSealBeginDate"
          label="印章启用时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="electronicSealBeginDocumentFile" label="启用相关证明材料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.electronicSealBeginDocumentFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="electronicSealEndDate"
          label="印章停用时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="electronicSealEndDocumentFile" label="停用相关证明材料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.electronicSealEndDocumentFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="iscost" label="是否产生使用费" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.iscost">
              <el-popover trigger="click" placement="top">
                <p>使用费/元: {{scope.row.caCostSum}}</p>
                <div slot="reference">
                  <el-tag size="medium">是</el-tag>
                </div>
              </el-popover>
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="印章使用有效期"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.beginDate}}-{{scope.row.endDate}}
        </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableButtonClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <electron-seal-dialog
        ref="upRef"
        title="修改电子印章"
        @getFormData="editdata"
      ></electron-seal-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import ElPopoverTemplate from "../../../acomponents/ElPopoverTemplate.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import ElectronSealDialog from "../dialog/ElectronSealDialog.vue";
import * as AigElectronicSeal from "@/api/administration/AigElectronicSeal.js"
export default {
  components: {
    TableButton,
    ElPopoverTemplate,
    TextButton,
    ElectronSealDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [
          {
            type: "新增"
          },
          {
            type: "申请"
          }
        ];
      }
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
    editdata(data)
    {
      AigElectronicSeal.edits_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("编辑成功!");
        }
      });
    },    
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.upRef.openDialog(data);
          break;
        case 2:
          this.editdata(data);
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
}
</style>
