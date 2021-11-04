<template>
  <div id="body">
    <el-card ref="card" class="el-scrollbar">
      <div class="head-button">
        <head-button @click="headButtonClick"></head-button>
      </div>
      <div class="dev-type-main-left">
        <!--鼠标右键菜单栏 -->
        <div v-show="showRightMenu">
          <ul id="menu" class="right-menu">
            <li
              v-if="btnListIndexOf('XIN1ZENG1MO2KUAI')"
              class="menu-item"
              @click="addDevHandle()"
            >
              <i class="el-icon-plus"></i> <span>新增</span>
            </li>
            <li
              v-if="btnListIndexOf('XIU1GAI3MO2KUAI')"
              class="menu-item"
              @click="editDevHandle"
            >
              <i class="el-icon-edit"></i> <span>修改</span>
            </li>
            <li
              v-if="btnListIndexOf('SHAN1CHU2MO2KUAI')"
              class="menu-item"
              @click="delDevHandle"
            >
              <i class="el-icon-delete"></i> <span>删除</span>
            </li>
            <li
              v-if="btnListIndexOf('PEI4ZHI4XIANG2XI')"
              class="menu-item"
              @click="configInfo"
            >
              <i class="el-icon-notebook-2"></i><span>配置详细</span>
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
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span style="width: 55px;">{{ data.code }}</span>
          </div>
        </el-tree>
      </div>
    </el-card>
    <module-type-dialog
      ref="addModuleRef"
      title="添加模块类型"
      width="30%"
      @getFormData="getAddFormData"
    ></module-type-dialog>
    <module-type-dialog
      ref="upModuleRef"
      title="修改模块类型"
      width="30%"
      @getFormData="getUpFormData"
    ></module-type-dialog>
    <config-info-dialog
      ref="configRef"
      width="40%"
      @getFormData="getUpFormData"
    ></config-info-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/ModuleHeadButton.vue";
import ModuleTypeDialog from "./dialog/ModuleTypeDialog.vue";
import ConfigInfoDialog from "./dialog/ConfigInfoDialog.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("sysType");
export default {
  components: {
    HeadButton,
    ModuleTypeDialog,
    ConfigInfoDialog
  },
  computed: {
    ...mapState({
      data: "allModule",
      currentModule: "currentModule"
    })
  },
  watch: {
    currentNode(newValue) {
      this.nodeName = [];
      let ref = {
        keyid: "",
        code: "",
        modelName: ""
      };
      if (!this.$myfunction.isEmpty(newValue)) {
        this.getOrgName(this.$refs.treeRef.getNode(newValue));
        ref.code = newValue.code;
        ref.keyid = newValue.keyid;
        ref.modelName = this.nodeName.reverse().join("/");
      }
      this.updateCurrentModule(ref);
    },
    isSubmit(newValue) {},

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
      nodeName: [],
      currentObj: {}
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
      updateCurrentModule: "updateCurrentModule"
    }),
    ...mapActions({
      networkAdd: "networkAddModule",
      networkUp: "networkUpModule",
      networkDel: "networkDelModule",
      networkGetTypeListByCode: "networkGetTypeListByCode"
    }),
    changeFix(ch) {
      this.$refs.card.$el.style.height = ch - 100 + "px";
    },
    checkClick(data, obj) {
      this.networkGetTypeListByCode(data.code);
      this.nodeClick(data);
    },
    headButtonClick(btn) {
      switch (btn) {
        case 1:
          this.addDevHandle({ keyid: "0000" }, false);
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
    addDevHandle(parent, isCode) {
      let currentNode = {};
      if (!this.$myfunction.isEmpty(parent)) {
        currentNode = parent;
      } else {
        currentNode = this.currentNode;
        isCode = true;
      }
      this.currentObj = currentNode;
      this.$refs.addModuleRef.openDialog(undefined, isCode);
      if (this.isSubmit) {
        this.isSubmit = false;
      }
    },
    editDevHandle() {
      let ref = {
        keyid: this.currentNode.keyid,
        typeName: this.currentNode.label,
        code: this.currentNode.code
      };
      this.$refs.upModuleRef.openDialog(ref, true);
    },
    // 删除操作
    delDevHandle() {
      this.$msgbox
        .confirm("此操作将永久删除, 是否继续?", "提示", {
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
            this.$alert("该模块存在下级，请先删除下级模块", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.networkDel(this.currentNode);
          }
        })
        .catch(item => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //配置详细
    configInfo() {
      let ref = {
        keyid: this.currentNode.keyid,
        typeName: this.currentNode.label,
        code: this.currentNode.code,
        allstatusname: this.currentNode.allstatusname
      };
      console.log(this.currentNode);
      this.$refs.configRef.openDialog(ref);
    },
    getAddFormData(data) {
      this.$set(data, "pkeyid", this.currentObj.keyid);
      this.networkAdd(data);
    },
    getUpFormData(data) {
      this.networkUp(this.$myfunction.copyData(data));
      this.form = {};
      this.isSubmit = false;
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
      height: 130px;
      width: 120px;
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
        span {
          margin-left: 5px;
          display: inline-block;
          width: 5em;
          text-align: justify;
          text-align-last: justify;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
