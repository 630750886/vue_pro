<template>
  <div class="button-box">
      <div class="btn-left">
        <el-button class="btn_color" icon="el-icon-plus" type="primary" size="mini" @click="$emit('click')">{{title}}</el-button>
      </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
			title:{
				type:String,
				default:'变更人员',
			}
		},
    watch: {},
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
			handleCommand () {
			  this.$emit('click');
			}
    }
  }
</script>
<style lang='less' scoped>
  .button-box{
    background: #e2e0e0;
    border-radius: 2px;
    padding: 5px 15px;
  }
  .btn-left{
    float: left;
    margin-left: 0 !important;
  }
  .btn-left {
    float: left;
    margin-right: 0 !important;
    .el-button {
      margin-left: 5px;
      margin-right: 10px;
			margin-bottom: 5px;
    }
  }
</style>
