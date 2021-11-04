<template>
  <div>
    <el-button type="text" size="mini" @click="$emit('click',1,data)">重新修改</el-button>
    <el-button type="text" size="mini" @click="$emit('click',2,data)">提交审核</el-button>
    <el-button type="text" size="mini" @click="$emit('click',3,data)">办理盖章</el-button>
    <span>已提交</span>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      scope:'',
    },
    watch: {
      scope(newValue){
        this.data=newValue
      }
    },
    //数据节点
    data() {
      return {
        data:this.scope
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
.span{
  color: #409EFF;
  margin: 0 10px;
}
</style>
