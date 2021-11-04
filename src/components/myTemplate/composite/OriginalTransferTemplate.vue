<template>
  <div>
    <el-row>
      <el-col :span="21">
        <div style="height: 35px;line-height: 35px">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(item, index) in checkboxList"
              :label="item"
              :key="index"
              @change="checkboxClick(item)"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="3">
        <div style="height: 35px;line-height: 35px">
          <el-button type="text" @click="dialogVisible = true"
            >新增移交资料</el-button
          >
        </div>
      </el-col>
    </el-row>
    <rea-divider title="待移交数据"></rea-divider>
    <el-table
      :data="data"
      stripe
      :show-header="false"
      highlight-current-row
      border
    >
      <el-table-column width="75px">
        资料名称
      </el-table-column>
      <el-table-column prop="resourcename" min-width="100px"></el-table-column>
      <el-table-column width="75px">
        数量
      </el-table-column>
      <el-table-column prop="copies" width="75px"></el-table-column>
      <el-table-column width="75px">
        接收人
      </el-table-column>
      <el-table-column prop="inperson" width="100px"></el-table-column>
      <el-table-column align="right" width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="remObj(scope.$index)"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        v-if="dialogVisible"
        :append-to-body="true"
        width="300px"
        @close="dialogClose"
         :close-on-click-modal="false"
      >
        <el-form
          :model="form"
          ref="formRef"
          :rules="formRules"
          label-width="75px"
        >
          <el-form-item label="资料名称" prop="resourcename">
            <el-input
              v-model="form.resourcename"
              :readonly="readonly"
            ></el-input>
          </el-form-item>
          <el-form-item label="份数" prop="copies">
            <el-input-number
              style="width: 100%"
              v-model="form.copies"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="接收人" prop="inperson">
            <rea-query-input
              v-model="form.inperson"
              url="hr/basicinfo/autofindwhere"
              filter-obj="{}"
              filter-key="contextname"
              @getObject="getItem"
            ></rea-query-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="submitData"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    checkboxList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    model: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "model",
    event: "getData"
  },
  //生命周期函数节点
  created() {},
  mounted() {
    this.data = this.model;
  },
  watch: {
    model(newValue) {
      this.data = newValue;
    },
    checkList(newValue, oldValue) {
      let name = oldValue.find(item => {
        return newValue.indexOf(item) === -1;
      });
      if (!this.$myfunction.isEmpty(name)) {
        let index = this.data.findIndex(item => {
          return item.resourcename === name;
        });
        this.data.splice(index, 1);
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      readonly: false,
      data: [],
      checkList: [],
      form: {
        resourcename: "",
        copies: "",
        inpersonkeyid: "",
        inperson: "",
        inOrgkeyid: "",
        inOrgName: ""
      },
      formRules: {
        
      }
    };
  },

  //自定义函数节点
  methods: {
    checkboxClick(item) {
      if (this.checkList.indexOf(item) !== -1) {
        this.dialogVisible = true;
        this.readonly = true;
        this.form.resourcename = item;
      }
    },
    remObj(index) {
      this.data.splice(index, 1);
      let ind = this.checkList.findIndex(item => {
        return item === this.data[index];
      });
      this.checkList.splice(ind, 1);
      this.$emit("getData", this.$myfunction.copyData(this.data));
    },
    getItem(item) {
      this.form.inpersonkeyid = item.keyid;
      this.form.inOrgkeyid = item.orgId;
      this.form.inOrgName = item.orgName;
    },
    submitData() {
      this.data.push(this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    dialogClose() {
      this.dialogVisible = false;
      this.readonly = false;
      this.form = this.$options.data().form;
    }
  }
};
</script>
<style lang="less" scoped></style>
