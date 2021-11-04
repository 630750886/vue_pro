<template>
  <div>
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="main">
      <basic-info-template :label-prop-list="labelProp"></basic-info-template>
    </div>
    <div class="dialog">
      <up-dialog ref="upRef"></up-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from '../button/HeadButton.vue'
  import BasicInfoTemplate from '../../../../../../components/BasicInfoTemplate.vue'
  import UpDialog from '../dialog/RegulationsDialog.vue'
  export default {
    components: {
      HeadButton,
      BasicInfoTemplate,
      UpDialog
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        labelProp:[
          {key:'',value:'制度类型'},
          {key:'',value:'制度名称'},
          {key:'',value:'制度编号'},
          {key:'',value:'内容摘要'},
          {key:'',value:'制度发布日期'},
          {key:'',value:'制度执行时间'},
          {key:'',value:'制度涉及的组织'},
          {key:'',value:'制度电子版',type:'file',btns:[{name:'下载',type:'button'}]},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.$refs.upRef.openDialog()
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
