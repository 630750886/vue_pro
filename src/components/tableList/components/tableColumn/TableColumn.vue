<template>
  <el-table-column :prop="prop" :label="label" :align="align">
    <template slot-scope="scope">
      <template v-if="type !== 'default'">
        <component :is="type"></component>
      </template>
      <template>
        <span>{{ scope.row[prop] }}</span>
      </template>
    </template>
  </el-table-column>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import ElPopoverTemplate from "./components/SinglePopover.vue";

export default {
  components: {
    popover: ElPopoverTemplate
  },
  props: {
    label:"" ,
    prop: {},
    align: {
      type: String,
      default: "center"
    },
    type: {
      type: String,
      default: "default"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      component: ""
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped></style>
