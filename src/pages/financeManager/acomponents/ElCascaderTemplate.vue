<template>
  <div>
    <el-cascader
            v-model="value"
            :options="data"
            :props="prop"
            @change="handleChange"></el-cascader>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      data:'',
      prop:{
        type:Object,
        default:()=>{
          return {
            value:'id',
            label:'name',
          }
        }
      }
    },
    model:{
      prop:'model',
      event:'getData'
    },
    mounted(){
      if (this.$myfunction.isEmpty(this.model)) {
        this.value=this.model
      }
    },
    watch: {
      model(newValue){
        //this.value=newValue
      }
    },
    //数据节点
    data() {
      return {
        value:[],
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleChange(){
        let str=''
        this.value.forEach((value,i) => {
          if (i < this.value.length - 1) {
            str+=value+'/'
          }
        })
        this.$emit('getData',str)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
