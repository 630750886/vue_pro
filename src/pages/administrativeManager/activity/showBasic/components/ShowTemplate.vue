<template>
  <div class="mini-body el-scrollbar">
    <div class="panel1">
      <div class="column">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane name="1">
            <span  slot="label">基本信息</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {

    },
    props: {
      dataBase:Object,
    },
    watch: {},
    //数据节点
    data() {
      return {
        show: true,
        activeName:'1',
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitForm(form){
        this.$emit('function','upForm',form)
      },
      tabsHandleClick(){

      }
    }
  }
</script>
<style lang='less' scoped>
  .mini-body {
    height: 680px;
    overflow-y: auto;
    .panel1 {
      display: flex;
      margin-top: 20px;
      .column {
        flex: 2;
        padding: 0 10px;
        span{
          font-size: 16px;
        }
      }
    }
    .panel2 {
      .column {
        padding: 0 10px;
      }
    }
  }

</style>
