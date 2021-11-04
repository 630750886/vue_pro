<template>
  <el-dialog :visible.sync="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
      <el-row>
        <el-col :span="24">
            <el-form-item label="发票号">
                <rea-query-input-Net
                  v-model="form.billNo"
                  url="getbill"                 
                  filter-key="billNo"
                  @getObject="
                    item => {
                        form.billId=item.keyid;                                            
                    }"
                >

                </rea-query-input-Net>
            </el-form-item>
        </el-col>       
      </el-row>      
    </el-form>

    <dialog-button
      :resetBtn="{ show: false }"
      :cancelBtn="{show:false}"
      okBtn="确 定"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from "../../../acomponents/DialogButton.vue";
import Station from "../../../acomponents/Station.vue";
import { getAllBill } from "../../../../../api/webapi-fin.js";
import {mapState,mapActions} from "vuex";
export default {
  components: {
    DialogButton,
    Station
  },
  props: {
    title: {
      type: String,
      dealt: ""
    },
    data:{
        type:Object,
        default:()=>{
            return {};
        }
    }
  },
  watch: {
    title(newValue) {
      this.title = newValue;
    }
  },
  computed:{
    ...mapState({
      //orgTree: state => state.loadType.organizeList//state.orgAndPost.orgTree
    })
  },
  mounted() {
   
  },
  data: function() {
    return {
       optionProps: {
        value: "keyid",
        label: "label",
        children: "children"
      },
      //父窗口传递的弹窗标题
      title1: this.title,
      //弹窗显示控制
      dialogVisible: false,
      //表单对象
      form: {       
      },
      //表单验证规则
      formRules: {}
    };
  },

  methods: {
   
    //设置弹窗显示
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    getBill(dt){
         let pa = { page: 1, limit: 30, where: "billtype=1" };
      pa = { jsondata: JSON.stringify(pa) };
        getAllBill(pa).then(res=>{
            if(res.code==200){
                dt = res.data;
            }
        })
    }
  }
};
</script>

<style scoped>
</style>
