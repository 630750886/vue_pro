<template>
  <div style="position: relative;">
    <el-select
      style="width: 100%"
      v-model="value"
      :multiple="multiple"
      :size="size"
      :collapse-tags="collapse"
      placeholder="请选择"
      @visible-change="visibleChange"
      @change="handleClick"
    >
      <el-option
        v-for="item in loadData"
        :key="item[prop]"
        :label="item[label]"
        :value="item[prop]"
        :disabled="typeof readonly === 'function' ? readonly(item) : readonly"
      >
      </el-option>
    </el-select>
    <el-alert
      v-show="showMessage"
      style="height: 15px;line-height: 15px;position: absolute;background-color:rgba(0,0,0,0.0)"
      :title="message"
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    model: { type: String },
    size: 0,
    label: {
      type: String,
      default: "listname"
    },
    prop: {
      type: String,
      default: "keyid"
    },
    data:[],
    multiple: {
      type: Boolean,
      default: false
    },
    maxNum: 0,
    minNum: 0,
    filter: {
      type: Object,
      default: () => {
        return {};
      }
    },
    readonly: [Function, Boolean]
  },
  model: {
    prop: "model",
    event: "getData"
  },
  watch: {
    model(newValue) {
      if (this.multiple) {
        if (!this.$myfunction.isEmpty(newValue)) {
          this.value = newValue.split(",");
        } else {
          this.value = [];
        }
      } else {
        this.value = newValue;
      }
    },
    data(newValue) {
      this.loadData = newValue;
    },
    filter(newValue) {
      this.loadData = this.data.filter(item => {
        let isReturn = false;
        let keys = Object.keys(newValue);
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (item[key] !== newValue[key]) {
            isReturn = false;
            break;
          } else {
            isReturn = true;
          }
        }
        if (isReturn) {
          return item;
        }
      });
    }
  },
  mounted() {
    if (!this.$myfunction.isEmpty(this.data)) {
      this.loadData = this.data;
      this.value = this.model;
    }
    if (this.multiple) {
      if (this.$myfunction.isEmpty(this.model)) {
        this.value = [];
      } else {
        this.value = this.model.split(",");
      }
      this.collapse = true;
    }
  },
  //数据节点
  data() {
    return {
      showMessage: false,
      message: "",
      object: {},
      value: "",
      loadData: [],
      isFilter: false,
      collapse: false
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    visibleChange(value) {
      if (!value) {
        if (parseInt(this.minNum) > this.value.length) {
          this.$emit("getData", "");
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 1000);
          this.message = "最少选择" + this.minNum + "项";
        }
      }
    },
    handleClick(newValue) {
      if (!this.multiple) {
        this.$emit("getData", newValue);
        let ref = this.loadData.find(item => {
          if (item[this.prop] === newValue) {
            return item;
          }
        });
        if (!this.$myfunction.isEmpty(ref)) {
          this.$emit("getLabel", ref[this.label]);
          this.$emit("getObject", ref);
        }
      } else {
        if (
          !this.$myfunction.isEmpty(this.maxNum) &&
          parseInt(this.maxNum) > 0
        ) {
          if (newValue.length > parseInt(this.maxNum)) {
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 1000);
            this.message = "最多选择" + this.minNum + "项";
            newValue.splice(newValue.length - 1, 1);
          }
        }
        this.showMessage = false;
        this.$emit("getData", newValue.join(","));
        let array = [];
        let objArray = this.loadData.filter(item => {
          if (newValue.indexOf(item[this.prop]) !== -1) {
            array.push(item[this.label]);
            return item;
          }
        });
        this.$emit("getLabel", array.join(","));
        this.$emit("getObjArray", objArray);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
