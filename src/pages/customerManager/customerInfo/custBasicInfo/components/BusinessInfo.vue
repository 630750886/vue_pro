<template>
  <div class="body">
      <div class="card-head"></div>
      <div class="card-main">
        <div class="column">
          <com-showinfo :data-base="dataBasic" :label-prop-list="infoArray" label="value"></com-showinfo>
          <!--<div class="show-data">
            <template v-for="(item,key) in infoArray">
              <div v-if="key<=index">
                <p>{{item.value}}{{dataInfo[item.key]}}</p>
              </div>
            </template>
          </div>
          <div class="show-data">
            <template v-for="(item,key) in infoArray">
              <div v-if="key>index">
                <p>{{item.value}}{{dataInfo[item.key]}}</p>
              </div>
            </template>
          </div>-->
        </div>
        <div class="column">
          <div class="table-el">
            <div class="table-el-head">
              <span style="font-size: 16px">项目实施中产生的客户联系人</span>
            </div>
            <el-table
                    :data="contacts.dataList"
                    style="width: 100%"
                    align="center"
                    height="430px"
                    highlight-current-row
                    border
                    :header-cell-style="{fontSize:'14px'}">
              <el-table-column prop="name" label="项目联系人" align="center">
                <template slot-scope="scope">
                  <i :class="isImportant?'el-icon-star-on':'el-icon-star-off'"
                     @click="isImportant=!isImportant" style="font-size: 16px;color: #409EFF"></i>
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="联系人电话" align="center"></el-table-column>
              <el-table-column prop="department" label="联系人部门" align="center"></el-table-column>
              <el-table-column prop="duty" label="联系人职务" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <el-button type="text" size="mini">修改</el-button>
                <el-button type="text" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
        </div>


      </div>
    <add-contacts-dialog ref="contactsRef" title="新增项目实施中的客户联系人" width="35%"
                         @getFormData="submitContacts"></add-contacts-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddContactsDialog from './dialog/AddContactsDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('customerInfo')
  export default {
    components: {
      AddContactsDialog
    },
    props: {
    },
    watch: {
    },
    computed:{
        ...mapState({
          dataBasic: 'dataBasic',
          contacts: 'contacts',
        })
    },
    //数据节点
    data() {
      return {
        isImportant:false,
        infoArray: [
          {key: 'gczx', value: '工程咨询'},
          {key: 'zjzx', value: '造价咨询'},
          {key: 'zbdl', value: '招标代理'},
          {key: 'gcjl', value: '工程监理'},
          {key: 'xmgl', value: '项目管理'},
          {key: 'qgczx', value: '全过程工程咨询'},
          {key: 'startServerTime', value: '系统最早服务时间'},
          {key: 'lastServerTime', value: '最后服务时间'},
          /*{key: 'result', value: '对于无新增业务的回访结果'}*/
        ],
        index: 20,
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitContacts(data) {
        this.$set(data, 'status', 1)
        this.$emit('function', data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    span{
      font-size: 16px;
    }
    .card-head {
      height: 30px;
      margin-bottom: 20px;
      .el-col {
        position: relative;
        height: 30px;
        line-height: 30px;
        span {
          font-size: 20px;
        }
        .el-button {
          position: absolute;
          top: 0;
          right: 0;
        }

      }
    }
    .card-main {
      display: flex;
      .column{
        flex: 2;
        &:nth-child(1){
          position: relative;
          .show-data {
            width: 50%;
            p{
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              margin-bottom: 10px;
            }
            &:nth-child(2) {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
        &:nth-child(2){
          .table-el {
            background-color: #e7e8e9;
            padding: 10px;
            .table-el-head {
              position: relative;
              height: 30px;
              line-height: 30px;
              span {
                font-size: 14px;
              }
              .el-button {
                position: absolute;
                top: 0;
                right: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
