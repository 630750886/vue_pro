<!-- 异议处理登记 -->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
        <el-form-item label="提出异议的文件" prop="dissentSubmitFile">
          <upload-button v-model="form.dissentSubmitFile"></upload-button>
        </el-form-item>
        <el-form-item label="异议处理结果" prop="dissentDoWay">
          <rea-select
            v-model="form.dissentDoWay"
            prop="name"
            label="name"
            :data="[
              { id: 1, name: '异议驳回' },
              { id: 2, name: '异议接受' }
            ]"
          ></rea-select>
        </el-form-item>
        <el-form-item label="异议驳回文件">
          <upload-button v-model="form.dissentResultFile"></upload-button>
        </el-form-item>
        <template v-if="form.dissentDoWay === '异议接受'">
          <el-form-item label="异议接受">
            <rea-select
              v-model="form.pubobjectionDoWay"
              prop="name"
              label="name"
              :data="[
                { id: 1, name: '流标处理' },
                { id: 2, name: '废标处理' },
                { id: 3, name: '复审处理' }
              ]"
            ></rea-select>
          </el-form-item>
          <template
            v-if="
              form.pubobjectionDoWay !== '' &&
                form.pubobjectionDoWay !== '复审处理'
            "
          >
            <el-form-item label="发布类型">
              <el-select v-model="form.publicityKindKeyid" placeholder="请选择">
                <el-option
                    v-for="item in releaseType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="发布时间">
              <rea-datepicker
                v-model="form.pubobjectiondateTime"
              ></rea-datepicker>
            </el-form-item>
            <el-form-item label="发布网站">
              <rea-query-input
                  v-model="form.pubobjectionWeb"
                  url="pro/tawebsite/findall"
                  filter-obj="{}"
                  filter-key="webSiteName"
              ></rea-query-input>
            </el-form-item>
            <el-form-item
                :label="
                form.pubobjectionDoWay === '流标处理' ? '流标原因' : '废标原因'
              "
            >
              <rea-textarea v-model="form.pubobjectionDesc"></rea-textarea>
            </el-form-item>
            <el-form-item
              :label="
                form.pubobjectionDoWay === '流标处理'
                  ? '流标公示截图'
                  : '网站截图'
              "
            >
              <upload-button v-model="form.resultFile"></upload-button>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <dialog-button
        reset-btn="false" :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import {getTypeList} from '../../../../../../../../api/webapi-sys.js'
export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    },
    data: {}
  },
  watch: {
    "form.dissentDoWay": function(newValue) {
      if (newValue !== "异议接受") {
        this.form.pubobjectionDoWay = "";
        this.form.pubobjectionDesc = "";
        this.form.pubobjectionWeb = "";
        this.form.pubobjectiondateTime = "";
        this.form.ResultFile = "";
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        dissentSubmitFile: "",
        dissentDoWay: "",
        dissentResultFile: "",
        pubobjectionDoWay: "",
        pubobjectionDesc: "",
        pubobjectionWeb: "",
        pubobjectiondateTime: "",
        ResultFile: "",
        publicityKindKeyid:[]
      },
      releaseType:[],
      formRules: {
        dissentDoWay:{required: true, message: '请选择异议处理结果', trigger: 'change'}
      }
    };
  },
  //生命周期函数节点
  created() {
    getTypeList({code: 'TYPE-305'}).then(res=>{
      let itemList=[]
      res.data.forEach(item =>{
         let typeItem = {
            id:item.keyid,
            name:item.listname}
        itemList.push(typeItem)
      })
      this.releaseType=itemList
    })
  },
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = this.$myfunction.copyData(data);
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
