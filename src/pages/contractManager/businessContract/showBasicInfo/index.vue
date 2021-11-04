<template>
  <div class="data_section" ref="data_section" style="width:100%;height:100%;">
    <show-panel></show-panel>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ShowPanel from './components/ShowPanel.vue'
  export default {
    components: {
      ShowPanel
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        dataInfo:{}
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {

    }
  }
</script>
<style lang='less' scoped>

</style>
