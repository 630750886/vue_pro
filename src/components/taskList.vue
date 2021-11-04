<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ taskName }}</span>
      </div>
      <div class="logArea">
        <el-table :data="taskData.rows" style="width:100%" fit height="96%" highlight-current-row border>
          <el-table-column
            v-for="(item, index) in taskData.columns"
            :sortable="item.sort"
            :key="index"
            :prop="item.key"
            :label="item.name"
            align="center"
          >
            <template slot-scope="scope">{{
              scope.row[scope.column.property]
            }}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getBiddingList } from "../api/old/bidding";
export default {
  name: "taskList",
  props: {
    taskName: String,
    taskData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    abc() {
      //getBiddingList("").then();
      //console.log(new Date().Format("yyyy-MM-dd hh:mm:ss"));
    }
  }
};
</script>
<style lang="less" scoped>
.logContainer {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height: 370px;
  max-height: 370px;
  overflow: hidden;
  border-radius: 6px;
  .logArea {
    overflow: auto;
    height: 100%;
  }
  .item {
    .title {
      font-size: 13px;
    }
    .time {
      color: #87de75;
    }
    .logContent {
      .logUl {
        padding-left: 30px;
        li {
          font-size: 12px;
          list-style: disc;
          line-height: 20px;
        }
      }
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
