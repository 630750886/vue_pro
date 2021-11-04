<template>
  <section class="data_section" ref="data_section">
    <el-row :gutter="5">
      <el-col>
        <table-list></table-list>
      </el-col>
    </el-row>
  </section>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

import TableList from "./acomponents/ShowPlan.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {
    TableList
  },
  
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {
    this.networkGetHrLoadData();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetHrLoadData: "networkGetHrLoadData"
    })
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}

.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
  padding: 18px 18px 0;
}

.row_list {
  margin-bottom: 20px;
  .row_base {
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    height: 1.618rem;
  }
}

.order_list {
  .orderArea {
    width: 100%;
    height: 4.989rem;
    background: #fff !important;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 40px;
    overflow: hidden;
  }
  .orderbarArea {
    height: 4.989rem;
  }
}

.data_list {
  text-align: center;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  height: 1.079rem;
  .leftItem {
    align-items: start;
    justify-content: space-between;
    text-align: left;
  }
  .rightItem {
    width: 0.836rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .svg-icon {
      font-size: 30px;
    }
  }
  .number {
    font-size: 0.297rem;
    font-weight: bold;
    .perTitle {
      font-size: 0.175rem;
      margin-left: 5px;
    }
  }
}

.pay {
  .leftItem {
    justify-content: space-around;
  }
}
</style>
