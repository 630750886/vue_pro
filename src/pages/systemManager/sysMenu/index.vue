<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <menu-tree
          @buttonList="
            (keyid, buttonList) => {
              dataList = buttonList;
              menuKeyid = keyid;
            }
          "
        ></menu-tree>
      </el-col>
      <el-col :span="18">
        <button-table
          :menu-keyid="menuKeyid"
          :data-list="dataList"
        ></button-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import MenuTree from "./compontents/MenuTree.vue";
import ButtonTable from "./compontents/ButtonTable.vue";
export default {
  components: {
    MenuTree,
    ButtonTable
  },
  props: {},
  //生命周期函数节点
  created() {},
  mounted() {},
  watch: {},
  //数据节点
  data() {
    return {
      menuKeyid: "",
      dataList: []
    };
  },

  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped></style>
