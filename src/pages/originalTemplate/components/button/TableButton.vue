<template>
  <div>
    <public-button name="XIU1GAI3MO2BAN" classhd="hd" :plain="true" type="primary" title="修改" @click="$emit('click',1,data)"></public-button>
    <public-button name="SHAN1CHU2MO2BAN" classhd="hd" :plain="true" type="primary" title="删除" @click="$emit('click',2,data)"></public-button>
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
.el-tag{
  margin: 0 10px;
}
</style>
