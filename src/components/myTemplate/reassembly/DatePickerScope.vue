<template>
<el-row>
    <el-col :span="11">
      <el-date-picker :type="date" placeholder="选择开始日期" :format="format" :value-format="valueFormat" v-model="value_begin" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-date-picker :type="date" placeholder="选择结束日期" :format="format" :value-format="valueFormat" v-model="value_end" style="width: 100%;" @change="handleClick"></el-date-picker>
    </el-col>
  </el-row>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    props: {
      model: '',
      valueType: {
        type: String,
        default: 'string'
      },
      type: {
        type: String,
        default: 'daterange'
      },
      date:{
        type: String,
        default: 'date'
      },
    },
    model: {
      prop: 'model',
      event: 'getValue'
    },
    
    mounted() {
      switch (this.type) {
        case 'datetimerange':
          this.format = 'yyyy/MM/dd HH:mm'
          this.valueFormat = 'yyyy/MM/dd HH:mm'
          this.date="datetime"
          break
        case 'daterange':
          this.format = 'yyyy/MM/dd'
          this.valueFormat = 'yyyy/MM/dd'
          break
        case 'monthrange':
          this.format = 'yyyy/MM'
          this.valueFormat = 'yyyy/MM'
          break
        default:
          this.format = 'yyyy/MM/dd'
          this.valueFormat = 'yyyy/MM/dd'
          break
      }
      if (Array.isArray(this.model) && !this.$myfunction.isEmpty(this.model)){
       this.value_begin=this.model[0];
       this.value_end=this.model[1];
      }
      if (!Array.isArray(this.model) && !this.$myfunction.isEmpty(this.model)) {
        this.value = this.model.split('-')
        this.value_begin=this.value[0];
        this.value_end=this.value[1];
      } else {
        this.value = this.model
      }
    },
    //数据节点
    data() {
      return {
        value: [],
        value_begin:"",
        value_end:"",
        format: 'yyyy/MM/dd',
        valueFormat: 'yyyy/MM/dd'
      }
    },
    //自定义函数节点
    methods: {
      handleClick() {
        if (this.valueType === 'string') {
          this.$emit('getValue', this.value_begin+"-"+this.value_end)
        } else {
          this.$emit('getValue', [this.value_begin,this.value_end])
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
