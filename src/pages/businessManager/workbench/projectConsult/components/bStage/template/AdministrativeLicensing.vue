<template>
  <div class="b-main">
    <div>
      <head-right-button @click="$refs.addRef.openDialog()" title="新增行政许可"></head-right-button>
    </div>
    <div>
      <el-table :data="materialInfo" style="width: 100%" align="center" height="430px" highlight-current-row
                :header-cell-style="{fontSize:'10px'}">
        <el-table-column prop="licensingName" label="行政许可名称" align="center"></el-table-column>
        <el-table-column prop="auditdateTime" label="行政许可上日期" align="center"></el-table-column>
        <el-table-column prop="licensingAttachFile" label="相关证明文件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.licensingAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-licensing-dialog title="新增行政许可" width="30%" ref="addRef"
                            @getFormData="networkAddData"></add-licensing-dialog>
      <add-licensing-dialog title="修改" width="30%" ref="updateRef" @getFormData="networkUpData"></add-licensing-dialog>
    </div>
  </div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddLicensingDialog from "../dialog/AddLicensingDialog.vue"
  import HeadRightButton from "../button/HeadRightButton.vue"
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {
    getAdministrativeLicensings,
    addAdministrativeLicensing,
    delAdministrativeLicensing,
    upAdministrativeLicensing
  } from '../../../../../../../api/workbench/webapi-projectConsult.js'

  export default {
    components: {
      AddLicensingDialog,
      HeadRightButton
    },
    props: {},
    watch: {},
    computed: {
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        materialInfo: [],
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    //自定义函数节点
    methods: {
      networkGetDatas() {
        let ref = {projectKeyid: this.currentItem.keyid}
        getAdministrativeLicensings(ref).then(item => {
          this.materialInfo = item.data
        })
      },
      networkAddData(formData) {
        formData.projectKeyid = this.currentItem.keyid
        addAdministrativeLicensing(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData) {
        delAdministrativeLicensing(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upAdministrativeLicensing(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
    }
  }
</script>
<style lang='less' scoped>
  .b-main {
    height: 80%;
  }
</style>
