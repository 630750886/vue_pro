<template>
  <div>
    <div class="head-button">
      <el-form>
        <el-row>
          <el-col :span="20">
            <el-form :inline="true">
              <el-form-item label="用户名" label-width="100px">
                <el-input v-model="filterName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-refresh-right"
                  @click="ureload"
                ></el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="dataList"
        align="left"
        height="6.8rem"
        highlight-current-row
        border
        :header-cell-style="{ fontSize: '14px' }"
      >
        <el-table-column
          prop="dingTalkkeyid"
          label="钉钉号"
          align="left"
          width="160px"
        ></el-table-column>
        <el-table-column
          prop="persionName"
          label="用户名"
          align="left"
          width="90px"
        ></el-table-column>
        <el-table-column
          prop="duserphone"
          label="电话"
          align="left"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="accountcode"
          label="账号"
          align="left"
          width="100px"
        ></el-table-column>
        <el-table-column prop="accountpassword" label="密码" align="center"
          ><template slot-scope="scope">
            <span style="color:red;">********</span>
          </template>
        </el-table-column>
        <el-table-column prop="isonline" label="登录状态" align="center">
          <template slot-scope="scope">
            <status-button
              :title="scope.row.isonline ? '在线' : '离线'"
            ></status-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="isenabled"
          label="账号状态"
          align="left"
          width="150px"
        >
          <template slot-scope="scope">
            <switch-button
              prop="isenabled"
              :data="scope.row"
              left-title="停用"
              right-title="正常"
              @change="networkUpData"
            ></switch-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="$refs.postRef.openDialog(scope.row)"
              >岗位配置</el-button
            >
            <el-button type="text" @click="edituserrole(scope.row)"
              >角色配置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination"></div>
    <div class="dialog">
      <post-config-dialog
        ref="postRef"
        title="用户岗位信息"
        width="60%"
        @getFormData="networkGetDataList"
      ></post-config-dialog>
    </div>
    <el-dialog
      title="配置角色"
      v-model="dialogVisible_role"
      :visible.sync="dialogVisible_role"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-select
        class="Mselected"
        v-model="selectedrolelist"
        multiple
        placeholder="请选择"
        @change="mchange"
      >
        <el-option
          v-for="item in datarolelist"
          :key="item.keyid"
          :label="item.roleName"
          :value="item.keyid"
        >
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible_role = false">取 消</el-button>
          <el-button type="primary" @click="upedituserrole">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { GetHttp } from "../../../../../utils/http";
import PostConfigDialog from "../dialog/PostConfigDialog.vue";
export default {
  inject: ["reload"],
  components: {
    PostConfigDialog
  },
  props: {},
  //生命周期函数节点
  created() {
    this.networkGetDataList();
  },
  mounted() {},
  watch: {
    filterName(newValue) {
      if (newValue !== "") {
        this.dataList = this.seavDataList.filter(item => {
          return item.persionName.indexOf(newValue) !== -1;
        });
      } else {
        this.dataList = this.seavDataList;
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible_role: false,
      filterName: "",
      dataList: [],
      seavDataList: [],
      datarolelist: [],
      selectedrolelist: [],
      currenuser: {}
    };
  },

  //自定义函数节点
  methods: {
    mchange() {
      console.log(this.selectedrolelist);
    },
    networkGetDataList() {
      GetHttp("java_post", "/sys/sysuser/findall", "post", {}).then(item => {
        if (item.code === 200) {
          this.dataList = item.data;
          this.seavDataList = item.data;
        }
      });
    },
    networkUpData(formData) {
      GetHttp("java_post", "/sys/sysuser/edits", "post", formData).then(
        item => {
          if (item.code === 200) {
            this.$message.success(item.message);
            this.networkGetDataList();
          }
        }
      );
    },
    edituserrole(row) {
      this.dialogVisible_role = true;
      this.currenuser = row;
      this.selectedrolelist = row.sysrolelist;
      this.javaHttp("/sysroles/findall", {}).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.datarolelist = item.data;
        }
      });
    },
    ureload() {
      this.reload();
    },
    upedituserrole() {
      this.dialogVisible_role = false;
      this.currenuser.sysrolelist = this.selectedrolelist;
      this.javaHttp("/sys/sysuser/edituserRole", this.currenuser).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDataList();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Mselected {
  width: 80%;
}
</style>
