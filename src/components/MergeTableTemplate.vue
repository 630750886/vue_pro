<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      highlight-current-row
      border
      style="width: 100%; margin-top: 20px"
    >
      <template v-for="(item,index) in labelProp">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
          v-bind:key="index"
        ></el-table-column>
      </template>
      <el-table-column label="操作" width="operateColumnWidth" align="center">
        <template slot-scope="scope">
          <template v-for="(item, index) in btnGroup">
            <el-button
              type="text"
              @click="$emit('btnClick', index + 1, scope.row)"
              v-bind:key="index"
              >{{ item }}</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    mergeProp: ,
    labelProp: {
      type: Array,
      default: () => {
        return [
          { label: "版本", prop: "lv" },
          { label: "名称", prop: "name" }
        ];
      }
    },
    dataList: {
      type: Array,
      default: () => {
        return [
          { lv: "第一版", name: "协议" },
          { lv: "第一版", name: "协议" },
          { lv: "第二版", name: "协议2" },
          { lv: "第二版", name: "协议2" },
          { lv: "第二版", name: "协议2" }
        ];
      }
    },
    operateColumnWidth: {
      type: String,
      default: "75px"
    },
    btnGroup: {
      type: Array,
      default: () => {
        return ["新增", "删除", "修改", "查看"];
      }
    }
  },
  mounted() {
    this.tableData = this.dataList;
    this.getOrderNumber(this.mergeProp);
  },
  watch: {
    dataList(newValue) {
      this.tableData = newValue;
    }
  },
  //数据节点
  data() {
    return {
      tableData: [],
      OrderIndexArr: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    getOrderNumber(firstColumn) {
      let OrderObj = {};
      this.tableData.forEach((element, index) => {
        element.rowIndex = index;
        if (OrderObj[element[firstColumn]]) {
          OrderObj[element[firstColumn]].push(index);
        } else {
          OrderObj[element[firstColumn]] = [];
          OrderObj[element[firstColumn]].push(index);
        }
        console.log(1, element[firstColumn]);
      });
      console.log(OrderObj);
      // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
      for (let k in OrderObj) {
        if (OrderObj[k].length > 1) {
          this.OrderIndexArr.push(OrderObj[k]);
        }
      }
      console.log(this.OrderIndexArr);
    },
    objectSpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        for (let i = 0; i < this.OrderIndexArr.length; i++) {
          let element = this.OrderIndexArr[i];
          for (let j = 0; j < element.length; j++) {
            let item = element[j];
            if (rowIndex == item) {
              if (j == 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                };
              } else if (j != 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
