<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="合同编号">
                <el-select v-model="form.contractType" placeholder="请选择">
                  <el-option
                          v-for="item in contractType"
                          :key="item.id"
                          :label="item.name"
                          :value="item.name">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <contract-select-template title="项目管理" ></contract-select-template>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="合同名称">
              <el-input v-model="form.contractName" readonly></el-input>
            </el-form-item>
            <el-form-item label="专业工程分类" label-width="100px">
              <el-select-template :data="majorProject" v-model="form.majorProject"></el-select-template>
            </el-form-item>

          </el-col>
          <el-col :span="8">
            <el-form-item label="项目编号">
              <el-input v-model="form.itemCode" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input v-model="form.itemName" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <dialog-button reset-btn="false" ok-btn="保 存" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form:{
          contractType:'',
          contractCode:'',
          contractName:'合同一',
          itemCode:'',
          itemName:'',
          majorProject:'',
          decisionType:'',
          itemType:''
        },
        formRules:{},
        contractType:[
          {id:1,name:'单合同'},
          {id:2,name:'综合业务'},
          {id:3,name:'全咨业务'},
        ],
        majorProject:[
          {id:1,name:'房屋建筑工程'},
          {id:2,name:'市政公用工程'},
          {id:3,name:'化工石油工程'},
          {id:4,name:'水利水电工程'},
          {id:5,name:'公路工程'},
          {id:6,name:'铁路工程'},
          {id:7,name:'电力工程'},
          {id:8,name:'农林工程'},
          {id:9,name:'通信工程'},
          {id:10,name:'机电安装工程'},
          {id:11,name:'港口与航道工程'},
          {id:12,name:'航天航空工程'},
          {id:13,name:'冶炼工程'},
          {id:14,name:'矿山工程'},
          {id:15,name:'其他'},
        ],
        decisionType:[
          {id:1,name:'审批制'},
          {id:2,name:'核准制'},
          {id:3,name:'备案制'},
          {id:4,name:'其他'},
        ],
        itemType:[
          {id:1,name:'非全过程',children:[
              {id:1.0,name:'决策阶段',children:[
                  {id:'1.0.1',name:'投资估算编制'},
                  {id:'1.0.2',name:'投资估算审核'}
                ]},
              {id:1.1,name:'设计阶段',children:[
                  {id:'1.1.1',name:'设计概算编制'},
                  {id:'1.1.2',name:'设计概算审核'},
                  {id:'1.1.3',name:'施工图预算编制'},
                  {id:'1.1.4',name:'施工图预算审核'},
                ]},
              {id:1.2,name:'发承包阶段',children:[
                  {id:'1.2.1',name:'清单及限价编制'},
                  {id:'1.2.2',name:'清单及限价审核'},
                  {id:'1.2.3',name:'投标报价的编制'},
                  {id:'1.2.4',name:'投标报价的审核'},
                ]},
              {id:1.3,name:'竣工阶段',children:[
                  {id:'1.3.1',name:'竣工结算编制'},
                  {id:'1.3.2',name:'竣工结算审核'},

                ]},
            ]},
          {id:2,name:'全过程'},
          {id:3,name:'造价鉴定'},
          {id:4,name:'其他'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
