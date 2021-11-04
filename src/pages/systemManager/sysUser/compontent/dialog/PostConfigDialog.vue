<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <div class="table">
        <el-button
          type="primary"
          size="mini"
          @click="$refs.addPostRef.openDialog()"
          >新增岗位</el-button
        >
        <el-table
          :data="dataList"
          style="width: 100%;font-size:10px;"
          align="center"
          :fit="true"
          height="7.5rem"
          border
          highlight-current-row
          :header-cell-style="{ fontSize: '14px' }"
        >
          <el-table-column
            prop="posName"
            label="岗位名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="orgName"
            label="所属组织"
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="250"
          >
            <template slot-scope="scope">
              <delete-button
                :data="scope.row"
                @click="networkDelPosData"
              ></delete-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <dialog-button
        reset-btn="false"
        :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
    <add-post-dialog
      ref="addPostRef"
      width="30%"
      @getFormData="networkAddPosData"
    ></add-post-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import AddPostDialog from "./AddPostDialog.vue";
export default {
  components: {
    AddPostDialog
  },
  props: {
    title: { type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      show: true,
      dialogVisible: false,
      userInfo: {},
      dataList: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    networkAddPosData(formData) {
      let ref = {
        userkeyid: this.userInfo.keyid,
        jobkeyid: formData.posId
      };
      this.javaHttp("/sys/userjob/adds", ref).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.javaHttp("/sys/sysuser/findall", { keyid: "123" }).then(item => {
            if (item.code === 200) {
              item.data.filter(item => {
                if (item.keyid === this.userInfo.keyid) {
                  this.dataList = item.posinfolist;
                }
              });
            }
          });
        }
      });
    },
    networkDelPosData(data) {
      this.javaHttp("/sys/userjob/findall").then(ref2 => {
        let job = ref2.data.find(userjob => {
          return (
            userjob.userkeyid === this.userInfo.keyid &&
            userjob.jobkeyid === data.keyid
          );
        });
        if (job) {
          this.javaHttp("/sys/userjob/deletes", job).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message);
              this.$emit("getFormData");
              this.javaHttp("/sys/sysuser/findall", { keyid: "123" }).then(
                item => {
                  if (item.code === 200) {
                    item.data.filter(item => {
                      if (item.keyid === this.userInfo.keyid) {
                        this.dataList = item.posinfolist;
                      }
                    });
                  }
                }
              );
            }
          });
        }
      });
    },
    submitFormData: function() {
      this.$emit("getFormData");
      this.dialogClose();
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.userInfo = data;
        this.dataList = data.posinfolist;
      }
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
