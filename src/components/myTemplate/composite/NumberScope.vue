<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="11">
        <el-input-number style="width: 100%;" size="small" v-model="num1"
                         :controls="false"></el-input-number>
    </el-col>
    <el-col :span="2">
      <div class="mun-1">-</div>
    </el-col>
    <el-col :span="11">
        <el-input-number style="width: 100%;" size="small" v-model="num2"
                         :controls="false"></el-input-number>
    </el-col>


  </el-row>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: ''
    },
    model: {
      prop: 'model',
      event: 'getData'
    },
    watch:{
      model(newValue){
        this.array=newValue
        this.num1=newValue[0]
        this.num2=newValue[1]
      },
      num1(newValue){
        this.array.splice(0, 1, newValue)
      },
      num2(newValue){
        this.array.splice(1, 1, newValue)
      },
      array(newValue){
        if (newValue[0] > newValue[1]) {
          newValue.reverse()
        }

        this.$emit('getData', newValue)
      }
    },
    computed: {},
    //数据节点
    data() {
      return {
        num1: undefined,
        num2: undefined,
        array: [0,0]
      }
    },
    //生命周期函数节点
    created() {
      this.array=this.model
    },
    //自定义函数节点
    methods: {

    }
  }
</script>
<style lang='less' scoped>
  .mun-1 {
    text-align: center;
  }
  .input{
    background: #409EFF;
  }
</style>
