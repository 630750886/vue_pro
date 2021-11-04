<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="8">
        <module-type-tree></module-type-tree>
      </el-col>
      <el-col :span="16">
        <type-table></type-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import ModuleTypeTree from "./components/ModuleTypeTree.vue";
import TypeTable from "./components/TypeTable.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("sysType");
export default {
  components: {
    ModuleTypeTree,
    TypeTable
  },
  computed: {},
  //数据节点
  data() {
    return {
      organize: "",
      orgList: [],
      posList: [],
      posTotal: 0,
      loadData: {
        organizeList: [],
        positionList: []
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetAllModule();
    this.networkGetAllTypeList();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetAllModule: "networkGetAllModule",
      networkGetAllTypeList: "networkGetAllTypeList"
    }),
    getOrgNode(data) {
      this.organize = data;
    },
    submitPosFormData(formName, data) {
      switch (formName) {
        case "addPos":
          console.log(data);
          this.networkSubmitAddPos(data);
          break;
        case "delPos":
          this.networkSubmitDelPos(data);
          break;
        case "upPos":
          this.networkSubmitUpPos(data);
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
