<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="申请人" prop="k1">
          <el-input v-model="form.k1.value" clearable></el-input>
        </el-form-item>
        <el-form-item label="资料名称" prop="k2">
          <el-input v-model="form.k2.value" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请组织">
          <station :options="loadData"
                   :label-prop1="{label: '',prop:'organize'}"
                   :show-position="false"
                   label-width="0px" ref="station" @getData="getStationData"></station>
        </el-form-item>
      </el-form>
      <dialog-button ok-btn="筛 选" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import Station from '../../../components/Station.vue'
  export default {
    components: {
      Station
    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      },
      loadData:{
        type: Object,
        default: ()=>{
          return {}
        }
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          k1:{value:'',op:'like'},
          k2:{value:'',op:'like'},
          k3:{value:'',op:'eq'}
        },
        formRules:{}

      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(){
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
      },
      submitFormData(){
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      getStationData(data) {
        let str=''
        if (data.length > 0) {
          data.forEach(val=>{
            str=str+val+'/'
          })
        }
        this.$set(this.form,'organize',str)
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
