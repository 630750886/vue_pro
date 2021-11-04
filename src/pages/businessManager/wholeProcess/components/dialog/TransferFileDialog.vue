<template>
  <!--移交合同-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <template v-for="(item,key) in transferType">
          <el-row>
            <el-col :span="8">
              <el-checkbox v-model="checked[key]">{{item.name}}</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-form-item label="移交份数" prop="number">
                <el-input-number size="mini" v-model="form.number"
                                 ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="接收人" prop="receiveMan">
                <el-input type="text" v-model="form.receiveMan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-form-item label="其他重要文件" label-width="110px">
          <el-button type="text" @click="addReceive">新增移交文件</el-button>
        </el-form-item>
        <template v-for="(item,key) in addReceiveList">
          <el-row>
            <el-col :span="8">
              <el-form-item label="移交文件名称" prop="transferType" label-width="110px">
                <el-input v-model="item.transferType" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="移交份数" prop="number">
                <el-input-number v-model="item.number" size="mini"
                                 ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="接收人" prop="receiveMan">
                <el-input v-model="item.receiveMan" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="removeReceiveList(key)" style="margin-left: 20px">移除</el-button>
            </el-col>
          </el-row>
        </template>

      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {

    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          transferType:'',
          number:'',
          receiveMan:'',
          tackedList:[]
        },
        formRules:{},
        transferType:[
          {keyid:1,name:'全过程工程咨询评价意见函'},
        ],
        addReceiveList:[],
        checked:[false,false,false]
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
        this.resetForm()
      },
      submitFormData(){
        this.form.tackedList=this.addReceiveList
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm(){
        this.addReceiveList=this.$options.data().addReceiveList
        this.$refs.formRef.resetFields()
      },
      addReceive(){
        this.addReceiveList.push({transferType:'', number:'', receiveMan:'',})
      },
      removeReceiveList(key){
        this.addReceiveList.splice(key,1)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
