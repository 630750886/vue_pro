<template>
  <div>
    <el-popover :trigger="popoverType" placement="top">
      <template v-if="type === 'single' || type === 's'">
        <table>
          <tr v-for="item in labelProp">
            <td style="text-align: right">{{ item.label }}:</td>
            <td>{{ data[item.prop] }}</td>
          </tr>
        </table>
      </template>
      <template v-if="type === 'multiple' || type === 'm'">
        <el-table :data="data" border>
          <template v-for="item in labelProp">
            <el-table-column
              v-if="item.type !== 'file'"
              :label="item.label"
              :prop="item.prop"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="item.type === 'file'"
              :label="item.label"
              :prop="item.prop"
              align="center"
            >
              <template slot-scope="scope">
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
  components: {},
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
    labelProp: { type: String },
    title: {
      type: String,
      default: "详细"
    }
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
