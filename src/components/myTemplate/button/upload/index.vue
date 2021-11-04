<template>
  <div
    style="width: auto;display:inline-block;margin-left: 10px;margin-right: 10px"
  >
    <template v-if="size === 'max'">
      <max-button
        v-model="value"
        :message="message"
        :data="modelData"
        @getValue="
          item => {
            $emit('getValue', item);
          }
        "
      ></max-button>
    </template>
    <template v-if="size === 'min'">
      <min-button
        v-if="!multiple"
        v-model="value"
        :message="message"
        :data="modelData"
        :btn-title="btnTitle"
        @getValue="
          item => {
            $emit('getValue', item);
          }
        "
      ></min-button>
      <min-array-button
        v-else
        :data="modelData"
        @getValue="
          item => {
            $emit('getValue', item);
          }
        "
      ></min-array-button>
    </template>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import MaxButton from "./component/MaxFileUploadButton.vue";
import MinButton from "./component/MinFileUploadButton.vue";
import MinArrayButton from "./component/MinFileArray.vue";

export default {
  components: {
    MaxButton,
    MinButton,
    MinArrayButton
  },
  /**
   *size 默认值 min，max，超大文件使用max
   */
  props: {
    message: { type: String },
    title: { type: String },
    model: { type: String },
    size: {
      type: String,
      default: "max" //max min
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: [Object],
    moduleType: [String],
    fileName: {
      type: String,
      default: ""
    },
    baseId: [String],
    btnTitle: [String]
  },
  model: {
    prop: "model",
    event: "getValue"
  },
  //生命周期函数节点
  created() {
    switch (this.moduleType) {
      case "hr":
        this.modelData.documentTypeName = "人事档案";
        break;
      case "tb":
        this.modelData.documentTypeName = "投标档案";
        break;
      case "ht":
        this.modelData.documentTypeName = "合同档案";
        break;
      case "xm":
        this.modelData.documentTypeName = "项目档案";
        break;
      case "xz":
        this.modelData.documentTypeName = "行政档案";
        break;
      case "cw":
        this.modelData.documentTypeName = "财务档案";
        break;
      case "kh":
        this.modelData.documentTypeName = "客户档案";
        break;
    }
  },
  mounted() {
    this.value = this.model;
    if (this.data) {
      this.modelData = this.data;
    }
  },
  watch: {
    model(newValue) {
      this.value = newValue;
    },
    data(newValue) {
      this.modelData = newValue;
    }
  },
  computed: {},
  //数据节点
  data() {
    return {
      value: "",
      modelData: {
        documentTypeName: "",
        documentTypeListName: this.fileName,
        entityKeyid: this.baseId
      }
    };
  },
  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped></style>
