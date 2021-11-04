<template>
  <div>
    <el-popover :trigger="popoverType" placement="top"  @show="networkGetDatas">
      <template v-if="isShow || !$myfunction.isEmpty(data)">
        <template v-if="type === 'object' || type === 'obj'">
          <table>
            <tr v-for="(item,index) in labelProp" :key="'trh'+index">
              <td style="text-align: right">{{ item[label] }}:</td>
              <td style="text-indent: 2em;min-width: 200px;">
                {{data[item[prop]]}}
              </td>
            </tr>
          </table>
        </template>
        <template v-if="type === 'array' || type === 'arr'">
          <el-table
            :data="dataList"
            align="left"
            highlight-current-row
            border
          >
            <template v-for="(item,index2) in labelProp">
              <el-table-column
                v-if="item.type !== 'file'"
                :label="item[label]"
                :prop="item[prop]"
                :width="item.width ? item.width : '100'"
                :key="'tc'+index2"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                :key="'tcf'+index2"
                v-if="item.type === 'file'"
                :label="item[label]"
                width="80px"
              >
                <template slot-scope="scope">
                  <download-button
                    :value="scope.row[item[prop]]"
                  ></download-button>
                  <upload-button
                    v-if="
                      !$myfunction.isEmpty(url) && scope.row[item[prop]] === ''
                    "
                    v-model="scope.row[item[prop]]"
                    @getValue="networkUpData(scope.row)"
                  ></upload-button>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </template>
        <template v-if="type === 'keyValue' || type === 'ky'">
          <div style="width: 300px">
            <el-table :data="dataList" stripe :show-header="false" highlight-current-row>
              <el-table-column :prop="label" min-width="75px"></el-table-column>
              <el-table-column :prop="prop" min-width="100px"></el-table-column>
            </el-table>
          </div>
        </template>
      </template>
      <template v-else>
        <div style="height: 60px;text-align: center;line-height: 60px;">
          <h4>暂无数据</h4>
        </div>
      </template>
      <div slot="reference">
        <el-tag size="medium" @click="$emit('click')">{{ title }}</el-tag>
      </div>
    </el-popover>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { GetHttp } from "../../../utils/http";

export default {
  components: {},
  props: {
    data: {},
    url: [String],
    filter: [Object],
    dataType: {
      type: String,
      default: "array"
    },
    popoverType: {
      type: String,
      default: "click"
    },
    label: {
      type: String,
      default: "label"
    },
    prop: {
      type: String,
      default: "prop"
    },
    labelProp: { type: Array },
    title: {
      type: String,
      default: "详细"
    }
  },
  watch: {
    data(newValue) {
      if (Array.isArray(this.data)) {
        this.dataList = newValue;
      }
    },
    dataType(newValue) {
      this.type = newValue;
    },
    type(newValue) {
      if (newValue.indexOf("arr") !== -1 && Array.isArray(this.data)) {
        this.dataList = this.data;
      }
      if (newValue.indexOf("k") !== -1 && Array.isArray(this.data)) {
        this.dataList = this.data;
      }
    }
  },
  mounted() {
    this.type = this.dataType;
  },
  //数据节点
  data() {
    return {
      type: "",
      dataList: [],
      isShow: false
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    networkGetDatas() {
      if (!this.$myfunction.isEmpty(this.url)) {
        this.isShow = true;
        GetHttp(
          "java_post",
          this.url,
          "post",
          this.filter ? this.filter : undefined
        ).then(item => {
          this.dataList = item.data;
          console.log(item.data)
        });
      }
    },
    networkUpData(data) {
      if (!this.$myfunction.isEmpty(this.url)) {
        let url = this.url.split("/");
        url.splice(url.length - 1, 1, "edits");
        GetHttp("java_post", url.join("/"), "post", data);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
  color: #000;
}
</style>
