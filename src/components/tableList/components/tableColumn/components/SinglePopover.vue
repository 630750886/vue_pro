<template>
  <div>
    <el-popover :trigger="popoverType" placement="top">
      <template v-if="type === 'single'">
        <table>
          <tr v-for="(item,index) in labelProp" :key="'trv'+index">
            <td style="text-align: right">{{ item.label }}:</td>
            <td>{{ data[item.prop] }}</td>
          </tr>
        </table>
      </template>
      <template v-if="type === 'multiple'">
        <el-table :data="tableObject.data" highlight-current-row border>
          <template v-for="(item,index2) in tableObject.labelPropList">
            <el-table-column
              :key="'trcf'+index2"
              :label="item.label"
              :prop="item.prop"
              align="center"
              v-if="item.prop != '下载'"
            ></el-table-column>
            <el-table-column
              :key="'trcdf'+index2"
              :label="item.label"
              :prop="item.prop"
              align="center"
              v-if="item.prop == '下载'"
            >
              <template>
                <el-button type="text">下载</el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </template>
      <div slot="reference">
        <el-tag size="medium">{{ title }}</el-tag>
      </div>
    </el-popover>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  props: {
    data: [],
    type: {
      type: String,
      default: "single" //single、multiple
    },
    popoverType: {
      type: String,
      default: "click"
    },
    labelProp: {type:Array,default:[]}
  },
  watch: {},
  mounted() {
    if (!this.$myfunction.isEmpty(this.tagTitle)) {
      this.title = this.tagTitle;
    }
  },
  //数据节点
  data() {
    return {
      title: "详细",
      tableData: [
        { k1: "张三", k2: "男" },
        { k1: "李四", k2: "女" }
      ]
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
