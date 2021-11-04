<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-form-item label="模板名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="保 存"  :cancelBtn="{show:false}"
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
        form: {
          contractType: '',
          contractCode: '',
          contractName: '合同一',
          itemCode: '',
          itemName: '',
          majorProject: '',
          decisionType: '',
          itemType: ''
        },
        formRules: {},
        contractType: [
          {id: 1, name: '单合同'},
          {id: 2, name: '综合业务'},
          {id: 3, name: '全咨业务'},
        ],
        majorProject: [
          {id: 1, name: '房屋建筑工程'},
          {id: 2, name: '市政公用工程'},
          {id: 3, name: '化工石油工程'},
          {id: 4, name: '水利水电工程'},
          {id: 5, name: '公路工程'},
          {id: 6, name: '铁路工程'},
          {id: 7, name: '电力工程'},
          {id: 8, name: '农林工程'},
          {id: 9, name: '通信工程'},
          {id: 10, name: '机电安装工程'},
          {id: 11, name: '港口与航道工程'},
          {id: 12, name: '航天航空工程'},
          {id: 13, name: '冶炼工程'},
          {id: 14, name: '矿山工程'},
          {id: 15, name: '其他'},
        ],
        decisionType: [
          {id: 1, name: '审批制'},
          {id: 2, name: '核准制'},
          {id: 3, name: '备案制'},
          {id: 4, name: '其他'},
        ],
        itemType: [
          {
            id: 1, name: '咨询', children: [
              {id: 1.0, name: '项目建议书'},
              {id: 1.1, name: '可行性研究报告'},
              {id: 1.2, name: '环境影响评价'},
              {id: 1.3, name: '交通影响评价'},
              {id: 1.4, name: '社会稳定风险评价'},
              {id: 1.5, name: '水土保持评价'},
              {id: 1.6, name: '安全评价'},
              {id: 1.7, name: '绿色建筑评价'},
              {id: 1.8, name: '节能评估'},
              {id: 1.9, name: '地质灾害危险性评估'},
              {id: 1.10, name: 'PPP实施方案'},
              {id: 1.11, name: '其他'},
            ]
          },
          {
            id: 2, name: '评价', children: [
              {id: 2.0, name: '财政绩效评价'},
              {id: 2.1, name: '项目后评价'},
              {id: 2.2, name: '其他'},
            ]
          },
          {
            id: 3, name: '评审', children: [
              {id: 3.0, name: '初设评审'},
              {id: 3.1, name: '可研评审'},
              {id: 3.2, name: '其他'},
            ]
          },
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
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
