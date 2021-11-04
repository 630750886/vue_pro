<template>
  <div class="body">
    <div class="card-head">
      <el-col :span="2">
        <public-button
          name="WAN2SHAN4XIN4XI"
          title="完善信息"
          @click="$refs.upRef.openDialog(registerBase)"
        ></public-button>
      </el-col>
      <el-col :span="20">
        <div>
          处理人：{{ registerBase.dealt }}
          <work-remind-button
            v-if="btnListIndexOf('GONG1ZUO4TI2XING')"
            :person-id="registerBase.dealtid"
          ></work-remind-button>
        </div>
      </el-col>
    </div>
    <div class="card-main">
      <com-showinfo
        :data-base="registerBase"
        :label-prop-list="infoArray"
        :index="index"
        label="value"
      ></com-showinfo>
    </div>
    <up-basic-info-dialog
      ref="upRef"
      title="客户回访信息登记"
      width="55%"
      @getFormData="submitFormData"
    ></up-basic-info-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import UpBasicInfoDialog from "./dialog/UpBasicInfoDialog.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("maintenance");
export default {
  components: {
    UpBasicInfoDialog
  },
  props: {},
  watch: {},
  computed: {
    ...mapState({
      registerBase: "registerBase"
    })
  },
  //数据节点
  data() {
    return {
      dataInfo: "",
      infoArray: [
        { key: "customerName", value: "回访客户名称" },
        { key: "returnTime", value: "回访时间" },
        { key: "way", value: "回访方式" },
        { key: "types", value: "回访类型" },
        { key: "userName", value: "被访人姓名" },
        { key: "userDepartment", value: "被访人部门" },
        { key: "userDuty", value: "被访人职位" },
        { key: "userPhone", value: "被访人电话" },
        { key: "technologyQuality", value: "技术质量评价等级" },
        { key: "technologyQualityContent", value: "技术质量评价内容" },
        { key: "serverQuality", value: "服务质量评价等级" },
        { key: "serverQualityContent", value: "服务质量评价内容" },
        { key: "customerProposal", value: "客户意见及建议" },
        { key: "complaints", value: "是否有投诉", type: "boolean" },
        { key: "complaintsMan", value: "被投诉人" },
        { key: "praise", value: "是否有表扬", type: "boolean" },
        { key: "praiseMan", value: "被表扬人" },
        { key: "business", value: "回访涉及业务类型" },
        { key: "contractId", value: "合同编号" },
        { key: "contractName", value: "合同名称" },
        { key: "projectId", value: "项目编号" },
        { key: "projectName", value: "项目名称" },
        { key: "relationDepartment", value: "回访事件相关部门" },
        { key: "returnRecord", value: "回访记录" },
        {
          key: "returnvisitinformation_file",
          value: "相关回访资料",
          type: "file",
          btns: [{ name: "下载", type: "button" }]
        }
      ],
      index: 12
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetExamineResult(this.registerBase.keyid);
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkUpRegisterInfo: "networkUpRegisterInfo",
      networkGetExamineResult: "networkGetExamineResult"
    }),
    submitFormData(formData) {
      this.networkUpRegisterInfo(formData);
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  height: 550px;
  span {
    font-size: 16px;
  }
  .card-head {
    height: 30px;
    margin-bottom: 20px;
  }
  .card-main {
    position: relative;
    .show-data {
      width: 50%;
      p {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 5px;
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
