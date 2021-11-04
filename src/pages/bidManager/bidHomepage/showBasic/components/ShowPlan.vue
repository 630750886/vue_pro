<template>
  <div class="body">
    <div class="head-box">
      <public-button
        name="FREE"
        title="完善信息"
        @click="$refs.itemRef.openDialog(item)"
      ></public-button>
    </div>
    <div class="main-box">
      <com-showinfo
        :data-base="item"
        :label-prop-list="labelProp"
        index="18"
        label="label"
      ></com-showinfo>
    </div>
    <div class="dialog">
      <item-registration
        ref="itemRef"
        @getFormData="networkUpData"
      ></item-registration>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import ItemRegistration from "./dialog/ItemRegistration.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ItemRegistration
  },
  props: {},
  watch: {},
  computed: {
    ...mapState("bidManager", {
    item: "item"
    })
  },
  onMounted(){
    console.log(this.item);
  },
  //数据节点
  data() {
    return {
      labelProp: [
        { key: "projectname", label: "项目名称" },
        { key: "vocationaltypename", label: "业务类型" },
        { key: "proprietor", label: "项目业主" },
        { key: "tenderee", label: "招标人" },
        { key: "tendereeleading", label: "负责人" },
        { key: "tendereeleadingphone", label: "联系电话" },
        { key: "biddingagency", label: "招标代理机构" },
        { key: "biddingagencyleading", label: "机构负责人" },
        { key: "biddingagencyleadingphone", label: "机构联系电话" },
        {key: "webimgfile",label: "网站截图",type: "file",btns: [{ name: "下载", type: "button" }]},
        { key: "weburladdress", label: "网站链接" },
        {key: "accesstradingcentre",label: "是否进交易中心",type: "boolean"},
        { key: "tradingcentrename", label: "交易中心名称" },
        { key: "placebidopening", label: "开标地点" },
        { key: "applicantbegindatetime", label: "报名开始时间" },
        { key: "applicantenddatetime", label: "报名结束时间" },
        { key: "bidopeningdateTime", label: "开标时间" },
        {key: "tenderfile",label: "招标文件",type: "file",btns: [{ name: "下载", type: "button" }]},
        {key: "tenderfileclarification",label: "招标文件澄清及修改",type: "file",btns: [{ name: "下载", type: "button" }]},
        {key: "", label: "招标文件分析", type: "title" },
        {key: "personanalyse", label: "人员分析" },
        {key: "achievementanalyse", label: "业绩分析" },
        {key: "administrationanalyse", label: "行政分析" },
        {key: "keypointanalyse", label: "重点分析" },
        {key: "", label: "", type: "title" },
        {key: "isrejoin", label: "是否需要答辩", type: "boolean" },
        {key: "rejoinperson", label: "答辩人员" },
        {key: "giveupbiddingdesc", label: "放弃投标理由" },
        {key: "applicant", label: "报名人" },
        {key: "applicantdatetime", label: "报名时间" },
        {key: "applicantsum", label: "文件费(元)" },
        {key: "formtendername", label: "投标形式" },
        {key: "tenderername", label: "投标主体" },
        {key: "istenderbond", label: "是否缴纳保证金",type: "boolean" },
        {key: "tbbegindateTime", label: "缴纳时间" }
      ]
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    ...mapActions("bidManager", {
      networkUpData: "networkUpData"
    })
  }
};
</script>
<style lang="less" scoped>
.body {
  .head-box {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #bfcbd9;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
