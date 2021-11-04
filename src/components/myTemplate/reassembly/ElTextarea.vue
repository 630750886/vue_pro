<template>
  <el-input type="textarea"
            autosize
            v-model="value"
            :clearable="clearable"
            :readonly="readonly"
            :rows="1"
            @input="submit"></el-input>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: '',
      minHeight: {
        type: String,
        default: '2',
      },
      maxHeight: {
        type: String,
        default: '4',
      },
      clearable: {
        type: Boolean,
        default: false
      },
      readonly:{
        type: Boolean,
        default: false
      },
    },
    model: {
      prop: 'model',
      event: 'getData'
    },
    watch: {
      model(newValue) {
        this.value = newValue
      },
      minHeight(newValue){
        if (parseInt(newValue)>parseInt(this.maxHeight)) {
          this.maxHeight=newValue
        }
      }
    },
    mounted() {
      this.value = this.model
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
      submit() {
        this.$emit('getData', this.$myfunction.copyData(this.value))
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
