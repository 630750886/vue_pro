<template>
  <div class="show-body" :style="{height:index*40+'px'}">
    <template v-if="showType=='p'">
      <div class="show-data" :style="{height:index*37+'px'}">
        <template v-for="(item,key) in labelPropList">
          <template v-if="key<=index">
            <template v-if="item.type==='file'">
              <p :key="'p'+key">
                <span class="label">{{item[label]}}</span>：
                <template v-for="(btn,index) in item['btns']">
                  <template v-if="btn.type==='button'">
                    <template v-if="btn.name==='下载'">
                      <template v-if="dataBase[item.key].indexOf(',')!==-1">
                        <template v-for="(file,index) in dataBase[item.key].split(',')">
                          <download-button :value="file" :key="'file'+index"></download-button>
                        </template>
                      </template>
                      <template v-else>
                        <download-button :value="dataBase[item.key]" :key="index"></download-button>
                      </template>
                    </template>
                    <template v-else-if="btn.name==='存档'">
                      <preserve-button :data="dataBase" :file-key="item.key" :key="'p'+index" @click="preservedUpData"></preserve-button>
                    </template>
                    <template v-else-if="!$myfunction.isEmpty(dataBase[item.key])">
                      <el-button type="text" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})" :key="'b'+index">{{btn.name}}</el-button>
                    </template>
                  </template>
                  <template v-if="btn.type==='tag'">
                    <el-tag :key="'tag'+index">审核中</el-tag>
                  </template>
                </template>
              </p>
            </template>
            <template v-else-if="item.type==='title'">
              <rea-divider :title="item[label]" :key="'r'+item.key"></rea-divider>
            </template>
            <template v-else-if="item.type==='boolean' || item.type==='bol'">
              <p :key="'aa'+key"><span class="label">{{item[label]}}</span>：
                {{dataBase[item.key]=='true'||dataBase[item.key]===true?'是':dataBase[item.key]=='false' || dataBase[item.key]===false?'否':''}}</p>
            <template v-for="(btn,index) in item['btns']">
                <template v-if="btn.type==='button'">
                  <template v-if="btn.name==='下载'">
                    <download-button :value="dataBase[item.key]" :key="'Down'+index"></download-button>
                  </template>
                  <template v-else-if="!$myfunction.isEmpty(dataBase[item.key])">
                    <el-button type="text" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})" :key="'elbud'+index">{{btn.name}}</el-button>
                  </template>
                </template>
                <template v-if="btn.type==='upload'">
                  <upload-button :key="'up'+index"></upload-button>
                </template>
                <template v-if="btn.type==='submit'">
                  <submit-button :title="btn.name" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})" :key="'sub'+index"></submit-button>
                </template>
                <template v-if="btn.type==='status'">
                  <status-button title="审核中" :key="'stb'+index"></status-button>
                </template>
            </template>
            </template>
            <template v-else>
               <p><span class="label">{{item[label]}}:</span>
                <template v-if="typeof dataBase[item.key]!=='string'">
                  {{$myfunction.getFinalData(dataBase,item.key)}}
                </template>
                <template v-else-if="bystesLength(dataBase[item.key])<50">
                 {{$myfunction.getFinalData(dataBase,item.key)}}
                </template>
                <template v-else-if="bystesLength(dataBase[item.key])>=50">
                       <el-tooltip size="mini" class="item" effect="dark" placement="top">
                         <div slot="content" class="hdddddiv">{{$myfunction.getFinalData(dataBase,item.key)}}</div>
                        <el-button size="mini" type="text" class="btspan">{{thsubstr($myfunction.getFinalData(dataBase,item.key), 0, 46)}}...</el-button>
                      </el-tooltip>
                </template>
              </p>
            </template>
          </template>
        </template>
      </div>
      <div class="show-data" :style="{height:index*37+'px'}">
        <template v-for="(item,key) in labelPropList">
          <template v-if="key>index">
            <template v-if="item.type==='file'">
              <p :key="'p'+key"><span class="label">{{item[label]}}</span>：
                <template v-for="(btn,index) in item['btns']">
                  <template v-if="btn.type==='button'">
                    <template v-if="btn.name==='下载'">
                      <template v-if="dataBase[item.key].indexOf(',')!==-1">
                        <template v-for="(file,index) in dataBase[item.key].split(',')">
                          <span style="margin-left: 10px" :key="'sp'+index">修改{{index+1}}:<download-button :value="file"></download-button></span>
                        </template>
                      </template>
                      <template v-else>
                        <download-button :value="dataBase[item.key]" :key="'db'+index"></download-button>
                      </template>
                    </template>
                    <template v-else-if="btn.name==='存档'">
                      <preserve-button :data="dataBase" :file-key="item.key" :key="'p'+index" @click="preservedUpData"></preserve-button>
                    </template>
                    <template v-else-if="!$myfunction.isEmpty(dataBase[item.key])">
                      <el-button type="text" :key="'bt'+index"  @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})">{{btn.name}}</el-button>
                    </template>
                  </template>
                  <template v-if="btn.type==='tag'">
                    <el-tag :key="'tag'+index">审核中</el-tag>
                  </template>
                </template>
              </p>
            </template>
            <template v-else-if="item.type==='title'">
              <rea-divider :title="item[label]" :key="'rd'+key"></rea-divider>
            </template>
            <template v-else-if="item.type==='boolean' || item.type==='bol'">
              <p><span class="label">{{item[label]}}:</span>
                {{dataBase[item.key]=='true'||dataBase[item.key]===true?'是':dataBase[item.key]=='false' || dataBase[item.key]===false?'否':''}}
              </p>
              <template v-for="(btn,index) in item['btns']">
                <template v-if="btn.type==='button'">
                  <template v-if="btn.name==='下载'">
                    <download-button :value="dataBase[item.key]" :key="'TD'+index"></download-button>
                  </template>
                  <template v-else-if="!$myfunction.isEmpty(dataBase[item.key])">
                    <el-button :key="'te'+index" type="text" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})">{{btn.name}}</el-button>
                  </template>
                </template>
                <template v-if="btn.type==='upload'">
                  <upload-button :key="'upl'+index"></upload-button>
                </template>
                <template v-if="btn.type==='submit'">
                  <submit-button :key="'sub'+index" :title="btn.name" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})"></submit-button>
                </template>
                <template v-if="btn.type==='status'">
                  <status-button :key="'st'+index" title="审核中"></status-button>
                </template>
              </template>
            </template>
            <template v-else>
              <p><span class="label">{{item[label]}}:</span>
                <template v-if="typeof dataBase[item.key]!=='string'">
                  {{$myfunction.getFinalData(dataBase,item.key)}}
                </template>
                <template v-else-if="bystesLength(dataBase[item.key])<50">
                 {{$myfunction.getFinalData(dataBase,item.key)}}
                </template>
                <template v-else-if="bystesLength(dataBase[item.key])>=50">
                       <el-tooltip size="mini" class="item" effect="dark" placement="top">
                         <div slot="content" class="hdddddiv">{{$myfunction.getFinalData(dataBase,item.key)}}</div>
                        <el-button size="mini" type="text" class="btspan">{{thsubstr($myfunction.getFinalData(dataBase,item.key), 0, 46)}}...</el-button>
                      </el-tooltip>
                </template>
              </p>
            </template>
          </template>
        </template>
      </div>
    </template>
    <template v-if="showType=='table'">
      <div class="show-data">
        <table>
          <template v-for="(item,key) in labelPropList">
            <template v-if="key<=index">
              <template v-if="item.type==='file'">
                <tr :key="'tr'+key">
                  <td>{{item[label]}}：</td>
                  <td>
                    <template v-for="(btn,btnindex) in item['btns']">
                      <template v-if="btn.type==='button'">
                        <el-button type="text" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})" :key="'btn'+btnindex">{{btn.name}}</el-button>
                      </template>
                      <template v-if="btn.type==='tag'">
                        <el-tag :key="'tag'+btnindex">审核中</el-tag>
                      </template>
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                  <tr :key="'tr'+key">
                    <td> {{item[label]}}：</td>
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
                <tr :key="'mtr'+key">
                  <td>{{item[label]}}：</td>
                  <td>
                    <template v-for="(btn,index) in item['btns']">
                      <template v-if="btn.type==='button'">
                        <el-button type="text" @click="$emit('click',{prop:item.key,btn:btn.name,value:dataBase[item.key]})" :key="'btt'+index">{{btn.name}}</el-button>
                      </template>
                      <template v-if="btn.type==='tag'">
                        <el-tag :key="'et'+index">审核中</el-tag>
                      </template>
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr :key="'mtr'+key">
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
  //import __ from '__' // __是需要手动引入的文件
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
        type: [Number,String],
        default: 10
      }
    },
    watch: {

    },
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      preservedUpData(upData){
        this.$emit('click',{prop:'',btn:'存档',value:upData})
      },
      thsubstr(str, start, n) { // eslint-disable-line
        str=str.replace(/\s*/g,""); //去除所有空格 str = str.replace(/\s*/g,"");
        if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
          return str;
        }
        let len = 0;
        let tmpStr = '';
        for (let i = start; i < str.length; i++) { //遍历字符串
          if (/[\u4e00-\u9fa5]/.test(str[i])) { //中文长度为两字节
            len += 2;
          } else {
            len += 1;
          }
          if (len > n) {
            break;
          } else {
            tmpStr += str[i];
          }
        }
        return tmpStr;
      },
      bystesLength(str){
        let count=0;
          for(var i=0;i<str.length;i++){
              if(str.charCodeAt(i)>255){
                  count+=2;
              }else{
                  count++;
              }
          }
        return count;
      }          
    }
  }
</script>
<style lang='less' scoped>
  .hdddddiv{
    width: 400px;
    margin: 0px;
    padding: 0px;
    line-height: 30px;
  }
  .btspan{
    color: #626568;
  }
  .show-body {
    color:#626568;
    position: relative;
    width: 90%;
    overflow: auto;
    padding: 0 5px;
    .show-data {
      p {
        width: 650px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 7px;
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
        width: 650px;
        top:0;
        right: 100px;
      }
    };
  }
  .labelover{
    width: 650px!important;
    height: 30px;
    line-height:30px;
    text-align: left;
    vertical-align: middle;
    color: #626568;
  }
</style>
