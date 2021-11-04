<template>
  <div>
    <el-date-picker
            v-model="value"
            :type="type"
            :value-format="valueType"
            placeholder="选择日期" @change="submit">
    </el-date-picker>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      type:{
        type:String,
        default: 'date'
      },
      valueType:{
        type:String,
        default:'yyyy/MM/dd'
      }
    },
    model:{
      prop:'model',
      event:'getValue'
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
      submit(value){
        this.$emit('getValue',value)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
