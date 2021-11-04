<template>
  <el-input style="width: 100%;"
            v-model="value"
            :clearable="clearable"
            :readonly="readonly"
            :controls="false"
            :disabled="disabled"
            @input="submit"></el-input>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: '',
      clearable: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled:{
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'model',
      event: 'getData'
    },
    watch: {
      model(newValue) {
        this.value = this.numberFormat(newValue)
      },
    },
    mounted() {
      this.value = this.numberFormat(this.model)
    },
    //数据节点
    data() {
      return {
        value: '',
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submit(value) {
        this.value=this.numberFormat(value)
        this.$emit('getData', this.$myfunction.copyData(this.value.replace(/\s*/g,"")))
      },
      numberFormat(value){
        let str1=value+''
        let arr=str1.replace(/[^\d.]/g,"").split('').reverse()
        let str=[]
        arr.forEach((item,index)=>{
          if ((index+1)%4===0){
            str.push(item)
            str.push('')
          } else {
            str.push(item)
          }
        })
        return str.reverse().join('')
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
