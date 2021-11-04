<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-table
        ref="tableRef"
        :data="temList.dataList"
        style="width: 100%"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="modelTypeName"
          label="模板类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="modelName"
          label="模板名称"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          label="创建时间"
          align="left"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column prop="modelFiles" label="附件" align="left">
          <template slot-scope="scope">
            <upload-button
              v-if="btnListIndexOf('SHANG4CHUAN2MO2BAN')"
              v-model="scope.row.modelFiles"
              :module-type="modelTemplate.modelName"
              :file-name="scope.row.modelName"
              :base-id="scope.row.keyid"
              @getValue="networkUpTemplate(scope.row)"
            ></upload-button>

            <template v-if="scope.row.modelFiles !== ''">
              <download-button :value="scope.row.modelFiles"></download-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="300px"
          fixed="right"
        >
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableBtnClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
        :pageTotal="temList.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
    <div class="dialog">
      <add-template-dialog
        ref="addRef"
        width="30%"
        @getFormData="submitAddForm"
      ></add-template-dialog>
      <add-template-dialog
        ref="upRef"
        width="30%"
        @getFormData="submitUpForm"
      ></add-template-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import AddTemplateDialog from "./dialog/AddTemplateDialog.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("template");
export default {
  components: {
    HeadButton,
    TableButton,
    AddTemplateDialog
  },
  props: {},
  watch: {},
  computed: {
    ...mapState({
      temList: "temList",
      modelTemplate: "model"
    })
  },
  //数据节点
  data() {
    return {
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {}
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetTemplate(this.pageShow);
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetTemplate: "networkGetTemplate",
      networkAddTemplate: "networkAddTemplate",
      networkUpTemplate: "networkUpTemplate",
      networkDelTemplate: "networkDelTemplate"
    }),
    headButtonClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.addRef.openDialog();
          break;
      }
    },
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.$refs.upRef.openDialog(data);
          break;
        case 2:
          this.$msgbox
            .confirm("是否确认删除？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              this.networkDelTemplate(data);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });

          break;
      }
    },
    handleCurrentChange(val) {
      this.pageShow.page = val;
      this.networkGetTemplate(this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
      this.networkGetTemplate(this.pageShow);
    },
    submitAddForm(formData) {
      this.networkAddTemplate(formData);
    },
    submitUpForm(formData) {
      this.networkUpTemplate(formData);
    }
  }
};
</script>
<style lang="less" scoped></style>
