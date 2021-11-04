<template>
  <div class="showcase" :style="{height:isTrue ? '550px':'290px'}">
    <h2>{{title}}---{{type}}</h2>
    <el-button type="text" @click="handleChick">{{show}}</el-button>
    <div class="table-box" :style="{height: isTrue ? '495px':'235px'}">
      <el-table :data="dataList" height="100%" width="100%" 
      border 
      :span-method="objectSpanMethod">
        <el-table-column v-for="(item,key) in headerColumn" :key="key" :prop="item.prop" :label="item.label" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="panel-footer"></div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title:'',
      type:'',
      headerColumn:{
        type: Array,
        default:()=>{
          return []
        }
      },
      dataList:{
        type:Array,
        default:()=>{
          return [
            {k1:'总公司',k2:'总经办',k3:10,k4:30,k5:80,k6:60,k7:10,k8:2,k9:1},
            {k1:'总公司',k2:'财务部',k3:3,k4:6,k5:8,k6:10,k7:7,k8:2,k9:1},
            {k1:'分支机构',k2:'遵义分公司',k3:7,k4:13,k5:23,k6:45,k7:34,k8:8,k9:1},
            {k1:'分支机构',k2:'铜仁分公司',k3:9,k4:30,k5:80,k6:60,k7:10,k8:2,k9:1},
            {k1:'分支机构',k2:'重庆分公司',k3:4,k4:46,k5:24,k6:78,k7:12,k8:7,k9:1},
          ]
        }
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        isTrue:false,
        tableBoxWidth:'',
        show:'展开',
      }
    },
    mounted(){

    },

    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
      },
      handleChick(){
        this.isTrue=!this.isTrue
        if (this.isTrue) {
          this.show='关闭'
        }else {
          this.show='展开'
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .showcase{
    position: relative;
    height: 290px;
    border: 1px solid rgba(25,186,139,0.17);
    margin-bottom: 10px;
    padding: 10px;
    background: url("../../../../../../public/images/ec-3.jpg");
    background-size: 100% 100%;
    &::before{
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left:2px solid #02a6b5 ;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    &::after{
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right:2px solid #02a6b5 ;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    h2{
      height: 35px;
      color: #ffffff;
      text-align: center;
      font-size: 20px;
      font-weight: 400;
    }
    .el-button{
      position: absolute;
      top:0;
      right: 10px;
    }
    .table-box{
      height: 235px;
      background: rgba(101, 132, 226, 0.1);
    }
    .panel-footer{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left:2px solid #02a6b5 ;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
      &::after{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right:2px solid #02a6b5 ;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
    }
  }
</style>
