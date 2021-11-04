<template>
  <div>
    <el-button type="text" style="color: red" size="mini" icon="el-icon-setting" @click="$emit('click',1,data)">岗位配置</el-button>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      scope:'',
    },
    watch: {
      scope(){
        this.data=this.scope
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

<style scoped>

</style>
