<template>
  <div class="body">
    <div class="table">
<!--      <div class="table-head">-->
<!--        <el-row>-->
<!--          <el-col :span="2">-->
<!--            <span>下载档案类型：</span>-->
<!--          </el-col>-->
<!--          <el-col :span="20">-->
<!--            <el-checkbox-group v-model="checkList">-->
<!--              <el-checkbox label="1">活动相关图片</el-checkbox>-->
<!--              <el-checkbox label="2">合同</el-checkbox>-->
<!--              <el-checkbox label="3">奖项</el-checkbox>-->
<!--            </el-checkbox-group>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
      <el-table
        :data="dataList.content"
        align="center"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="活动举办时间"
          prop="beginDateTime"
          width="85"
          align="center"
        ></el-table-column>
        <el-table-column
          label="活动名称"
          show-overflow-tooltip
          prop="activityName"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="activityTypeName"
          show-overflow-tooltip
          label="活动类型"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="主办方名称"
          prop="activityMain"
          show-overflow-tooltip
          width="200px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="活动举办地点"
          prop="activityAddress"
          width="200px"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="活动持续时间"
          prop="activityLong"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          label="活动规模"
          prop="activityPersonSum"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="活动相关人员"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="300" trigger="click">
              <div>公司活动负责人:{{scope.row.activityLeading}}
                <div v-for="item in scope.row.assists" :key="item.keyid">
                  <p>协助人员:{{item.assistPersonName}} 协助工作:{{item.assistPersonContant}}</p>
                </div>
              </div>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="活动费用总计"
          align="center"
        ></el-table-column>
        <el-table-column
          label="相关合同情况"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="400" trigger="click">
              <el-table :data="scope.row.attachFileContract" border>
                <el-table-column
                    label="合同编号"
                    width="130"
                    prop="activityAttachCode"
                ></el-table-column>
                <el-table-column
                    label="合同名称"
                    prop="activityAttachTypeName"
                ></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="获奖情况"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <el-popover placement="bottom" width="300" trigger="click">
              <el-table :data="scope.row.attachFilePrize" border>
                <el-table-column
                    label="奖项名称"
                    prop="activityAttachName"
                ></el-table-column>
                <el-table-column label="附件" prop="activityAttachFile">
                  <template slot-scope="scope">
                    <download-button :value="scope.row.activityAttachFile">下载</download-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
<!--            <table-button :scope="scope.row" @click="tableButtonClick"></table-button>-->
            <el-button type="primary" plain size="mini" @click="$refs.notesRef.openDialog(scope.row)">档案备注</el-button>
            <el-button type="primary" plain size="mini" @click="$refs.modifyRef.openDialog(scope.row)">修改档案</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <pagination
          :pageTotal="dataList.totalElements"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <div class="dialog">
      <downDialog title="下载档案类型：" ref="downRef" @getFormData="getFormData"></downDialog>
      <fileNotesDialog ref="notesRef" @getFormData="getFormData"></fileNotesDialog>
      <ModifyFile ref="modifyRef" @getFormData="getFormModifyData"></ModifyFile>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import downDialog from "../dialog/downDialog.vue";
import fileNotesDialog from "../dialog/fileNotesDialogActivity.vue";
import ModifyFile from "../dialog/ModifyFileInspection.vue";
export default {
  components: {
    TableButton,
    downDialog,
    fileNotesDialog,
    ModifyFile,
  },
  props: {
    dataList: {
      type:Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type:Object ,
      default: () => {
        return {};
      },
    },
  },
  watch: {},
  //数据节点
  data() {
    return {
      checkList: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    getFormData(formData){
      console.log(formData)
    },
    getFormModifyData(data){
      console.log(data)
    },
    handleCurrentChange(val) {
      console.log(this.pageShow);
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    tableButtonClick(btn) {
      switch (btn) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
/*.table-head {*/
/*  height: 30px;*/
/*  line-height: 30px;*/
/*  margin-bottom: 15px;*/
/*  span {*/
/*    font-size: 16px;*/
/*  }*/
/*}*/
</style>
