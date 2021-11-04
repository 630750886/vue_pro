<template>
  <el-button :style="{width: width, marginTop: '20px'}" type="primary" size="mini" @click="$emit('click')">
    <span :style="{letterSpacing:letterSpacing,marginLeft: letterSpacing}">{{title}}</span>
  </el-button>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title:[String],
      width:[String],
      letterSpacing:[String]
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
    },
    watch: {},
    //数据节点
    data() {
      return {}
    },

    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>

</style>
