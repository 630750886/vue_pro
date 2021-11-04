<template>
  <div>
    <el-row>
      <div class="btn-left">
        <template v-for="(item, index) in buttonList">
          <public-button
            :name="item.urladdress"
            :title="item.listname"
            @click="$emit('click', index + 1, item.keyid)"
            :key="index"
          ></public-button>
        </template>
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          size="mini"
          @click="$emit('click', 9)"
        ></el-button>
      </div>
      <div class="btn-right">
        <public-button
          name="MO2BAN3GUAN3LI"
          title="模板管理"
          @click="$emit('click', 6)"
        ></public-button>
      </div>
    </el-row>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {},
  watch: {},
  //数据节点
  data() {
    return {
      buttonList: []
    };
  },
  //生命周期函数节点
  created() {
    this.getSelectByCode(167).then(item => {
      this.buttonList = item.data;
    });
  },
  //自定义函数节点
  methods: {
    handleCommand(command) {
      this.$emit("click", parseInt(command));
    }
  }
};
</script>
<style lang="less" scoped>
.btn-left {
  float: left;
  margin-left: 0 !important;
}
.btn-right {
  float: right;
  margin-right: 0 !important;
}
</style>
