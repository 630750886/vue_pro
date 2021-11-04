<template>
  <div>
    <div class="column">
      <el-form
        :model="currentItem"
        style="float: left;width: 100%;"
        label-width="150px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否需要进交易平台">
              <template v-if="readonly">
                {{ form.isplatform ? "是" : "否" }}
              </template>
              <template v-else>
                <com-truefalse v-model="form.isplatform"></com-truefalse>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易平台名称" v-if="form.isplatform">
              <rea-query-input
                v-model="form.platformName"
                filter-key="tpname"
                url="/pro/tatradingplatform/findall"
                filter-obj="{}"
                :focus="true"
                :readonly="readonly"
                @getObject="
                  item => {
                    form.platformKeyid = item.keyid;
                  }
                "
              ></rea-query-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-button
      v-if="readonly"
      style="width: 100%; margin-top: 20px"
      type="primary"
      size="mini"
      @click="readonly = false"
    >
      <span style="margin-right: 100px">编</span><span>辑</span>
    </el-button>
    <el-button
      v-if="!readonly"
      style="width: 100%; margin-top: 20px"
      type="primary"
      size="mini"
      @click="submitFormData"
    >
      <span style="margin-right: 100px">保</span><span>存</span>
    </el-button>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadRightButton from "../../../../button/HeadRightButton.vue";
import UpdatePlatformDialog from "../dialog/UpdatePlatformDialog.vue";
import { mapState, mapMutations } from "vuex";
import { upItem } from "../../../../../../../../../../api/webapi-business.js";
export default {
  components: {
    HeadRightButton,
    UpdatePlatformDialog
  },
  props: {},
  watch: {},
  computed: {
    ...mapState("workbench", {
      currentItem: "currentItem"
    })
  },
  //数据节点
  data() {
    return {
      readonly: true,
      form: {
        isplatform: false,
        platformKeyid: "",
        platformName: ""
      }
    };
  },
  //生命周期函数节点
  created() {
    this.form = this.$myfunction.copyData(this.currentItem);
  },
  //自定义函数节点
  methods: {
    ...mapMutations("workbench", {
      updateCurrentItem: "updateCurrentItem"
    }),
    submitFormData() {
      upItem(this.form).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.updateCurrentItem(item.data[0]);
          this.readonly = true;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.column {
  height: 6rem;
}
</style>
