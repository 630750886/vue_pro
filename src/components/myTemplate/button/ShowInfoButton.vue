<template>
  <div>
    <el-button v-if="!$myfunction.isEmpty(value)" type="text" @click="dialogVisible=!dialogVisible">查看</el-button>
    <el-dialog title="详细" :visible.sync="dialogVisible" v-if="dialogVisible" width="500px">
      <rea-textarea v-model="value" min-height="20" max-height="20" readonly></rea-textarea>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      value:[String]
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false
      }
    },

    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>

</style>
