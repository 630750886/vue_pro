<template>
  <div >
    <div  class="num">
      <el-input-number :size="size" v-model="num1"
                       :controls="false" @blur="getData2" ></el-input-number>
    </div>
    <div class="num">-</div>
    <div class="num">
      <el-input-number :size="size" v-model="num2"
                       :controls="false" @blur="getData"></el-input-number>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: '',
      size:{
        type:String,
        default:'mini'
      }
    },
    model: {
      prop: 'model',
      event: 'getData'
    },
    computed: {},
    //数据节点
    data() {
      return {
        num1: '',
        num2: '',
        array: []
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      getData() {
        if (this.num1 > this.num2) {
          this.array.splice(0, 2, this.num2, this.num1)
        } else {
          this.array.splice(0, 2, this.num1, this.num2)
        }
        this.$emit('getData', this.array)
      },
      getData2() {
        if (this.num1 > this.num2) {
          this.array.splice(0, 2, this.num2, this.num1)
        } else {
          this.array.splice(0, 2, this.num1, this.num2)
        }
        this.$emit('getData', this.array)
      },
      resetData() {
        Object.assign(this.$data, this.$options.data());
      }

    }
  }
</script>
<style lang='less' scoped>
  .num{
		float: left;
	}
</style>
