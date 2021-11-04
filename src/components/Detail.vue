<template>
  <div class="container_Collapse">
    <el-row :gutter="10" v-for="(myjson, index) in colData" :key="index">
      <el-col
        :span="24 / cols"
        v-for="(item, key, innerindex) in myjson"
        :key="innerindex"
      >
        <div class="div_title">{{ getTitle(key) }}:</div>
        <div class="div_text">{{ item }}</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mycolum from "../../src/views/configs/app.json";
export default {
  name: "DetailShow",
  data() {
    return {};
  },
  props: {
    cols: {
      type: Number,
      default: () => {
        return 3;
      }
    },
    colData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    getTitle(k) {
      return mycolum.columnHeader[k];
    }
  }
};
</script>
<style lang="less" scoped>
.container_Collapse {
  width: 100%;
  height: 500px;
  padding: 10px 15px;
  .div_title {
    font-weight: bold;
    font-size: 12px;
    padding-top: 5px;
    width: 100%;
  }
  .div_text {
    font-size: 12px;
    width: 100%;
    padding-bottom: 5px;
    word-wrap: break-word;
  }
}
</style>
