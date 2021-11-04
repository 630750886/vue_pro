<template>
  <el-date-picker
    style="width: 100%"
    v-model="value"
    :type="type"
    :format="format"
    :size="size"
    :value-format="valueType"
    :readonly="readonly"
    placeholder="选择日期"
    @change="submitValue"
  >
  </el-date-picker>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    model: { type: String },
    type: {
      type: String,
      default: "date"
    },
    size: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "model",
    event: "getValue"
  },
  watch: {
    model(newValue) {
      this.value = newValue;
    },
    value(newValue) {
      //this.$emit('getValue',newValue)
    }
  },
  mounted() {
    this.value = this.model;
    switch (this.type) {
      case "datetime":
        this.format = "yyyy/MM/dd HH:mm";
        this.valueType = "yyyy/MM/dd HH:mm";
        break;
      case "date":
        this.format = "yyyy/MM/dd";
        this.valueType = "yyyy/MM/dd";
        break;
      case "year":
        this.format = "yyyy";
        this.valueType = "yyyy";
        break;
      case "month":
        this.format = "yyyy/MM";
        this.valueType = "yyyy/MM";
        break;
      default:
        this.format = "yyyy/MM/dd";
        this.valueType = "yyyy/MM/dd";
        break;
    }
  },
  //数据节点
  data() {
    return {
      value: "",
      valueType: "yyyy/MM/dd",
      format: "yyyy/MM/dd"
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    submitValue(value) {
      this.$emit("getValue", value);
    }
  }
};
</script>
<style lang="less" scoped></style>
