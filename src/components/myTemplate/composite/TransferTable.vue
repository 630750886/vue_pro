<template>
  <el-table :data="data" stripe :show-header="false" highlight-current-row border>
    <el-table-column width="75px">
      资料名称
    </el-table-column>
    <el-table-column prop="resourcename" min-width="100px"></el-table-column>
    <el-table-column width="75px">
      数量
    </el-table-column>
    <el-table-column prop="copies" width="75px"></el-table-column>
    <el-table-column width="75px">
      接收人
    </el-table-column>
    <el-table-column prop="inperson" width="100px"></el-table-column>
    <el-table-column align="right" width="100px">
      <template slot-scope="scope">
        <el-button type="text" size="mini" @click="remObj(scope.$index)"
          >移除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    model: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "model",
    event: "getData"
  },
  //生命周期函数节点
  created() {},
  mounted() {
    this.data = this.model;
  },
  watch: {
    model(newValue) {
      this.data = newValue;
    }
  },
  //数据节点
  data() {
    return {
      data: []
    };
  },

  //自定义函数节点
  methods: {
    remObj(index) {
      this.data.splice(index, 1);
      this.$emit("getData", this.$myfunction.copyData(this.data));
    }
  }
};
</script>
<style lang="less" scoped></style>
