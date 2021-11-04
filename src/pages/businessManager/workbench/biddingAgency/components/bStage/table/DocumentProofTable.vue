<template>
  <div>
    <div>
      <head-right-button @click="$refs.addProofRef.openDialog()" title="新建"></head-right-button>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%" align="center" highlight-current-row
                :header-cell-style="{fontSize:'10px'}" border="">
<!--        新增加-->
        <el-table-column prop="proofcount" label="论证次数" align="center" width="80"></el-table-column>
        <el-table-column prop="proofdateTime" label="论证时间" align="center" width="120"></el-table-column>
        <!--        新增加-->
        <el-table-column prop="createddateTime" label="创建时间" width="120" align="center"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column prop="proofName" label="论证名称" align="center"></el-table-column>
        <el-table-column prop="proofFile" label="论证相关资料" align="center" width="120">
          <template slot-scope="scope">
            <download-button :value="scope.row.proofFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="$refs.reviceProofeRef.openDialog(scope.row)">登记</el-button>
            <el-button type="primary" plain size="mini" @click="delProof(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
<!--       title="新增论证"-->
      <add-proof-dialog :file-head="fileHead" width="30%" ref="addProofRef"
                        @getFormData="networkAddData" :openType="add"></add-proof-dialog>
<!--       title="修改论证"-->
      <add-proof-dialog :file-head="fileHead" width="30%" ref="reviceProofeRef"
                        @getFormData="networkUpData"></add-proof-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddProofDialog from "../dialog/DocumentProofTable/AddProofDialog.vue"
  import {mapState} from 'vuex'
  import {
    getDocumentProof,
    addDocumentProof,
    upDocumentProof,
    delDocumentProof
  } from '../../../../../../../api/workbench/webapi-biddingAgency.js'
  import {delPretrial} from "../../../../../../../api/workbench/webapi-biddingAgency";

  export default {
    components: {
      HeadRightButton,
      AddProofDialog,
    },
    props: {
      typeCode: {
        type: String,
        default: ''
      }
    },
    watch: {},
    computed: {
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dataList: [],
        fileHead: '',
        add:'add'
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    //自定义函数节点
    methods: {
      delProof(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDocumentProof({keyid:data.keyid}).then(item => {
            if (item.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.networkGetDatas()
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          typeCode: this.typeCode
        }
        getDocumentProof(ref).then(item => {
          this.dataList = item.data
          console.log(this.dataList)
        })
      },
      networkAddData(formData) {

        let ref = {
          projectKeyid: this.currentItem.keyid,
          typeCode: this.typeCode,
        }
        Object.assign(formData, ref)
        addDocumentProof(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        formData.proofcount = formData.proofcount + 1
        upDocumentProof(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
