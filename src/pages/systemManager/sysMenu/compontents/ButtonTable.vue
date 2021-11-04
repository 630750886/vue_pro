<template>
  <div>
    <el-card ref="card" class="el-scrollbar">
      <div class="head-button">
        <head-button @click="headButtonClick"></head-button>
      </div>
      <el-table
        :data="data"
        style="width: 100%;font-size:10px;"
        align="center"
        :fit="true"
        height="7.5rem"
        border
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
      >
        <el-table-column
          prop="code"
          label="按钮代码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="按钮名称"
          align="center"
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
              :pageTotal="ButtontList.total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"></pagination>-->
    </el-card>
    <div class="dialog"></div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "./button/TableButton.vue";
import HeadButton from "./button/HeadButton.vue";

export default {
  components: {
    TableButton,
    HeadButton
  },
  props: {
    menuKeyid: [String],
    dataList: [Array]
  },
  computed: {},
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
    },
    menuKeyid(newValue) {},
    dataList(newValue) {
      this.data = newValue;
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
      },
      data: this.dataList
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    changeFix(ch) {
      this.$refs.card.$el.style.height = ch - 100 + "px";
    },
    headButtonClick(btn) {
      switch (btn) {
        case 1:
          this.addButtonInfo();
          break;
      }
    },
    tableButtonClick(btn, data) {
      switch (btn) {
        case 1:
          this.upButtonInfo(data);
          break;
        case 2:
          this.delButtonInfo(data);
          break;
        case 3:
          this.$refs.configRef.openDialog(data);
          break;
      }
    },
    networkGetDataList() {
      this.javaHttp("/sys/syspermission/findwhere", {
        pkeyid: this.menuKeyid,
        typecode: "button"
      }).then(item => {
        this.data = item.data;
      });
    },
    addButtonInfo() {
      this.$msgbox
        .prompt("请输入按钮名称", "添加按钮", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入按钮名称");
          } else if (this.$myfunction.isEmpty(this.menuKeyid)) {
            this.$alert("请勾选左边菜单", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          } else {
            let form = Object.assign(
              {},
              { pkeyid: this.menuKeyid, name: value, typecode: "button" }
            );
            this.javaHttp("/sys/syspermission/adds", form).then(item => {
              if (item.code === 200) {
                this.$message.success(item.message);
                this.networkGetDataList();
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    upButtonInfo(odlData) {
      let data = this.$myfunction.copyData(odlData);
      this.$prompt("请输入按钮名称", "修改按钮", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: data.name
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入按钮名称");
          } else {
            data.name = value;
            this.javaHttp("/sys/syspermission/edits", data).then(item => {
              if (item.code === 200) {
                this.$message.success(item.message);
                this.networkGetDataList();
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    delButtonInfo(data) {
      this.$msgbox
        .confirm("此操作将永久删除该按钮, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.javaHttp("/sys/syspermission/deletes", data).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message);
              this.networkGetDataList();
            }
          });
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
