<template>
  <div>
    <el-button type="text" @click="dialogVisible=true">新增</el-button>
    <div>
      <el-table :data="data" stripe :show-header="true" border>
        <el-table-column label="单位名称" prop="othercompanyname" show-overflow-tooltip align="left" width="260px"></el-table-column>
        <el-table-column label="中标价" prop="winbiddingsum" show-overflow-tooltip align="left" width="342px"></el-table-column>
        <el-table-column align="right" label="操作" width="50px">
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
          <el-form-item label="中标价" prop="winbiddingsum">
            <el-input v-model="form.winbiddingsum" type="textarea" :rows="1"></el-input>
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
      filterKeyid:{
        type:String,
        default:''
      },
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
          winbiddingsum:'',
          iswinbidding:true
        },
        formRules:{}
      }
    },

    //自定义函数节点
    methods: {
      remObj(index){
        let delRef=this.data.splice(index,1)
        if (delRef[0].keyid) {
          this.$emit('delData',delRef[0])
        }
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
