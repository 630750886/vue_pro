<template>
  <div>
    <el-select v-model="value" :multiple="multiple" placeholder="请选择" @change="handleClick">
      <el-option
              v-for="item in data"
              :key="item[prop.value]"
              :label="item[prop.label]"
              :value="item[prop.value]">
      </el-option>
    </el-select>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      prop:{
        type:Object,
        default:()=>{
          return {
            label:'name',
            value:'id'
          }
        }
      },
      data:'',
      multiple:{
        type:Boolean,
        default:false
      }
    },
    model:{
      prop:'model',
      event:'getData'
    },
    watch: {},
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
      handleClick(value){
        this.$emit('getData',value)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
