<template>
  <div class="main">
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <!-- 查询表单 单行-->
      <el-form :model="form" :inline="true" ref="formRef" :rules="formRules" class="demo-form-inline">
        <el-form-item label="数据名称">
          <query-input></query-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRemove">清空查询</el-button>
        </el-form-item>
        <el-form-item style="float: right;" v-if="showTale">
          <el-button type="primary">全部下载</el-button>
        </el-form-item>

      </el-form>
      <!-- 查询结果台账 -->
      <div v-if="showTale " class="table">
        <el-table :data="dataList" ref="tableRef" style="width: 100%;" :header-cell-style="{fontSize:'10px'}"
                  highlight-current-row algin="center"
                  border>
          <el-table-column prop="no" label="序号" align="center"></el-table-column>
          <el-table-column prop="name" label="资料名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button :scope="scope.row">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页显示 -->
        <div style="text-align: center;font-size: inherit;" v-if="dataList != []">
          <pagination
                  :pageTotal="total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange">
          </pagination>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件


  export default {
    components: {

    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        total: 3,
        dialogVisible: false,
        showTale: false,


        dataList: [],
        form: {
          contractType: '',
          contractCode: '',
          contractName: '合同一',
          itemCode: '',
          itemName: '',
          majorProject: '',
          decisionType: '',
          itemType: ''
        },
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      //回收数据
      onRemove() {
        this.dataList = [];
        this.showTale = false;
      },

      //提交查询
      onSubmit() {
        this.showTale = true;
        this.dataList = [{
          no: 1,
          name: "资料1",
          id: '1'
        },
          {
            no: 2,
            name: "资料2",
            id: '1'
          },
          {
            no: 3,
            name: "资料3",
            id: '1'
          },
        ]
      },
      //改变页码
      handleCurrentChange() {

      },
      handleSizeChange() {
      },
    }
  }
</script>
<style lang='less' scoped>
  .main {
    .block {

    }
  }
</style>
