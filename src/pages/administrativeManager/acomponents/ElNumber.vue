<template>
  <el-input-number :size="size" v-model="value"
                   :controls="false" ></el-input-number>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      size:'',
    },
    model:{
      prop:'model',
      event:'getValue'
    },
    watch: {
      model(newValue){
        this.value=newValue
      },
      value(newValue){
        this.$emit('getValue',newValue)
      }
    },
    mounted(){
      this.value=this.model
    },
    //数据节点
    data() {
      return {
        value:'',
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

</style>
