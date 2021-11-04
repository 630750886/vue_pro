<template>
  <el-checkbox-group v-model="value" @change="handleClick">
    <el-checkbox v-for="item in data" :label="item[prop]" :key="item[prop]">{{item[label]}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: '',
      data: '',
      label: {
        type: String,
        default: 'listname'
      },
      prop: {
        type: String,
        default: 'keyid'
      },
      valueFormat: '',
      symbol: {
        type:String,
        default:','
      }
    },
    model: {
      prop: 'model',
      event: 'getValue'
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
      if (this.valueFormat === 'array') {
        this.value = this.data.filter(item=>{
          this.model.forEach(ref=>{
            if(item[this.prop]===ref){
              return item
            }
          })
        })
      } else if (!this.$myfunction.isEmpty(this.model)) {
        this.value = this.data.filter(item=>{
          this.model.split(this.symbol).forEach(ref=>{
            if(item[this.prop]===ref){
              return item
            }
          })
        })
      }

    },
    watch: {
      model(newValue) {
        this.value=[]
        if (this.valueFormat === 'array') {
          this.value = newValue
        } else if (!this.$myfunction.isEmpty(newValue) && newValue.indexOf(this.symbol)!==-1) {
          this.value = newValue.split(this.symbol)
        }else if (!this.$myfunction.isEmpty(newValue)) {
          this.value.splice(0,1,newValue)
        }
      }
    },
    //数据节点
    data() {
      return {
        value: []
      }
    },
    //自定义函数节点
    methods: {
      handleClick(value) {
        if (this.valueFormat === 'array') {
          this.$emit('getValue', value)
        } else {
          this.$emit('getValue',value.join(this.symbol))
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
