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
          prop="caLockName"
          label="CA锁名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="caLockTypeName"
          label="CA锁类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="caLockPersonName"
          label="CA锁管理人"
          align="center"
        ></el-table-column>
        <el-table-column label="CA锁使用的网站" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>网站名称：{{scope.row.caLockWebName}}</p>
              <p>
                链接：<el-link :href="scope.row.caLockWebUrl" target="_blank">{{scope.row.caLockWebUrl}}</el-link>
              </p>
              <p>用户名：{{scope.row.caLockWebUserName}}</p>
              <p>密码：{{scope.row.caLockWebUserPassWord}}</p>
              <p>网站简要介绍：{{scope.row.caLockWebDesc}}</p>
              <p>机主：{{scope.row.caLockWebPhonePerson}}</p>
              <p>手机号：{{scope.row.caLockWebPhonCode}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="caLockBeginDate"
          label="印章启用时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="caLockBeginDocumentFile" label="启用相关证明材料" align="center">
          <template slot-scope="scope">
                <download-button :value="scope.row.caLockBeginDocumentFile"></download-button>
            </template>
        </el-table-column>
        <el-table-column
          prop="caLockEndDate"
          label="印章停用时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="caLockEndDocumentFile" label="停用相关证明材料" align="center">
          <template slot-scope="scope">
                <download-button :value="scope.row.caLockEndDocumentFile"></download-button>
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

        <el-table-column label="绑定手机情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>机主:{{scope.row.caLockWebPhonePerson}}</p>
              <p>手机号:{{scope.row.caLockWebPhonCode}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
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
      <ca-lock-dialog title="修改CA锁信息" ref="upRef"  @getFormData="editdata"></ca-lock-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import CaLockDialog from "../dialog/CALockDialog.vue";
import * as AigCaLockInfo from "@/api/administration/AigCaLockInfo.js"

export default {
  components: {
    TableButton,
    TextButton,
    CaLockDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
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
      AigCaLockInfo.edits_object(data).then(item=>{
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
