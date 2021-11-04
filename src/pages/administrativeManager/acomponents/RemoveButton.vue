<template>
  <i class="el-icon-remove-outline" @click="btnClick"></i>
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
      event:'getValue'
    },
    mounted(){
      this.value=this.model
    },
    watch: {
      model(newValue){
        this.value=newValue
      },
      value(newValue){
        this.$emit('getValue',newValue)
      }
    },
    //数据节点
    data() {
      return {
        value:0,
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      btnClick(){
        if (this.value !== 1) {
          this.value--
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
