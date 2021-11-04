<template>
  <!--移交合同-->
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <!--0 合同 1  补充协议 2   委托书 3  其它  -->
         <el-form :model="form" ref="formRef" label-width="75px">
          <el-form-item label="资料名称" prop="resourcename">
            <el-select v-model="form.turnOverFileTypeKeyId" placeholder="请选择资料名称" @change="getsealType">
                <el-option
                v-for="item in turntype"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="份数" prop="copies">
            <el-input-number
              style="width: 70%"
              v-model="form.copies"
            ></el-input-number>
          </el-form-item>
        </el-form>
      <dialog-button
        :reset-btn="{ show: false }"
        :cancelBtn="{show:false}"
        :okBtn="{title:'移交'}"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

export default {
  components: {},
  props: {
    title: { type: String },
    width: {
      type: String,
      default: "25%"
    }
  },
  watch: {
  },
  //数据节点
  data() {
    return {
      turntype:[
              {code:"0",name:"合同"},
              {code:"1",name:"补充协议"},
              {code:"2",name:"委托书"}
      ],
      dialogVisible: false,
      form: {
        contracttypecode: "", //类型编号
        contracttypename: "", //类型名称
        contractkeyid: "", //合同id
        contractcode: "", //合同编号
        contractname: "", //合同名称
        outpersonkeyid: "", //移交人id
        outperson: "", //移交人
        outOrgkeyid: "", //移交组织id
        outOrgName: "", //移交组织名称
        descinfo: "", //备注，
        isOutPerson: true,
        turnOverFileTypeKeyId: "0", //文档id
        turnOverFileTypeName: "合同", //文档名称
        trunoverstatus: "移交中",
        showReceive:true,//接收人显示
        showflage:true,
        resourcename:"合同",//资料名称
        copies:""//份数
      },
      addReceiveList: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    getsealType(data){
      let ditem= this.turntype.find((item,index)=>{
        if(item.id=== data){
        return item;
      }
        })
      this.form.turnOverFileTypeKeyId=ditem.code;
      this.form.turnOverFileTypeName=ditem.name;
      this.form.resourcename=ditem.name;
      },
    getTransferInfo(formData) {
      this.addReceiveList.push(
        this.$myfunction.copyData(Object.assign(this.form, formData))
      );
    },
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        let ref = this.$myfunction.copyData(data);
        this.form.contracttypecode = ref.contractTypecode;
        this.form.contracttypename = ref.contractTypename;
        this.form.contractkeyid = ref.keyid;
        this.form.contractcode = ref.contractCode;
        this.form.contractname = ref.contractName;
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      //this.$emit("getFormData", this.$myfunction.copyData(this.addReceiveList));
      this.dialogClose();
    },
    resetForm() {
      this.addReceiveList = [];
      this.form = this.$options.data().form;
    },
    removeReceiveList(key) {
      this.addReceiveList.splice(key, 1);
    }
  }
};
</script>
<style lang="less" scoped>
table {
  width: 100%;
  tr {
    width: 100%;
    min-height: 35px;
    td {
      top: 50%;
      min-width: 75px;
      max-width: 250px;
    }
  }
}
</style>
