<template>
  <div class="button-box">
      <div class="btn-right">
        <el-button  type="primary" size="mini" @click="$emit('click')">{{title}}</el-button>
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

  .btn-right {
    float: right;
    margin-right: 0 !important;
    .el-button {
      margin: 10px 10px;
    }
  }
</style>
