<template>
  <div class="body">
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label">社保情况</span>
        <div class="table">
          <el-table :data="social.dataList" height="7.5rem" align="center" border>
            <el-table-column label="年" prop="year" align="center"></el-table-column>
            <el-table-column label="一月" prop="month1" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month1==='未缴纳'" style="color: red">{{scope.row.month1}}</span>
                <span v-else>{{scope.row.month1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="二月" prop="month2" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month2==='未缴纳'" style="color: red">{{scope.row.month2}}</span>
                <span v-else>{{scope.row.month2}}</span>
              </template>
            </el-table-column>
            <el-table-column label="三月" prop="month3" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month3==='未缴纳'" style="color: red">{{scope.row.month3}}</span>
                <span v-else>{{scope.row.month3}}</span>
              </template>
            </el-table-column>
            <el-table-column label="四月" prop="month4" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month4==='未缴纳'" style="color: red">{{scope.row.month4}}</span>
                <span v-else>{{scope.row.month4}}</span>
              </template>
            </el-table-column>
            <el-table-column label="五月" prop="month5" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month5==='未缴纳'" style="color: red">{{scope.row.month5}}</span>
                <span v-else>{{scope.row.month5}}</span>
              </template>
            </el-table-column>
            <el-table-column label="六月" prop="month6" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month6==='未缴纳'" style="color: red">{{scope.row.month6}}</span>
                <span v-else>{{scope.row.month6}}</span>
              </template>
            </el-table-column>
            <el-table-column label="七月" prop="month7" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month7==='未缴纳'" style="color: red">{{scope.row.month7}}</span>
                <span v-else>{{scope.row.month7}}</span>
              </template>
            </el-table-column>
            <el-table-column label="八月" prop="month8" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month8==='未缴纳'" style="color: red">{{scope.row.month8}}</span>
                <span v-else>{{scope.row.month8}}</span>
              </template>
            </el-table-column>
            <el-table-column label="九月" prop="month9" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month9==='未缴纳'" style="color: red">{{scope.row.month9}}</span>
                <span v-else>{{scope.row.month9}}</span>
              </template>
            </el-table-column>
            <el-table-column label="十月" prop="month10" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month10==='未缴纳'" style="color: red">{{scope.row.month10}}</span>
                <span v-else>{{scope.row.month10}}</span>
              </template>
            </el-table-column>
            <el-table-column label="十一月" prop="month11" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month11==='未缴纳'" style="color: red">{{scope.row.month11}}</span>
                <span v-else>{{scope.row.month11}}</span>
              </template>
            </el-table-column>
            <el-table-column label="十二月" prop="month12" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month12==='未缴纳'" style="color: red">{{scope.row.month12}}</span>
                <span v-else>{{scope.row.month12}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <pagination :pageTotal="social.total"
                      @handleCurrentChange="socialHandleCurrentChange"
                      @handleSizeChange="socialHandleSizeChange"></pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">公积金情况</span>
        <div class="table">
          <el-table :data="fund.dataList" height="7.4rem" align="center" border>
            <el-table-column label="年" prop="year" align="center"></el-table-column>
            <el-table-column label="一月" prop="month1" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month1==='未缴纳'" style="color: red">{{scope.row.month1}}</span>
                <span v-else>{{scope.row.month1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="二月" prop="month2" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month2==='未缴纳'" style="color: red">{{scope.row.month2}}</span>
                <span v-else>{{scope.row.month2}}</span>
              </template>
            </el-table-column>
            <el-table-column label="三月" prop="month3" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month3==='未缴纳'" style="color: red">{{scope.row.month3}}</span>
                <span v-else>{{scope.row.month3}}</span>
              </template>
            </el-table-column>
            <el-table-column label="四月" prop="month4" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month4==='未缴纳'" style="color: red">{{scope.row.month4}}</span>
                <span v-else>{{scope.row.month4}}</span>
              </template>
            </el-table-column>
            <el-table-column label="五月" prop="month5" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month5==='未缴纳'" style="color: red">{{scope.row.month5}}</span>
                <span v-else>{{scope.row.month5}}</span>
              </template>
            </el-table-column>
            <el-table-column label="六月" prop="month6" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month6==='未缴纳'" style="color: red">{{scope.row.month6}}</span>
                <span v-else>{{scope.row.month6}}</span>
              </template>
            </el-table-column>
            <el-table-column label="七月" prop="month7" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month7==='未缴纳'" style="color: red">{{scope.row.month7}}</span>
                <span v-else>{{scope.row.month7}}</span>
              </template>
            </el-table-column>
            <el-table-column label="八月" prop="month8" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month8==='未缴纳'" style="color: red">{{scope.row.month8}}</span>
                <span v-else>{{scope.row.month8}}</span>
              </template>
            </el-table-column>
            <el-table-column label="九月" prop="month9" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month9==='未缴纳'" style="color: red">{{scope.row.month9}}</span>
                <span v-else>{{scope.row.month9}}</span>
              </template>
            </el-table-column>
            <el-table-column label="十月" prop="month10" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month10==='未缴纳'" style="color: red">{{scope.row.month10}}</span>
                <span v-else>{{scope.row.month10}}</span>
              </template>
            </el-table-column>
            <el-table-column label="十一月" prop="month11" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month11==='未缴纳'" style="color: red">{{scope.row.month11}}</span>
                <span v-else>{{scope.row.month11}}</span>
              </template>
            </el-table-column>
            <el-table-column label="十二月" prop="month12" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.month12==='未缴纳'" style="color: red">{{scope.row.month12}}</span>
                <span v-else>{{scope.row.month12}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <pagination :pageTotal="fund.total"
                      @handleCurrentChange="fundHandleCurrentChange"
                      @handleSizeChange="fundHandleSizeChange"></pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <social-fund-dialog ref="addSocialRef" title="新增社保信息" dialog-width="30%"
                        @getFormData="submitAddSocialFormData"></social-fund-dialog>

    <social-fund-dialog ref="updateSocialRef" title="修改社保信息"  dialog-width="30%"
                        @getFormData="submitUpdateSocialFormData"></social-fund-dialog>

    <social-fund-dialog  ref="addFundRef" title="新增公积金信息" dialog-width="30%"
                        @getFormData="submitAddFundFormData"></social-fund-dialog>

    <social-fund-dialog ref="updateFundRef" title="修改公积金信息" dialog-width="30%"
                        @getFormData="submitUpdateFundFormData"></social-fund-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import SocialFundDialog from './dialog/SocialFundDialog.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import Insurance from './Insurance.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      SocialFundDialog,
      pagination,
      Insurance
    },
    props: {

    },
    watch: {

    },
    computed:{
        ...mapGetters({
          social:'social',
          fund:'fund'
        })
    },
    //数据节点
    data() {
      return {
        addSocialDialogVisible: false,
        updateSocialDialogVisible: false,
        addFundDialogVisible: false,
        updateFundDialogVisible: false,
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
        },

      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      socialHandleCurrentChange(val) {
        this.pageShow.page = val;
      },
      socialHandleSizeChange(val) {
        this.pageShow.limit = val;
      },
      fundHandleCurrentChange(val) {
        this.pageShow.page = val;
      },
      fundHandleSizeChange(val) {
        this.pageShow.limit = val;
      },

      //数据格式化
      groupBy(array) {
        const _this = this
        let returnArray = []
        let obj = {}
        if (array.length > 0) {
          array.sort(this.arraySort('year','Desc'))
          for (let i = 0; i < array.length; i++) {
            _this.$set(obj, 'year', array[i].year)
            _this.$set(obj, 'month' + array[i].month, array[i].isPayment)
            if (i + 1 >= array.length) {
              returnArray.push(obj)
              obj={}
            }else if (array[i].year !== array[i+1].year) {
              returnArray.push(obj)
              obj={}
            }
          }
        }

        return returnArray
      },
      arraySort(property,type) {
        return (firstobj, secondobj) => {
          const firstValue = firstobj[property];
          const secondValue = secondobj[property];
          switch (type) {
            case "Desc":
              return secondValue - firstValue; //降序
            case "Asc":
              return firstValue - secondValue; //升序
            default:
              return firstValue - secondValue; //升序
          }
        };
      },
      submitAddSocialFormData(data) {
        this.$set(data, 'types', 0)
        this.$emit('function', 'addFormData', data)
      },
      submitAddFundFormData(data) {
        this.$set(data, 'types', 1)
        this.$emit('function', 'addFormData', data)
      },
      submitUpdateSocialFormData(data) {
        this.$emit('function', 'updateFormData', data)
      },
      submitUpdateFundFormData(data) {
        this.$emit('function', 'updateFormData', data)
      },

    }
  }
</script>
<style lang='less' scoped>
  .body {
    width: 100%;
    height: 100%;
    background-color: white;
    .el-tabs{
      span{
        font-size: 16px;
      }
    }
    .el-card{
      .el-table{
        height: 0.742rem;

      }
    }
  }

</style>
