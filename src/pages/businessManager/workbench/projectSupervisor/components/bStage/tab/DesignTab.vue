<template>
	<div class="b-main">
		<el-tabs v-model="activeName" tab-position="top" style="height: 600px;">
		  <el-tab-pane label="监理报告及监理通知单" name="1">
				<com-document code="TYPE-107"></com-document>
		  </el-tab-pane>
		  <el-tab-pane label="审查设计单位相关文件" name="2">
		    <examination-company-table type-code="design"></examination-company-table>
		  </el-tab-pane>
			<el-tab-pane label="设计过程监理即工作汇总" name="3">
				<com-document code="TYPE-108"></com-document>
		  </el-tab-pane>

		</el-tabs>

		</div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ExaminationCompanyTable from '../table/ExaminationCompanyTable.vue'


  export default {
    components: {
      ExaminationCompanyTable,
    },
    props: {},
    watch: {},

    //数据节点
    data() {
      return {
        activeName: '1',

      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {

    }
  }
</script>
<style lang='less' scoped>
	.b-main {
		height: 80%;
	}
</style>
