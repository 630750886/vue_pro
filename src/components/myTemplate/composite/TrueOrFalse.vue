<template>
    <el-radio-group v-model="value" :size="size">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-radio  :label="trueValue">{{trueTitle}}</el-radio>
        </el-col>
        <el-col :span="12">
          <el-radio :label="falseValue">{{falseTitle}}</el-radio>
        </el-col>
      </el-row>
    </el-radio-group>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model:'',
      size:'',
      valueFormat:{
        type:String,
        default:''// number english chinese boolean
      },
      trueTitle:{
        type:String,
        default: '是'
      },
      falseTitle:{
        type:String,
        default: '否'
      }
    },
    model:{
      prop:'model',
      event:'getValue'
    },
    watch: {
      model(newValue){
        this.value=newValue
        if (this.value === 'true') {
          this.value=true
        }else if (this.value === 'false') {
          this.value=false
        }
      },
      value(newValue){
        this.submit(newValue)
      },

    },
    mounted(){
      this.value=this.model
      if (this.value === 'true') {
        this.value=true
      }else if (this.value === 'false') {
        this.value=false
      }
      if (this.valueFormat === '') {
        if (this.trueTitle !== '是'){
          this.trueValue=this.trueTitle
        }
        if (this.falseTitle !== '否') {
          this.falseValue=this.falseTitle
        }
      }
    },
    //数据节点
    data() {
      return {
        value:'',
        falseValue:false,
        trueValue:true,
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      formatValue(value){
        switch (value) {
          case this.trueTitle:
            this.trueValue=this.trueTitle
            this.value=this.trueTitle
            break
          case this.falseTitle:
            this.falseValue=this.falseTitle
            this.value=this.falseTitle
            break
          default:
            this.value=value
            break
        }
      },
      submit(value){
        switch (this.valueFormat) {
          case 'chinese' || 'chi':
            this.$emit('getValue',value?'是':'否')
            break
          case 'english' || 'eng':
            this.$emit('getValue',value? 'yes':'no')
            break
          case 'number' || 'num':
            this.$emit('getValue',value? 0:1)
            break
          case 'boolean' || 'bol':
            this.trueValue=true
            this.falseValue=false
            this.$emit('getValue',value)
            break
          default:
            this.$emit('getValue',value)
            break
        }

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
