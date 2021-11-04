<template>
  <div>
    <el-input type="textarea"
              :autosize="{ minRows: minHeight, maxRows: maxHeight}"
              v-model="value"
              :clearable="clearable"
              @input="submit"></el-input>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      minHeight:{
        type:Number,
        default:2,
      },
      maxHeight:{
        type:Number,
        default:2,
      },
      clearable:{
        type:Boolean,
        default:false
      },
    },
    model:{
      prop:'model',
      event:'getData'
    },
    watch: {
      model(newValue){
        this.value=newValue
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
    methods: {
      submit(){
        this.$emit('getData',this.$myfunction.copyData(this.value))
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
