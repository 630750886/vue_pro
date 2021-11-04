<template>
  <div>
    <public-button classhd="hd" :plain="true" type="primary" name="SHAN1CHU" title="删除"  @click="$emit('click',1,scope)"></public-button>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      scope:'',
    },
    //数据节点
    data() {
      return {
        btnList:this.session.getItem('btnList')?this.session.getItem('btnList'):[]
      }
    },
  }
</script>
<style lang='less' scoped>

span{
  color: #0b84fc;
  margin-left: 20px;
}
</style>
