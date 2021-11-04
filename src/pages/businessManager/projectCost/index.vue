<template>
  <div>
    <table-list></table-list>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import TableList from './components/TableList.vue'
  import {mapActions} from 'vuex'
  export default {
    components: {
      TableList
    },
    //生命周期函数节点
    created() {
      this.networkGetSelect(['projectStatus','projectCostMajorProject'])
      this.networkGetCascader(['projectCostItemType'])
    },
    //自定义函数节点
    methods: {
        ...mapActions('loadType',{
          networkGetSelect:'networkGetSelect',
          networkGetCascader:'networkGetCascader',
        }),
    }
  }
</script>
<style lang='less' scoped>

</style>
