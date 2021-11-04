<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
        <el-form-item label="分包名称" prop="bidsectionname">
         <el-input v-model="form.bidsectionname" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否中标" prop="iswinbidding">
         <com-truefalse v-model="form.iswinbidding"></com-truefalse>
        </el-form-item>
        <el-form-item label="中标通知书" prop="winbiddingfile">
            <upload-button v-model="form.winbiddingfile" size="max" module-type="tb" :base-id="item.keyid" file-name="中标通知书"></upload-button>
          </el-form-item>
        <el-form-item label="中标价">
            <el-input v-model="form.winbiddingsum" type="textarea" :rows="1"></el-input>
          </el-form-item>
          <rea-divider title="其他单位中标情况"></rea-divider>
          <bid-template v-model="form.winbidlist" :filter-keyid="form.keyid" @delData="item=>{delWinbidlist.push(item)}"></bid-template>
          <rea-divider></rea-divider>
          <el-form-item label="中标结果截图">
            <upload-button v-model="form.bidopeningimagefile" size="max" module-type="tb" :base-id="item.keyid" file-name="中标结果截图"></upload-button>
          </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="确 定"  :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import BidTemplate from '../acomponents/BidTemplate.vue'
  import {mapState} from  'vuex'
  export default {
    components: {
      BidTemplate,
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {
      'form.iswinbidding':function (newValue) {
        if (!newValue){
          this.form.winbiddingfile='';
          this.form.winbiddingsum='';
        }
      }
    },
    computed:{
      ...mapState('bidManager',{
        item:'item'
      })
    },
    //数据节点
    data() {
      return {
        index:1,
        dialogVisible: false,
        delWinbidlist:[],
        form:{
          iswinbidding:'',
          winbiddingfile:'',
          winbiddingsum:'',
          winbidlist:[],
          bidopeningimagefile:'',
        },
        formRules:{},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
        //this.delWinbidlist=[]
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form),this.$myfunction.copyData(this.delWinbidlist))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
