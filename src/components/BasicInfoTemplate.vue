<template>
  <div class="show-body">
    <template v-if="showType==='p'">
      <div class="show-data">
        <template v-for="(item,key) in labelPropList">
          <div v-if="key<=index">
            <template v-if="item.type==='file'">
              <p>{{item[label]}}
                <template v-for="(btn,index) in item['btns']">
                  <template v-if="btn.type==='button'">
                    <el-button type="text" @click="$emit('click',item.key+(index+1),dataBase[item.key])">{{btn.name}}</el-button>
                  </template>
                  <template v-if="btn.type==='tag'">
                    <el-tag>审核中</el-tag>
                  </template>
                </template>
              </p>
            </template>
            <template v-else>
              <p>{{item[label]}}：{{$myfunction.getFinalData(dataBase,item.key)}}</p>
            </template>
          </div>
        </template>
      </div>
      <div class="show-data">
        <template v-for="(item,key) in labelPropList">
          <div v-if="key>index">
            <template v-if="item.type==='file'">
              <p>{{item[label]}}
                <template v-for="(btn,index) in item['btns']">
                  <template v-if="btn.type==='button'">
                    <el-button type="text" @click="$emit('click',item.key+(index+1),dataBase[item.key])">{{btn.name}}</el-button>
                  </template>
                  <template v-if="btn.type==='tag'">
                    <el-tag>审核中</el-tag>
                  </template>
                </template>
              </p>
            </template>
            <template v-else>
              <p>{{item[label]}}：{{$myfunction.getFinalData(dataBase,item.key)}}</p>
            </template>
          </div>
        </template>
      </div>
    </template>
    <template v-if="showType==='table'">
      <div class="show-data">
        <table>
          <template v-for="(item,key) in labelPropList">
            <template v-if="key<=index">
              <template v-if="item.type==='file'">
                <tr>
                  <td>{{item[label]}}：</td>
                  <td>
                    <template v-for="(btn,index) in item['btns']">
                      <template v-if="btn.type==='button'">
                        <el-button type="text" @click="$emit('click',item.key+(index+1),dataBase[item.key])">{{btn.name}}</el-button>
                      </template>
                      <template v-if="btn.type==='tag'">
                        <el-tag>审核中</el-tag>
                      </template>
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                  <tr>
                    <td>{{item[label]}}：</td>
                    <td>
                      {{$myfunction.getFinalData(dataBase,item.key)}}
                    </td>
                  </tr>
              </template>
            </template>
          </template>
        </table>
      </div>
      <div class="show-data">
        <table>
          <template v-for="(item,key) in labelPropList">
            <template v-if="key>index">
              <template v-if="item.type==='file'">
                <tr>
                  <td>{{item[label]}}：</td>
                  <td>
                    <template v-for="(btn,index) in item['btns']">
                      <template v-if="btn.type==='button'">
                        <el-button type="text" @click="$emit('click',item.key+(index+1),dataBase[item.key])">{{btn.name}}</el-button>
                      </template>
                      <template v-if="btn.type==='tag'">
                        <el-tag>审核中</el-tag>
                      </template>
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td>{{item[label]}}：</td>
                  <td>
                    {{$myfunction.getFinalData(dataBase,item.key)}}
                  </td>
                </tr>
              </template>
            </template>
          </template>
        </table>
      </div>
    </template>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      label:{
        type:String,
        default:'label'
      },
      showType: {
        type: String,
        default: 'p'
      },
      dataBase: {
        type: Object,
        default: () => {
          return {}
        }
      },
      labelPropList: {
        type: Array,
        default: () => {
          return []
        }
      },
      index: {
        type: Number,
        default: 10
      }
    },
    watch: {},
    //数据节点
    data() {
      return {}
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
  .show-body {
    position: relative;
    height: 650px;
    overflow: auto;
    padding: 0 10px;
    .show-data {
      width: 49%;
      p {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 10px;
      }
      table {
        border: 1px;
        tr {
          td {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            margin-bottom: 10px;
            &:nth-child(1) {
              text-align: right;
            }
          }
        }
      }
      &:nth-child(1) {
        position: absolute;
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        right: 5px;
      }
    }
  }
</style>
