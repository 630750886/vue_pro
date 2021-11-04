<template>
  <div>
    <el-dialog :title="title" :visible.sync="addStationDialogVisible" width="30%" @close="dialogClose" :close-on-click-modal="false">
      <station ref="stationRef" :options="{organize:loadData.organizeList,position:loadData.positionList}" direction="col"></station>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components:{

    },
    props:{
      title:'',
      personId:'',
      loadData:''
    },
    //数据节点
    data () {
      return {
        addStationDialogVisible:false,
        addForm:{
          id:this.personId,
        }
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      getFormData(data){
        //Object.assign(this.addForm,data)
        let _this=this
        let array=Object.keys(data)
        array.forEach(function (attr) {
          _this.$set(_this.addForm,attr,data[attr])
        })
      },
      dialogClose(){
        this.addForm=this.$options.data().addForm
        this.$refs.station.resetForm()
      },
      openDialog(){
        this.addStationDialogVisible=true
      },
      submitFormData(){
        this.dialogClose()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
