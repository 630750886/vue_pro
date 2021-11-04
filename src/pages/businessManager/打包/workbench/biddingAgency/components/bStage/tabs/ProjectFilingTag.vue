<template>
	<div class="b-main">
		<com-document is-add-means button-title="新建" file-label="资料名称" code="TYPE-166"></com-document>
	</div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddWorkDialog from "../dialog/AddWorkDialog.vue"
  import HeadRightButton from "../button/HeadRightButton.vue"
  import {mapState} from 'vuex'
  import {getRecordItem,addRecordItem,upRecordItem,delRecordItem} from '../../../../../../../api/workbench/webapi-biddingAgency.js'
  export default {
    components: {
      AddWorkDialog,
      HeadRightButton,
    },
    props: {
    },
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        materialInfo: [],
      }
    },
    //生命周期函数节点
    created() {},
    //自定义函数节点
    methods: {
      networkGetDatas(){
        let ref={
          projectKeyid:this.currentItem.keyid,
          resourceTypeKeyid:'2',//备案
        }
        getRecordItem(ref).then(item=>{
          this.materialInfo=item.data
        })
      },
      networkAddData(formData){
        let ref={
          projectKeyid:this.currentItem.keyid,
          resourceTypeKeyid:'2',
          resourceTypeName:'备案',
        }
        Object.assign(formData,ref)
        addRecordItem(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delRecordItem(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      }
    }
  }
</script>
<style lang='less' scoped>
	.b-main {
		height: 80%;
	}

</style>

