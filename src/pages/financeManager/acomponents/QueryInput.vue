<template>
  <div>
    <el-autocomplete
            class="inline-input"
            v-model="value"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect" :readonly="readonly"></el-autocomplete>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      readonly:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      this.restaurants=this.loadAll()
    },
    watch: {
      readonly(newValue){
        console.log(newValue)
      }
    },
    //数据节点
    data() {
      return {
        restaurants:[],
        value:'',
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      querySearch(queryString, cb) {
        const restaurants = this.restaurants;
        const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          {value:'张三'},
          {value:'李三'},
          {value:'王三'},
          {value:'张山峰'},
          {value:'张强'},
          {value:'李世民'},
          {value:'赵六'},
          {value:'王莽'},
        ];
      },
      handleSelect(value){
        this.$emit('getData',value)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
