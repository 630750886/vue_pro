<template>
  <div>
    <el-button type="text" @click="dialogVisible=true">新增</el-button>
    <div>
      <el-table :data="data" stripe :show-header="true" border>
        <el-table-column label="单位名称" prop="othercompanyname" show-overflow-tooltip  width="150px" align="left"></el-table-column>
        <el-table-column label="第一次报价" prop="otherquotationsum1" show-overflow-tooltip align="left" width="150px"></el-table-column>
        <el-table-column label="第二次报价" prop="otherquotationsum2" show-overflow-tooltip align="left" width="150px"></el-table-column>
        <el-table-column label="第三次报价" prop="otherquotationsum3" show-overflow-tooltip align="left" width="150px"></el-table-column>
        <el-table-column align="right" width="50px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="remObj(scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" :append-to-body="true" width="300px" @close="dialogClose" :close-on-click-modal="false">
        <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
          <el-form-item label="单位名称" prop="othercompanyname">
            <el-input v-model="form.othercompanyname"></el-input>
          </el-form-item>
          <el-form-item label="第一次报价">
            <el-input v-model="form.otherquotationsum1" type="textarea" :rows="1"></el-input>
          </el-form-item>
          <el-form-item label="第二次报价">
            <el-input v-model="form.otherquotationsum2" type="textarea" :rows="1"></el-input>
          </el-form-item>
          <el-form-item label="第三次报价">
            <el-input v-model="form.otherquotationsum3" type="textarea" :rows="1"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitData">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title:'',
      model:{
        type:Array,
        default:()=>{
          return []
        }
      },
      typeList:{
        type:Array,
        default:()=>{
          return []
        }
      },
    },
    model:{
      prop:'model',
      event:'getData'
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
      this.data=this.model
    },
    watch: {
      model(newValue){
        this.data=newValue
      },
    },
    computed:{
    },
    //数据节点
    data() {
      return {
        isContent:false,
        data:[],
        dialogVisible: false,
        form:{
          othercompanyname:'',
          otherquotationsum1:'',
          otherquotationsum2:'',
          otherquotationsum3:'',
        },
        formRules:{}
      }
    },

    //自定义函数节点
    methods: {
      remObj(index){
        this.$emit('delData',this.$myfunction.copyData(this.data[index]))
        this.data.splice(index,1)
        this.$emit('getData',this.$myfunction.copyData(this.data))

      },
      submitData(){
        this.data.push(this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      resetForm() {
        this.form=this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
