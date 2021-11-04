<template>
  <div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="4" :offset="20">
        <el-button type="primary" size="mini" @click="dialogVisible = true">添加角色</el-button
        ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          height="400"
          highlight-current-row
        >
          <el-table-column fixed type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="200">
          </el-table-column>
          <el-table-column
            prop="dataScope"
            label="数据权限类型"
            width="200"
            :formatter="getdatascope"
          >
          </el-table-column>
          <el-table-column prop="description" label="权限说明">
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="editRoleClick(scope.row)"
                >编辑角色</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="editDataClick(scope.row)"
                >数据权限</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="editfuncClick(scope.row)"
                >功能配置</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="deleteRoleClick(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table></el-col
      >
    </el-row>

    <el-dialog
      title="添加角色"
      v-model="dialogVisible"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限数据" :label-width="formLabelWidth">
          <el-select v-model="form.dataScope" placeholder="请选择">
            <el-option
              v-for="item in ScopedataList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="角色等级" :label-width="formLabelWidth">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in leveldataList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description" :rows="1"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addRole">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="配置数据"
      v-model="dialogVisible_data"
      :visible.sync="dialogVisible_data"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-container style="height: 360px; border: 0px solid #eee">
        <el-scrollbar style="height:100%;width:100%;">
          <el-tree
            :data="roleOrgTree.roleOrgTrees"
            show-checkbox
            node-key="keyId"
            empty-text="无"
            ref="OrgTree"
            :default-expand-all="true"
            children="children"
            :default-expanded-keys="roleOrgTree.defCheckedKeys"
            :default-checked-keys="roleOrgTree.defCheckedKeys"
          >
          </el-tree>
        </el-scrollbar>
      </el-container>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible_data = false">取 消</el-button>
          <el-button type="primary" @click="updataeditorg">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="配置功能"
      v-model="dialogVisible_fun"
      :visible.sync="dialogVisible_fun"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-container style="height: 360px; border: 0px solid #eee">
        <el-scrollbar style="height:100%;width:100%;">
          <el-tree
            ref="menutreeRef"
            :data="roleMenuTreeroot.roleMenuTrees"
            show-checkbox
            node-key="keyId"
            empty-text="无"
            :default-expand-all="true"
            children="children"
            :default-expanded-keys="roleMenuTreeroot.defCheckedKeys"
            :default-checked-keys="roleMenuTreeroot.defCheckedKeys"
          >
          </el-tree>
        </el-scrollbar>
      </el-container>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible_fun = false">取 消</el-button>
          <el-button type="primary" @click="updataeditfunc">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="编辑角色"
      v-model="dialogVisible_edit"
      :visible.sync="dialogVisible_edit"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form :model="courrRole" ref="">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="courrRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限数据" :label-width="formLabelWidth">
          <el-select v-model="courrRole.dataScope" placeholder="请选择">
            <el-option
              v-for="item in ScopedataList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色等级" :label-width="formLabelWidth">
          <el-select v-model="courrRole.level" placeholder="请选择">
            <el-option
              v-for="iteml in leveldataList"
              :key="iteml.value"
              :label="iteml.label"
              :value="iteml.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="courrRole.description" :rows="1"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible_edit = false">取 消</el-button>
          <el-button type="primary" @click="editRole()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible_data: false,
      dialogVisible_fun: false,
      dialogVisible_edit: false,
      loading: false,
      tableData: [],
      courrRole: {},
      roleOrgTree: {},
      replaceFields: { key: "keyId", title: "label", children: "children" },
      roleMenuTreeroot: {},
      form: {
        roleName: "",
        dataScope: "",
        description: "",
        level: "1"
      },
      formLabelWidth: "120px",
      ScopedataList: [
        { value: "1", label: "全部数据权限" },
        { value: "2", label: "自定义数据权限" },
        { value: "3", label: "本部门数据权限" },
        { value: "4", label: "本部门及以下数据权限" },
        { value: "5", label: "仅本人数据权限" }
      ],
      leveldataList: [
        { value: 1, label: "管理人员" },
        { value: 2, label: "普通人员" },
        { value: 3, label: "项目总监" }
      ]
    };
  },
  created() {
    this.getallRole();
  },

  methods: {
    editRoleClick(row) {
      this.courrRole = row;
      this.dialogVisible_edit = true;
    },
    editDataClick(row) {
      this.courrRole = row;
      this.javaHttp("/sysroles/getrole_orgtree", this.courrRole).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.roleOrgTree = item.data;
          console.log("数据");
          console.log(item.data);
          this.dialogVisible_data = true;
        } else {
          this.$message.success(item.message);
        }
      });
    },
    editfuncClick(row) {
      this.loading = true;
      this.courrRole = row;
      this.javaHttp("/sysroles/getrole_meun", this.courrRole).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.roleMenuTreeroot = item.data;
          console.log("功能");
          console.log(item.data);
          this.dialogVisible_fun = true;
          this.loading = false;
        } else {
          this.$message.success(item.message);
        }
      });
    },
    updataeditfunc() {
      //接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
      //let arraynode = this.$refs.menutreeRef.getCheckedNodes(false, false);
      let keysarral =this.$refs.menutreeRef.getCheckedKeys(false);
      ////arraynode.forEach(function(item) {
      //  keysarral.push(item.keyId);
      //});
      let HalfChecked=this.$refs.menutreeRef.getHalfCheckedKeys();
      let Halfkey="";
      HalfChecked.forEach(function(item) {
        Halfkey=Halfkey+","+item;
      });
      //选中结点keyid数据；
      this.roleMenuTreeroot.defCheckedKeys = keysarral;
      //半选结点数据串 halfcheckedorg halfcheckedmenu
      this.roleMenuTreeroot.tempRole.halfcheckedmenu=Halfkey;
      console.log(this.roleMenuTreeroot.defCheckedKeys);
      this.javaHttp("/sysroles/editrole_meun", this.roleMenuTreeroot).then(
        item => {
          if (item.code === 200) {
            this.$message.success(item.message);
            this.dialogVisible_fun = false;
          } else {
            this.$message.success(item.message);
          }
        }
      );
    },
    updataeditorg() {
      this.roleOrgTree.defCheckedKeys = this.$refs.OrgTree.getCheckedKeys(
        false
      );

      let HalfChecked=this.$refs.OrgTree.getHalfCheckedKeys();
      let Halfkey="";
      HalfChecked.forEach(function(item) {
        Halfkey=Halfkey+","+item;
      });
      //半选结点数据串 halfcheckedorg halfcheckedmenu
      this.roleOrgTree.tempRole.halfcheckedorg=Halfkey;
      console.log(this.roleOrgTree.defCheckedKeys);
      this.javaHttp("/sysroles/editrole_orgtree", this.roleOrgTree).then(
        item => {
          if (item.code === 200) {
            this.$message.success(item.message);
            this.dialogVisible_data = false;
          } else {
            this.$message.success(item.message);
          }
        }
      );
    },
    deleteRoleClick(row) {
      let delRole = row;
      this.$confirm(
        "此操作将删除角色相关的所有数据（角色用户、角色数据、角色功能等等！）, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.javaHttp("/sysroles/deletes", delRole).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message);
              this.getallRole();
            } else {
              this.$message.success(item.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.dialogVisible_data = false;
      this.dialogVisible_fun = false;
      this.dialogVisible_edit = false;
    },
    getallRole() {
      this.javaHttp("/sysroles/findall", {}).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.tableData = item.data;
        }
      });
    },
    addRole() {
      this.javaHttp("/sysroles/adds", this.form).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.getallRole();
          this.dialogVisible = false;
        } else {
          this.$message.success(item.message);
        }
      });
    },
    editRole() {
      this.javaHttp("/sysroles/edits", this.courrRole).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.getallRole();
          this.dialogVisible_edit = false;
        } else {
          this.$message.success(item.message);
        }
      });
    },
    getdatascope(row) {
      let value = "";
      this.ScopedataList.forEach(item => {
        if (item.value == row.dataScope) value = item.label;
      });
      return value;
    },
    getlevel(row) {
      let value = "";
      this.leveldataList.forEach(item => {
        if (item.value == row.level) value = item.label;
      });
      return value;
    }
  }
};
</script>
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
