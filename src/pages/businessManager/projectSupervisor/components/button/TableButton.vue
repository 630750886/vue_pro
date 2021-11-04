<template>
  <div>
     <public-button classhd="hd" :plain="true" type="primary" name="FREE" title="进入工作" @click="$emit('click',2,data)"></public-button>
    <public-button classhd="hd" :plain="true" type="primary" name="XIN1JIAN" title="改名" @click="$emit('click',11,scope)"></public-button>
    <public-button classhd="hd" :plain="true" type="primary" name="YI2JIAO" title="移交" @click="$emit('click',3,data)"></public-button>
    <public-button  v-if="data.projectStatusKeyId <5" classhd="hd" :plain="true" type="primary" name="QU3XIAO" title="取消" @click="$emit('click',4,data)"></public-button>
    <status-button v-if="data.projectCallOffTypeKeyId!==''" :title="'已取消'+'-'+data.projectCallOffTypeName" @click="$emit('click',6,data)"></status-button>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    props: {
      scope:{},
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
  .el-tag{
    margin: 0 10px;
  }
</style>
