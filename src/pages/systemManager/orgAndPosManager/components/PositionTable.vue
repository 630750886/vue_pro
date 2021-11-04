<template>
  <div>
    <el-card ref="card" class="el-scrollbar">
      <div class="head-button">
        <head-button @click="headButtonClick"></head-button>
      </div>
      <el-table
        :data="postList.dataList"
        style="width: 100%;font-size:10px;"
        align="left"
        :fit="true"
        height="7.5rem"
        border
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
      >
        <el-table-column
          prop="posName"
          label="岗位名称"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="所属组织"
          align="left"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="250">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableButtonClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<pagination
              :pageTotal="postList.total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"></pagination>-->
    </el-card>
    <div class="dialog">
      <post-power-dialog ref="configRef" width="50%"></post-power-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "./button/TableButton.vue";
import HeadButton from "./button/HeadButton.vue";
import PostPowerDialog from "./dialog/PostPowerDialog.vue";

import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("orgAndPost");

export default {
  components: {
    TableButton,
    HeadButton,
    PostPowerDialog
  },
  computed: {
    ...mapState({
      organize: "currentOrg"
    }),
    ...mapGetters({
      postList: "postList"
    })
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    /*window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };*/
    this.onWindowResize.add(() => {
      this.clientHeight = window.innerHeight;
    });
  },
  watch: {
    clientHeight: function(newValue) {
      let _this = this;
      setTimeout(function() {
        _this.changeFix(newValue);
      }, 100);
    }
  },
  //数据节点
  data() {
    return {
      clientHeight: "",
      pageShow: {
        page: 1,
        limit: 30,
        filter: {}
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    ...mapActions({
      networkAddPos: "networkSubmitAddPos",
      networkDelPos: "networkSubmitDelPos",
      networkUpPos: "networkSubmitUpPos"
    }),
    changeFix(ch) {
      this.$refs.card.$el.style.height = ch - 100 + "px";
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
      this.$prompt("请输入岗位名称", "添加岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入岗位名称");
          } else if (this.$myfunction.isEmpty(this.organize.keyid)) {
            this.$alert("请勾选左边组织", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          } else {
            let form = Object.assign(
              {},
              {
                orgId: this.organize.keyid,
                orgName: this.organize.orgName,
                posName: value
              }
            );
            this.networkAddPos(form);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    upPosInfo(odlData) {
      let data = this.$myfunction.copyData(odlData);
      this.$prompt("请输入岗位名称", "修改岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: data.posName
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入岗位名称");
          } else {
            data.posName = value;
            data.orgName = this.organize.orgName;
            this.networkUpPos(data);
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
        .confirm("此操作将永久删除该岗位, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.networkDelPos(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
