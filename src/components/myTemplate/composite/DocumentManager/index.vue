<template>
  <div>
    <div class="dialog">
      <head-right-button
        v-if="isAddMeans"
        :title="buttonTitle"
        @click="$refs.meansRef.openDialog()"
      ></head-right-button>
    </div>
    <div class="table">
      <el-table
        :key="key"
        ref="table"
        :data="dataList"
        lazy
        :max-height="tableHeight"
        :load="load"
        :indent="8"
        row-key="keyid"
        border
        highlight-current-row
        align="left"
        :tree-props="{ children: 'filelist', hasChildren: 'singleflage'}"
      >
        <el-table-column
          prop="resourcename"
          :label="fileLabel"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="updateddateTime"
          label="上传时间"
          width="92">
          <template slot-scope="scope">
            <template v-if="!$myfunction.isEmpty(scope.row.fileAttch)">
              {{scope.row.updateddateTime|datefmt('YYYY/MM/DD')}}
            </template>
          </template>
        </el-table-column>
        <el-table-column  label="附件" width="60" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.fileAttch"></download-button>
            <template
              v-if="
                $myfunction.isEmpty(scope.row.singleflage) &&
                  !$myfunction.isEmpty(scope.row.fileAttch)
              "
            >
              <delete-button
                message-title="是否删除该文件"
                :data="scope.row"
                @click="networkDelDataList"
              ></delete-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="120" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.singleflage === false">
              <template v-if="scope.row.buttontype === 'del'">
                <delete-button
                  :data="scope.row"
                  @click="networkDelData"
                ></delete-button>
              </template>
              <template v-else>
                <upload-button
                  v-model="scope.row.fileAttch"
                  @getValue="networkUpData(scope.row)"
                ></upload-button>
              </template>
            </template>
            <template v-if="scope.row.singleflage === true">
              <template v-if="scope.row.buttontype === 'add'">
                <el-button
                  size="mini"
                  type="text"
                  @click="addFileList(scope.row)"
                  >新增</el-button
                >
              </template>
              <template v-else> </template>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-file ref="addList" @getFormData="networkAddDataList"></add-file>
      <add-means-dialog
        :file-label="fileLabel"
        ref="meansRef"
        width="30%"
        @getFormData="networkAddData"
      ></add-means-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadRightButton from "./components/button/HeadRightButton.vue";
import AddFile from "./components/dialog/AddFile.vue";
import AddMeansDialog from "./components/dialog/AddMeansDialog.vue";
import { mapState } from "vuex";
import {
  initItemFiles,
  getItemFiles,
  addItemFile,
  delItemFile,
  upItemFile,
  getItemFileList,
  addItemFileList,
  upItemFileList,
  delItemFileList
} from "@/api/workbench/webapi-fileManager.js";

export default {
  components: {
    HeadRightButton,
    AddFile,
    AddMeansDialog
  },
  /**
   * isAddMeans 是否开启新增其他资料按钮
   * code 初始化项目文件的分类编号
   * isInit 是否初始化
   * fileLabel 文件首列的名称
   * buttonTitle 新增其他资料的按钮名称
   */
  props: {
    isAddMeans: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ""
    },
    isInit: {
      type: Boolean,
      default: true
    },
    fileLabel: {
      type: String,
      default: "文件名称"
    },
    buttonTitle: {
      type: String,
      default: "新增资料"
    },
    fileBelong: [String]
  },
  //生命周期函数节点
  created() {
    if (this.isInit) {
      this.initFile();
    }
  },
  mounted() {
    this.networkGetDatas();
  },
  watch: {},
  computed: {
    ...mapState("workbench", {
      currentItem: "currentItem"
    })
  },
  //数据节点
  data() {
    return {
      key: 1,
      tableHeight: "400px",
      dataList: [],
      parentMap: {}
    };
  },

  //自定义函数节点
  methods: {
    initFile() {
      initItemFiles({
        projectkeyid: this.currentItem.keyid,
        typeCode: this.code
      }).then(() => {
        this.networkGetDatas();
      });
    },
    upNode(keyid) {
      getItemFiles({ keyid: keyid }).then(item => {
        this.$set(this.$refs.table.store.states.lazyTreeNodeMap, keyid, []);
        this.$set(
          this.$refs.table.store.states.lazyTreeNodeMap,
          keyid,
          item.data[0].filelist
        );
      });
    },
    networkGetDatas() {
      let ref = {
        projectKeyid: this.currentItem.keyid,
        resourcTypeCode: this.code
      };
      getItemFiles(ref).then(item => {
        this.dataList = item.data;
      });
    },

    networkAddData(formData) {
      let ref = {
        projectKeyid: this.currentItem.keyid,
        resourcTypeCode: this.code,
        resourcename: formData.name,
        singleflage: false,
        ordernumb: this.dataList.length + 1,
        buttontype: "del",
        fileAttch: formData.file
      };
      addItemFile(ref).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
        }
      });
    },
    networkUpData(formData) {
      upItemFile(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
        }
      });
    },
    networkDelData(formData) {
      delItemFile(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          getItemFileList({ resourcekeyid: formData.keyid }).then(item => {
            item.data.forEach(item => {
              delItemFileList(item);
            });
          });
          this.networkGetDatas();
        }
      });
    },
    //新增明细文件
    networkAddDataList(formData) {
      addItemFileList(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDatas();
          this.upNode(formData.resourcekeyid);
        }
      });
    },
    //修改明细附件
    networkUpDataList(formData) {
      upItemFileList(formData);
    },
    networkDelDataList(formData) {
      delItemFileList(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.upNode(formData.resourcekeyid);
        }
      });
    },
    addFileList(data) {
      let ref = {
        resourcekeyid: data.keyid,
        filename: data.resourcename,
        fileAttch: ""
      };
      this.$refs.addList.openDialog(ref);
    },
    load(tree, treeNode, resolve) {
      getItemFileList({ resourcekeyid: tree.keyid }).then(item => {
        resolve(item.data);
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
