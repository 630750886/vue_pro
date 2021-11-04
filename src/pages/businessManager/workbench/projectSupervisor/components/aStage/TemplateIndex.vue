<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 600px;">
      <!--
      <el-tab-pane label="组建工作组" name="1">
              <establish-work-group v-if="activeName==='1'"></establish-work-group>
            </el-tab-pane>
            <el-tab-pane label="拟定工作计划" name="2">
              <establish-work-plan v-if="activeName==='2'"></establish-work-plan>
            </el-tab-pane>
           <el-tab-pane label="准备工作" name="3">
            <preparation v-if="activeName==='3'"></preparation>
          </el-tab-pane>
      -->
      <el-tab-pane label="登记委托联系人" name="1">
        <contact-person-table></contact-person-table>
      </el-tab-pane>
      <!-- type ：  资料类型 -->
      <el-tab-pane label="收集资料" name="2">
        <com-document is-add-means code="TYPE-091"></com-document>
      </el-tab-pane>
      <el-tab-pane label="施工许可阶段文件" name="3">
        <com-document code="TYPE-098"></com-document>
      </el-tab-pane>
      <el-tab-pane label="监理文件" name="4">
        <com-document code="TYPE-099"></com-document>
      </el-tab-pane>
			<el-tab-pane label="人员签发文件" name="5">
        <com-document code="TYPE-100"></com-document>
			</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import Preparation from './template/Preparation.vue'
  import ContactPersonTable from './table/ContactPersonTable.vue'
  import MultipleTableTemplate from '../../../acomponents/MultipleTableTemplate.vue'
  export default {
    components: {
      ContactPersonTable,
      Preparation,
			MultipleTableTemplate,
    },
    props: {},
    watch: {
      activeName(newValue){
        this.session.setItem('activeName_aStage',newValue)
      }
    },
    //数据节点
    data() {
      return {
        activeName:this.session.getItem('activeName_aStage')?this.session.getItem('activeName_aStage'):'1',
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>

</style>
