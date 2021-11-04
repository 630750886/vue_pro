<template>
  <div class="content el-scrollbar">
    <el-tabs>
      <el-tab-pane label="登记委托联系人" name="1">
        <contact-person-table title="联系人" contact-type="1"></contact-person-table>
      </el-tab-pane>
      <el-tab-pane label="收集资料" name="2">
        <com-document is-add-means code="TYPE-150"></com-document>
      </el-tab-pane>
      <!--402880fa75f83ee40175f90b79c4000c 造价鉴定-->
      <template v-if="currentItem.projectTypeCode==='402880fa75f83ee40175f90b79c4000c'">
        <el-tab-pane  label="当事人双方联系人" name="3">
          <contact-person-table title="当事人" contact-type="2" :is-unit="true"></contact-person-table>
        </el-tab-pane>
        <el-tab-pane label="鉴定取证" name="4">
          <com-document is-add-means code="TYPE-151"></com-document>
          <!--<el-tabs>
            <el-tab-pane v-for="item in appraisalType" :label="item.listname" :key="item.id">
              <appraisal-means-table :data="item"></appraisal-means-table>
            </el-tab-pane>
          </el-tabs>-->
        </el-tab-pane>
      </template>

    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ContactPersonTable from './component/Preparation/table/ContactPersonTable.vue'
  import MaterialTable from './component/Preparation/table/MeansTable.vue'
  import AppraisalMeansTable from './component/Preparation/table/AppraisalMeansTable.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      ContactPersonTable,
      MaterialTable,
      AppraisalMeansTable
    },
    props: {},
    watch: {},
    computed: {
      ...mapState({
        itemContacts: 'itemContacts',
        materialList: 'materialList'
      }),
      ...mapState('workbench/aStage',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        activeName: '1',
        appraisalType: []
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetSelectByCode('TYPE-067').then(item => {
        this.appraisalType = item
      })
    },
    //自定义函数节点
    methods: {
      ...mapActions('loadType', {
        networkGetSelectByCode: 'networkGetSelectByCode'
      }),
    }
  }
</script>
<style lang='less' scoped>
  .main-body {
    height: 7.416rem;
    overflow-y: auto;
  }

  .content {
    height: 650px;
    overflow-x: hidden;
    overflow-y: auto;
    .column {
      border-bottom: solid 1px #bfcbd9;
      margin-bottom: 10px;
      .button {
        height: 40px;
        line-height: 40px;
        text-align: right;
      }
    }
  }
</style>
