<template>
  <div>
    <div class="head-button" style="height: 50px;line-height: 50px">
      <el-button class="button " type="primary" size="mini" @click="$refs.addChangeRef.openDialog(workGroupInfo)">新增成员
      </el-button>
    </div>
    <div class="table">
      <el-table ref="tableRef" row-key="keyid" :data="workGroupInfo" :show-header="false" @expand-change="tableExpandChange" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <expand-table :pkeyid="scope.row.keyid"></expand-table>
          </template>
        </el-table-column>
        <el-table-column prop="projectJobName" min-width="75px" align="left">
          <template slot-scope="scope">
            {{scope.row.projectJobName}}：{{scope.row.projectPersonName}}
          </template>
        </el-table-column>
        <el-table-column min-width="200px">
          <template slot-scope="scope">
            <template v-if="scope.row.projectJobName==='其他人员'">
              <el-col :span="4">工作备注</el-col>
              <el-col :span="20">{{scope.row.jobDesc}}</el-col>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="workItemName" min-width="100px" align="right">
          <template slot-scope="scope">
            <el-button type="text" style="float: right" @click="openChangePerson(scope.row)">变更人员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-person-dialog ref="addChangeRef" width="40%" @getFormData="submitAddFormData"></add-person-dialog>
      <change-person-dialog ref="upChangeRef" width="40%" @getFormData="submitUpFormData"></change-person-dialog>
    </div>
  </div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddPersonDialog from './dialog/AddPersonDialog.vue'
  import ChangePersonDialog from './dialog/ChangePersonDialog.vue'
  import ExpandTable from '../../../../../../acomponents/table/ExpandTable.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('workbench/aStage')
  export default {
    components: {
      AddPersonDialog,
      ChangePersonDialog,
      ExpandTable,
    },
    props: {},
    //生命周期函数节点
    created() {
    },
    mounted() {
    },
    watch: {},
    //数据节点
    computed: {
      ...mapState({
        workGroupInfo: 'currWorkGroupInfo',
        historyWorkGroupInfo: 'historyWorkGroupInfo'
      })
    },
    data() {
      return {
        expandRow:{},
      }
    },

    //自定义函数节点
    methods: {
      ...mapActions({
        networkHistoryWorkGroupInfo: 'networkHistoryWorkGroupInfo',
        networkAddWorkGroup:'networkAddWorkGroup',
        networkUpWorkGroup:'networkUpWorkGroup',
      }),
      tableExpandChange(row, expandedRows) {
      },
      openChangePerson(data) {
        if (data.projectJobName==='其他人员') {
          this.$refs.upChangeRef.openDialog({showOtherNote: true, data: data})
        } else {
          this.$refs.upChangeRef.openDialog({data: data})
        }
      },
      submitAddFormData(formData){
        this.networkAddWorkGroup(formData)
      },
      submitUpFormData(formData){
        this.networkUpWorkGroup(formData)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
