
<template>
  <el-dialog
    :visible.sync="isVisible"
    title="修改环节"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <el-form
      ref="searchform"
      :model="mydata"
      label-width="120px"
      style="margin:10px;width:auto;"
    >
      <el-form-item prop="nodeName" label="环节名称:">
        <el-input type="text" v-model="mydata.nodeName"></el-input>
      </el-form-item>

      <el-form-item prop="ExecuteId" label="执行人员:">
        <el-select v-model="mydata.ExecuteId" placeholder="请选择">
          <el-option
            v-for="item in scopes"
            :key="item.loginName"
            :label="item.userName"
            :value="item.loginName"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getAllPerson } from "../../../api/webapi-flow";
export default {
  name: "allVersion",
  data() {
    return {
      tableHeight: "250px",
      isVisible: this.isShow,
      scopes: []
    };
  },
  props: {
    mydata: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  mounted() {
    this.getallperson();
  },
  methods: {
    getallperson() {
      getAllPerson().then(res => {
        this.scopes = res;
      });
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    onSubmit() {
     // let da = typeof mydata == "undefined" ? {} : mydata;
      this.$emit("onSubmit");
    }
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}
.btnRight {
  float: right;
  margin-right: 0px !important;
}
.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
  padding: 18px 18px 0;
}
</style>