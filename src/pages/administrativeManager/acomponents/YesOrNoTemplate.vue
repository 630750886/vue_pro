<template>
  <div>
    <el-radio-group v-model="value">
      <el-radio  :label="true">是</el-radio>
      <el-radio  :label="false">否</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      valueFormat:{
        type:String,
        default:'chinese'// number english boolean
      },
    },
    model:{
      prop:'model',
      event:'getValue'
    },
    watch: {
      model(newValue){
        this.formatValue(newValue)
      },
      value(newValue){
        this.submit(newValue)
      }
    },
    mounted(){
     this.formatValue(this.model)
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
      formatValue(value){
        switch (value) {
          case '是':
            this.value=true
            break
          case '否':
            this.value=false
            break
          case 0:
            this.value=true
            break
          case 1:
            this.value=false
            break
          case 'true':
            this.value=true
            break
          case 'false':
            this.value=false
            break
        }
      },
      submit(value){
        switch (this.valueFormat) {
          case 'chinese':
            this.$emit('getValue',value? '是':'否')
            break
          case 'english':
            this.$emit('getValue',value? 'yes':'no')
            break
          case 'number':
            this.$emit('getValue',value? 0:1)
            break
          case 'boolean':
            this.$emit('getValue',value)
            break
        }

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
