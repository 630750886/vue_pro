<template>
  <div>
    <el-card ref="cardRef" class="el-scrollbar">
      <div class="head-button">
        <head-button @click="headButtonClick"></head-button>
      </div>
      <el-table
        :data="allTypeList.dataList"
        style="width: 100%;font-size:10px;"
        align="left"
        :fit="true"
        height="7.5rem"
        border
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
      >
        <el-table-column
          prop="code"
          label="分类编号"
          show-overflow-tooltip
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="keyid"
          label="明细编号"
          width="100px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="listname"
          label="明细名称"
          width="150px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column :prop="configName" :label="configName" show-overflow-tooltip width="100px">
          <template slot-scope="scope">
            {{ scope.row[configName] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="staticsCode"
          label="staticsCode"
        ></el-table-column>
        <el-table-column
          prop="contractCode"
          label="contractCode"
        ></el-table-column>
        <el-table-column
          prop="isplanitemtime"
          label="isplanitemtime"
        >
          <template slot-scope="scope">
            {{ scope.row.isplanitemtime }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableButtonClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageTotal="allTypeList.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </el-card>
    <div class="dialog">
      <config-dialog
        ref="configRef"
        width="300px"
        @getFormData="submitFormData"
      ></config-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "./button/TableButton.vue";
import HeadButton from "./button/TypeHeadButton.vue";
import ConfigDialog from "./dialog/ConfigDialog.vue";
import pagination from "../../../../components/pagination/index.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("sysType");
export default {
  components: {
    TableButton,
    HeadButton,
    ConfigDialog,
    pagination
  },
  props: {},
  watch: {
    clientHeight: function(newValue) {
      let _this = this;
      setTimeout(function() {
        _this.changeFix(newValue);
      }, 100);
    }
  },
  computed: {
    ...mapState({
      modelType: "currentModule"
    }),
    ...mapGetters({
      allTypeList: "allTypeList"
    })
  },
  //数据节点
  data() {
    return {
      clientHeight: "",
      configName: "urladdress",
      pageShow: {
        page: 1,
        limit: 30,
        filter: {}
      }
    };
  },
  //生命周期函数节点
  created() {},
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    /*window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };*/
    this.onWindowResize.add(() => {
      this.clientHeight = window.innerHeight;
    });
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkAddTypeList: "networkAddTypeList",
      networkDelTypeList: "networkDelTypeList",
      networkUpTypeList: "networkUpTypeList"
    }),
    changeFix(ch) {
      this.$refs.cardRef.$el.style.height = ch - 100 + "px";
    },
    handleCurrentChange(val) {
      this.pageShow.page = val;
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
    },
    headButtonClick(btn) {
      switch (btn) {
        case 1:
          this.addPosInfo();
          break;
        case 2:
          this.$refs.queryRef.openDialog();
          break;
      }
    },
    tableButtonClick(btn, data) {
      switch (btn) {
        case 1:
          this.upPosInfo(data);
          break;
        case 2:
          this.delPosInfo(data);
          break;
        case 3:
          this.$refs.configRef.openDialog(data);
          break;
      }
    },
    addPosInfo() {
      this.$prompt("请输入类型名称", "添加类型", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入类型名称");
          } else if (this.$myfunction.isEmpty(this.modelType.keyid)) {
            this.$confirm("请勾选左边模块", "提示", {
              confirmButtonText: "确定",
              type: "info"
            });
          } else {
            let form = Object.assign(
              {},
              {
                typekeyid: this.modelType.keyid,
                listname: value,
                code: this.modelType.code
              }
            );
            this.networkAddTypeList(form);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    upPosInfo(oldData) {
      let data = this.$myfunction.copyData(oldData);
      this.$prompt("请输入类型名称", "修改类型", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: data.listname
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入类型名称");
          } else {
            data.listname = value;
            this.networkUpTypeList(data);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    delPosInfo(data) {
      this.$msgbox
        .confirm("此操作将永久删除该类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.networkDelTypeList(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitFormData(formData) {
      this.networkUpTypeList(formData);
    }
  }
};
</script>
<style lang="less" scoped>
.el-card {
  height: 680px;
  overflow-y: auto;
  .head-button {
    padding: 10px 20px;
  }
}
</style>
