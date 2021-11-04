<template>
  <div>
    <el-select v-model="value" :multiple="multiple" placeholder="请选择">
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
      model:{},
      prop:{
        type:Object,
        default:()=>{
          return {
            label:'name',
            value:'id'
          }
        }
      },
      //vselect:{type:Object,default:{}},
      data:{type:Array,default:[]},
      multiple:{
        type:Boolean,
        default:false
      }
    },
    model:{
      prop:'model',
      event:'getData'
    },
    watch: {
      value(newValue){
        this.handleClick(newValue)
      }
    },
    //数据节点
    data() {
      return {
        value:'',
      }
    },
    //生命周期函数节点
    created() {
      //this.value=this.vselect.id;
    },
    //自定义函数节点
    methods: {
      handleClick(value){
        let inode= this.data.find(item => {
            //这里的判断条件按你需求来写
            if (item.id==value)
            {
              return item;
            } 
          });
        this.$emit('getData',inode)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
