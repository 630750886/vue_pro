<template>
  <div>
    <el-date-picker
            v-model="dataScope"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期" @blur="getData">
    </el-date-picker>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
    },
    model:{
      prop:'model',
      event:'getData'
    },
    watch: {
      model(newValue){
        this.dataScope=newValue
      }
    },
    //数据节点
    data() {
      return {
        dataScope:this.model
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getData(){
        this.$emit('getData',this.dataScope)
      },
      resetData(){
        this.dataScope=this.model
      }

    }
  }
</script>
<style lang='less' scoped>

</style>
