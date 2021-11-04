<template>
  <div style="position: relative;">
    <el-autocomplete
      :key="keyNum"
      class="inline-input"
      v-model="value"
      :value-key="filterKey"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="focus"
      :select-when-unmatched="unmatched"
      @select="handleSelect"
    >
      <rea-select
        v-if="prependShow"
        :style="{ width: prependWidth }"
        v-model="select"
        :data="prependData"
        slot="prepend"
      ></rea-select>
    </el-autocomplete>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import { GetHttp } from "../../../utils/http";

export default {
  components: {},
  /**
   * 属性
   * url 远程数据地址 String
   * readonly 只读属性 Boolean
   * prependShow 是否开启头部下拉框  Boolean
   * prependWidth 头部下拉框的宽度 String
   * prependData 下拉框的数据 Array
   * filterKey 输入框过滤字段 String
   * filterObj 远程搜索的附加条件 Object
   * unmatched  当没有匹配值时是否绑定输入框的数据 Boolean
   * focus  输入框获取焦点时是否显示匹配的数据 Boolean
   * 事件
   * getObject 选择项的对象
   */
  props: {
    model: {},
    data: {},
    url: {type:String,default:""},
    readonly: {
      type: Boolean,
      default: false
    },
    prependShow: {
      type: Boolean,
      default: false
    },
    prependWidth: {
      type: String,
      default: "90px"
    },
    prependData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    filterKey: {
      type: String,
      default: "value"
    },
    filterObj: {
      type: Object,
      default: () => {
        return {pinyincode:""};
      }
    },
    unmatched: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "model",
    event: "getValue"
  },
  mounted() {
    if (!this.model) {
      this.value = "";
    } else {
      this.value = this.model;
    }
    this.restaurants = this.loadAll();
  },
  watch: {
    model(newValue) {
      if (!this.value) {
        this.value = "";
      }
      this.value = newValue;
    },
    data(newValue) {
      this.loadData = newValue;
    },
    loadData(newValue) {
      this.restaurants = newValue;
    },
    value(newValue) {
      this.$emit("getValue", newValue);
      this.$emit("getObject", newValue);
    },
    filterObj(newValue, oldValue) {
      if (!(JSON.stringify(newValue) === JSON.stringify(oldValue))) {
        this.getLoadDataByUrl();
      }
    }
  },
  //数据节点
  data() {
    return {
      keyNum: 0,
      loadData: [],
      restaurants: [],
      value: "",
      select: "",
      message: "",
      showMessage: false
    };
  },
  //生命周期函数节点
  created() {
    if (!this.$myfunction.isEmpty(this.data)) {
      this.loadData = this.data;
    } else if (this.$myfunction.isEmpty(this.data)) {
      this.getLoadDataByUrl();
    }
  },
  //自定义函数节点
  methods: {
    handleChange(value) {
      let ref = this.restaurants.find(item => {
        return item[this.filterKey] === value;
      });
      if (!this.$myfunction.isEmpty(ref)) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    },
    blur() {
      if (!this.unmatched && this.showMessage) {
        this.value = "";
        this.$emit("getValue", "");
        this.$emit("getObject", {});
      }
      return true;
    },
    getLoadDataByUrl() {
      if (!this.$myfunction.isEmpty(this.filterObj)) {
        GetHttp(
          "java_post",
          this.url,
          "post",
          Object.assign({}, this.filterObj)
        ).then(item => {
          this.loadData = item.data;
        });
      } else if (!this.$myfunction.isEmpty(this.url)) {
        GetHttp("java_post", this.url, "post").then(item => {
          this.loadData = item.data;
        });
      }
    },
    querySearch(queryString, cb) {
      this.handleChange(queryString);
      let restaurants = this.restaurants;
      if (this.$myfunction.isEmpty(this.restaurants)) {
        restaurants = [];
      }
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        if (this.$myfunction.isEmpty(this.filterKey)) {
          return (
            restaurant.toLowerCase().includes(queryString.toLowerCase()));
        } else {
          return (
            restaurant[this.filterKey]
              .toLowerCase()
              .includes(queryString.toLowerCase())
          );
        }
      };
    },
    loadAll() {
      return this.loadData;
    },
    handleSelect(value) {
      this.handleChange(value[this.filterKey]);
      this.$emit("getValue", value[this.filterKey]);
      this.$emit("getObject", value);
    }
  }
};
</script>
<style lang="less" scoped>
.inline-input {
  width: 100%;
}
</style>
