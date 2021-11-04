<template>
  <el-table
    highlight-current-row
    :data="tableData"
    ref="signTab"
    style="width: 100%;font-size:10px;"
    align="center"
    :fit="true"
    :height="tableHeight"
    :header-cell-style="{ fontSize: '14px' }"
    border
  >
    <el-table-column
      v-for="(item, index) in headerData"
      :key="index"
      :prop="item.prop"
      :label="item.label"
    >
      <template slot-scope="scope">
        <span v-if="item.show">
          <!--  -->
          <span v-html="item.temp.replace('@v', scope.row[item.prop])"></span>
          <span v-html="item.temp | columnFormat"></span>
        </span>
        <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "tableList",
  data() {
    return {
      tableHeight: window.innerHeight - 250,
      tempv: [],
      tv: ""
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    headerData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    this.getHeader();
  },
  methods: {
    getHeader() {
      this.tempv = this.headerData.filter(s => {
        return s.show === true;
      });
    },
    columnFormat(row, column, cellValue, index) {
      //     console.log(this.tempv);
      //   this.tempv.forEach((item, index) => {
      //     if (column.property == item.prop) {
      //       this.tv = item.temp.replace("@v", row[item.prop]);
      //     }
      //   });
      //if (cs.length > 0) {
      //  console.log(this);
      // return cs[0].temp.replace("@v", row[cs[0].prop]);
      //console.log(cs[0].temp);
      //console.log(cellValue);
      // } else {
      //return row[column.property];
      //}
    }
  }
};
</script>
