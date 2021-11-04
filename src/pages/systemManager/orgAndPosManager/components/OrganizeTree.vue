<template>
  <div id="body">
    <el-card ref="card" class="el-scrollbar">
      <div class="head-button">
        <org-head-button @click="headButtonClick"></org-head-button>
      </div>
      <div class="dev-type-main-left">
        <!--鼠标右键菜单栏 -->
        <div v-show="showRightMenu">
          <ul id="menu" class="right-menu">
            <li
              v-if="btnListIndexOf('XIN1ZENG1ZU3ZHI')"
              class="menu-item"
              @click="addDevHandle()"
            >
              <i class="el-icon-plus"></i> 新 增
            </li>
            <li
              v-if="btnListIndexOf('XIU1GAI3ZU3ZHI')"
              class="menu-item"
              @click="editDevHandle"
            >
              <i class="el-icon-edit"></i> 修 改
            </li>
            <li
              v-if="btnListIndexOf('SHAN1CHU2ZU3ZHI')"
              class="menu-item"
              @click="delDevHandle"
            >
              <i class="el-icon-delete"></i> 删 除
            </li>
          </ul>
        </div>
        <el-tree
          :data="data"
          default-expand-all
          :expand-on-click-node="false"
          check-on-click-node
          show-checkbox
          check-strictly
          node-key="keyid"
          ref="treeRef"
          @check="checkClick"
          @node-contextmenu="rightClick"
          @node-click="nodeClick"
        >
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import OrgHeadButton from "./button/OrgHeadButton.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("orgAndPost");
export default {
  components: {
    OrgHeadButton
  },
  computed: {
    ...mapState({
      data: "orgTree",
      currentOrg: "currentOrg"
    })
  },
  watch: {
    currentNode(newValue) {
      this.nodeName = [];
      let ref = {
        keyid: "",
        orgName: ""
      };
      if (!this.$myfunction.isEmpty(newValue)) {
        this.getOrgName(this.$refs.treeRef.getNode(newValue));
        ref.keyid = newValue.keyid;
        ref.orgName = this.nodeName.reverse().join("/");
      }
      this.updateCurrentOrg(ref);
    },
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
      array: [],
      currentNode: {},
      showRightMenu: false,
      icon: "el-icon-success",
      nodeName: []
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
    ...mapMutations({
      updateCurrentOrg: "updateCurrentOrg"
    }),
    ...mapActions({
      networkAddOrg: "networkSubmitAddOrg",
      networkUpOrg: "networkSubmitUpOrg",
      networkDelOrg: "networkSubmitDelOrg",
      networkGetPostByOrgId: "networkGetPostByOrgId"
    }),
    changeFix(ch) {
      this.$refs.card.$el.style.height = ch - 100 + "px";
    },
    checkClick(data, obj) {
      this.networkGetPostByOrgId(data.keyid);
      this.nodeClick(data);
    },
    headButtonClick(btn) {
      switch (btn) {
        case 1:
          this.addDevHandle({ keyid: "0000" });
          break;
        case 2:
          break;
      }
    },

    getOrgName(node) {
      let _this = this;
      _this.nodeName.push(node.label);
      if (typeof node.parent.key !== "undefined") {
        _this.getOrgName(node.parent);
      }
    },
    nodeClick(data, node, obj) {
      this.showRightMenu = false;
      this.$refs.treeRef.setCheckedNodes([data]);
      this.currentNode = data;
    },
    rightClick(event, data, node, obj) {
      this.nodeClick(data, node, obj);
      this.showRightMenu = true;
      let menu = document.querySelector("#menu");
      const windowW = document.documentElement.querySelector(".el-card")
        .clientWidth;
      const windowH = document.documentElement.clientHeight;
      let maxX = windowW - menu.offsetWidth;
      let maxY = windowH - menu.offsetHeight;
      let x = event.clientX;
      let y = event.clientY;
      if (y >= maxY) {
        y -= menu.offsetHeight;
      }
      menu.style.left =
        x -
        200 +
        document.documentElement.querySelector(".el-card").scrollLeft +
        "px";
      menu.style.top =
        y -
        95 +
        document.documentElement.querySelector(".el-card").scrollTop +
        "px";

      // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
      document.addEventListener("click", this.closeRightMenu);
      this.currentNode = data;
    },
    closeRightMenu() {
      this.showRightMenu = false;
      // 及时关掉鼠标监听事件
      document.removeEventListener("click", this.closeRightMenu);
    },
    addDevHandle(parent) {
      let currentNode = {};
      if (!this.$myfunction.isEmpty(parent)) {
        currentNode = parent;
      } else {
        currentNode = this.currentNode;
      }
      this.$prompt("请输入组织名称", "添加组织", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入组织名称");
          } else {
            let addForm = Object.assign(
              {},
              { pkeyid: currentNode.keyid, orgname: value }
            );
            this.networkAddOrg(addForm);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    editDevHandle() {
      this.$prompt("请输入组织名称", "修改组织名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.currentNode.label
      })
        .then(({ value }) => {
          if (this.$myfunction.isEmpty(value)) {
            this.$message.error("请输入组织名称");
          } else {
            let ref = {
              keyid: this.currentNode.keyid,
              orgname: value
            };
            this.networkUpOrg(ref);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 删除操作
    delDevHandle() {
      this.$msgbox
        .confirm("此操作将永久删除组织, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(item => {
          if (
            this.currentNode.children !== undefined &&
            Array.isArray(this.currentNode.children) &&
            this.currentNode.children.length > 0
          ) {
            this.$alert("该组织存在下级组织，请先删除该组织下的组织", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.networkDelOrg(this.currentNode);
          }
        })
        .catch(item => {
          console.log(item);
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
    height: 30px;
    padding: 10px 0;
    .el-button {
      float: right;
    }
  }
  .dev-type-main-left {
    height: auto;
    overflow: auto;
    padding: 10px;
    .right-menu {
      z-index: 999;
      position: absolute;
      height: 100px;
      width: 100px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: white;
      .menu-item {
        height: 33px;
        position: relative;
        line-height: 33px;
        text-align: center;
        font-size: 14px;
        color: #606266;
        i {
          position: absolute;
          left: 10px;
          top: 9px;
        }
      }
      li:hover {
        cursor: pointer;
        background-color: #edf6ff;
        color: #606266;
      }
    }
  }
}
</style>
