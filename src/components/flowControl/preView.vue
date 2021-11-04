<template>
  <div>
    <el-dialog title="查看附件" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose"  :close-on-click-modal="false">
     <div>
         <div v-for="(item,index) in data" :key="index">
             <el-link type="primary" @click="viewClick(item)">{{item.fileName}}</el-link> 
         </div>
     </div>

      <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </div>
      <!-- <dialog-button reset-btn="false" ok-btn="关 闭" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button> -->
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
   import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      },
      data:{
          type:Array,
          default:()=>{
              return [];
          }
      }
    },
    watch: {},
    //数据节点
    data() {
      const number=(rule, value, cb)=>{
        const regNumber=/^[1-9]\d{0,2}$/
        if (regNumber.test(value)) {
          return cb()
        }
        cb(new Error('至多输入除0开始的3位数'))
      }
      return {
        dialogVisible:false,
        form:{
          k1:'',
          k2:''
        },
        formRules:{
          k1:[
            {
              required: true,
              message: '请输入',
              trigger: 'blur'
            },
            { validator: number, trigger: 'blur' }
          ]
        }
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
        ...mapActions({
           previewAttach:'flowManager/preViewAttach'
        }),
      openDialog(){
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
       // this.$refs.formRef.resetFields()
      },
      submitFormData(){
       // this.$emit('getFormData',this.$myfunction.copyData(this,form))
        this.dialogClose();
      },
      viewClick(data){
          // console.log(data);
          this.previewAttach(data);
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
