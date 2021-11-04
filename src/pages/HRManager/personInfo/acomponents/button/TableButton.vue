<template>
  <div>
    <el-dropdown @command="handleCommand">
      <el-tag size="small">{{ data.statusname }}<i></i></el-tag>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-if="data.statusid === '2'&&btnListIndexOf('ZAI4ZHI2LI2ZHI2DIAO4GANG')"
          command="1"
          >复职</el-dropdown-item
        >
        <el-dropdown-item
          v-if="data.statusid === '0'&&btnListIndexOf('ZAI4ZHI2LI2ZHI2DIAO4GANG')"
          command="2"
          >离职</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <public-button name="ZAI4ZHI2LI2ZHI2DIAO4GANG" :disable="pdisable()" classhd="hd" :plain="true" type="primary" title="调岗" @click="$emit('click', 7, data)"></public-button>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  props: {
    user: {
      type: String,
      default: "admin"
    },
    scope: {}
  },
  watch: {
    scope(value) {
      this.data = value;
    }
  },
  mounted() {
    this.data = this.scope;
  },
  //数据节点
  data() {
    return {
      data: {
        statusid: '0',
        statusname: "在职中"
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    pdisable(){
      if (this.data.statusid === '2'){
        return true;
        }
      else{
         return false;
      }
    },
    handleCommand(command) {
      this.$emit("click", parseInt(command), this.data);
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
  margin-left: 10px !important;
}
</style>
