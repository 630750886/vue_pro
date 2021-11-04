<template>
  <el-cascader
          style="width: 100%"
          :key="componentKey"
          ref="casRef"
          v-model="value"
          :options="data"
          :props="props"
          :size="size"
          :filter-method="beforeFilter(data,value1)"
          clearable
          :show-all-levels="true"
          @change="handleChange"></el-cascader>


</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: '',
      data: '',
      size: '',
      valueFormat: {
        type: String,
        default: 'value'
      },
      label: {
        type: String,
        default: 'label'
      },
      prop: {
        type: String,
        default: 'keyid'
      },
      emitPath: {
        type: Boolean,
        default: true
      },
      checkStrictly: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'model',
      event: 'getValue'
    },
    mounted() {

    },
    watch: {
      model(newValue) {
        if (this.valueFormat === 'value') {
          this.value1 = newValue
        } else {
          this.value = newValue.split('/')
        }
      },
      value1(newValue) {
        if (newValue === '') {
          this.value=[]
        }
        this.forceRerender(false)
      },
    },
    //数据节点
    data() {
      return {
        componentKey: 1,
        value: [],
        value1: '',
        props: {
          value: this.prop,
          label: this.label,
          emitPath: this.emitPath,
          checkStrictly: this.checkStrictly,
        },
        nodeName: []
      }
    },
    //生命周期函数节点
    created() {
      if (this.valueFormat === 'value') {
        this.findNode(this.data, this.model)
      } else {
        this.value = this.model.split('/')
      }
    },
    //自定义函数节点
    methods: {
      beforeFilter(node, keyword) {
        if (this.valueFormat === 'value') {
          node.forEach(item=>{
            if (item[this.prop] === keyword) {
              return true
            }else if (!this.$myfunction.isEmpty(item.children)) {
              this.beforeFilter(item.children,keyword)
            }
          })
        }
      },
      forceRerender(value) {
        if (!value) {
          this.$refs.casRef.dropDownVisible = false
          setTimeout(() => {
            this.componentKey++
          }, 1)
        }
      },
      handleChange(value) {
        if (value.length > 0) {
          if (this.valueFormat === 'value') {
            this.$emit('getValue', this.$myfunction.copyData(value[this.value.length - 1]))
            this.returnObject()
          } else if (value.length <= 0) {
            this.$emit('getValue', '')
          } else {
            this.$emit('getValue', value.join('/'))
            this.returnObject()
          }
        }else {
          this.$emit('getValue','')
        }
        this.forceRerender(false)
      },
      findNode(array, condition) {
        if (Array.isArray(array) && !this.$myfunction.isEmpty(condition)) {
          array.forEach(item => {
            if (item[this.prop] !== condition && !this.$myfunction.isEmpty(item.children)) {
              this.findNode(item.children, condition)
            } else if (item[this.prop] === condition) {
              this.value.push(condition)
              this.findNode(this.data, item.pkeyid)
            }
          })
        }
        this.value.reverse()
      },
      returnObject() {
        let ref = this.$refs.casRef.getCheckedNodes()
        this.getNodeName(ref[0])
        this.$emit('getLabel', this.$myfunction.copyData(this.nodeName.reverse().join('/')))
        this.$emit('getObject', ref[0].data)
        this.nodeName = []
      },
      getNodeName(node) {
        let _this = this
        _this.nodeName.push(node[this.label])
        if (!_this.$myfunction.isEmpty(node.parent)) {
          _this.getNodeName(node.parent)
        }
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
