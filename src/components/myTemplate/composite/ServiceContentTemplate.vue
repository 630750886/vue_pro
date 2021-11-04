<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="(item, index) in serviceType"
        :label="item.listname"
        :key="index"
        @change="checkboxClick(item)"
      ></el-checkbox>
    </el-checkbox-group>
    <rea-divider></rea-divider>
    <el-table
      :data="dataList"
      stripe
      :show-header="false"
      highlight-current-row
      border
    >
      <el-table-column  width="100px" align="right"
        >服务名称：</el-table-column
      >
      <el-table-column
        prop="workItemName"
        width="100px"
        align="left"
      ></el-table-column>
      <el-table-column min-width="100px" align="right">
      </el-table-column>
      <el-table-column
        prop="planServiceDays"
        width="100px"
        align="left"
      ></el-table-column>
      <el-table-column prop="prop" width="100px" align="right">
        <template slot-scope="scope">
          <span v-if="scope.row.workItemContext !== ''">工作类容：</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="workItemContext"
        min-width="200px"
        align="left"
      ></el-table-column>
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
          <!--<el-form-item v-if="form.isShowPlanServiceDays" label="计划时间" prop="planServiceDays">
            <el-col :span="20">
              <el-input v-model="form.planServiceDays"></el-input>
            </el-col>
            <el-col :span="4">天</el-col>
          </el-form-item>-->
          <!--<el-form-item label="工作类容" prop="workItemContext">
            <rea-textarea v-model="form.workItemContext"></rea-textarea>
          </el-form-item>-->
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
    model: {
      type: Array,
      default: () => {
        return [];
      }
    },
    serviceType: {
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
  mounted() {},
  watch: {
    model(newValue) {
      this.dataList = newValue;
    },
    checkList(newValue, oldValue) {
      let name = oldValue.find(item => {
        return newValue.indexOf(item) === -1;
      });
      if (!this.$myfunction.isEmpty(name)) {
        let index = this.dataList.findIndex(item => {
          return item.workItemName === name;
        });
        this.dataList.splice(index, 1);
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      dataList: [],
      checkList: [],
      form: {
        workPlanKeyId: "",
        workItemKeyId:"",
        workItemName: "",
        component: "",
        planServiceDays: "",
        isShowPlanServiceDays: false,
        workItemContext: "",
        workitemorderbycode: ""
      },
      formRules: {}
    };
  },

  //自定义函数节点
  methods: {
    checkboxClick(value) {
      if (this.checkList.indexOf(value.listname) !== -1) {
        //this.dialogVisible = true
        this.form.isShowPlanServiceDays = value.isplanitemtime;
        this.form.workItemKeyId=value.keyid;
        this.form.workItemName = value.listname;
        this.form.component = value.urladdress;
        this.form.workitemorderbycode = value.staticsCode;
        this.submitData();
      }
    },
    remObj(index) {
      let name = this.dataList[index].workItemName;
      this.dataList.splice(index, 1);
      let ind = this.checkList.findIndex(item => {
        return item === name;
      });
      this.checkList.splice(ind, 1);
      this.$emit("getData", this.$myfunction.copyData(this.dataList));
    },
    submitData() {
      this.dataList.push(this.$myfunction.copyData(this.form));
      this.$emit("getData", this.$myfunction.copyData(this.dataList));
      this.dialogClose();
    },
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      let index = this.checkList.findIndex(item => {
        let arr = [];
        this.dataList.forEach(ref => {
          arr.push(ref.workItemName);
        });
        return arr.indexOf(item) === -1;
      });
      if (index !== -1) {
        this.checkList.splice(index, 1);
      }
      this.resetForm();
    },
    resetForm() {
      this.form = this.$options.data().form;
    }
  }
};
</script>
<style lang="less" scoped></style>
