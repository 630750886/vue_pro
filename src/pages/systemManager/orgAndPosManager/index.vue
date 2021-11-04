<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="6">
        <organize-tree></organize-tree>
      </el-col>
      <el-col :span="18">
        <position-table></position-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import OrganizeTree from "./components/OrganizeTree.vue";
import PositionTable from "./components/PositionTable.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    OrganizeTree,
    PositionTable
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
    this.networkGetAllOrg();
    this.networkGetPost();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetAllOrg: "orgAndPost/networkGetAllOrg",
      networkGetPost: "orgAndPost/networkGetPost"
    }),

    getOrgNode(data) {
      this.organize = data;
    },
    submitPosFormData(formName, data) {
      switch (formName) {
        case "addPos":
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
