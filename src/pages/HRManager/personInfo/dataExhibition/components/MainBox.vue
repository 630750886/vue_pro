<template>
  <div class="main-box">
    <div class="column">
      <showcase title="学历统计" type="数量" :header-column="educationStr"></showcase>
      <showcase title="人员结构" type="百分比" :header-column="personStr"></showcase>
      <showcase title="工龄结构" type="数量" :header-column="workYearStr"></showcase>
      <showcase title="年龄结构" type="数量" :header-column="ageStr"></showcase>
      <showcase title="男女结构" type="数量/百分比" :header-column="genderStr"></showcase>
      <showcase title="离职分析" type="数量" :header-column="quitAnalysis"></showcase>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import Showcase from './Showcase.vue'
  export default {
    components: {
      Showcase
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        educationStr:[
          {prop:'k1',label:'组织'},
          {prop:'k2',label:'部门'},
          {prop:'k3',label:'博士'},
          {prop:'k4',label:'研究生'},
          {prop:'k5',label:'本科'},
          {prop:'k6',label:'大专'},
          {prop:'k7',label:'高中/中专'},
          {prop:'k8',label:'初中'},
          {prop:'k9',label:'初中以下'},
        ],
        personStr:[

        ],
        workYearStr:[
          {prop:'k1',label:'组织'},
          {prop:'k2',label:'部门'},
          {prop:'k3',label:'半年'},
          {prop:'k4',label:'半年-1年'},
          {prop:'k5',label:'1-3年'},
          {prop:'k6',label:'3-5年'},
          {prop:'k7',label:'5-10年'},
          {prop:'k8',label:'10年以上'},
        ],
        ageStr:[
          {prop:'k1',label:'组织'},
          {prop:'k2',label:'部门'},
          {prop:'k3',label:'16-25'},
          {prop:'k4',label:'26-35'},
          {prop:'k5',label:'36-45'},
          {prop:'k6',label:'46-50'},
          {prop:'k7',label:'50以上'},
        ],
        genderStr:[
          {prop:'k1',label:'组织'},
          {prop:'k2',label:'部门'},
          {prop:'k3',label:'男'},
          {prop:'k4',label:'女'},

        ],
        quitAnalysis:[
          {prop:'k1',label:'组织'},
          {prop:'k2',label:'部门'},
          {prop:'k3',label:'离职总数'},
          {prop:'k4',label:'本年度'},
          {prop:'k5',label:'近3年'},
        ]
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
  .main-box {
    margin: 0 auto;
    padding: 10px 10px 0;
    height: 600px;
    overflow-y:auto;
    background: url("../../../../../../public/images/ec-3.jpg") no-repeat top center;
    background-size: 100% 100%;
    .column{

    }
  }
</style>
