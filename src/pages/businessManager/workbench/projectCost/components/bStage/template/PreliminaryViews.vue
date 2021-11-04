<template>
  <div class="body">
    <div class="button">
      <div class="column">
        <span>土建工程指标分析表：</span>
        <upload-button v-model="projectAnalysisFile"
                       module-type="xm"
                       file-name="土建工程指标分析表"
                       :base-id="$store.state.workbench.currentItem.keyid"
                       @getValue="networkServeFile"></upload-button>
        <download-button :value="projectAnalysisFile"></download-button>
      </div>
    </div>
    <gbq-table :title="title?title+'/合成底稿':'合成底稿'"></gbq-table>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import GbqTable from './table/GBQTable.vue'
  import {mapState} from 'vuex'
  import {
    getItemFiles,
    addItemFile,
    delItemFile,
    upItemFile,
    getItemFileList,
    addItemFileList,
    upItemFileList,
    delItemFileList
  } from '../../../../../../../api/workbench/webapi-fileManager.js'

  export default {
    components: {
      GbqTable
    },
    props: {
      title:[String]
    },
    watch: {},
    computed: {
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        isData: false,//是否已保存分析表
        data: '',
        projectAnalysisFile: ''
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    //自定义函数节点
    methods: {
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          resourcename: '土建工程指标分析表',
        }
        getItemFiles(ref).then(items => {
          this.data = items.data[0]
          if (!this.$myfunction.isEmpty(this.data)) {
            this.isData = true
            let ref = {
              resourcekeyid: this.data.keyid,
              filename: '土建工程指标分析表',
            }
            getItemFileList(ref).then(files => {
              this.projectAnalysisFile = files.data[0].fileAttch
            })
          } else {
            this.isData = false
          }
        })
      },
      networkServeFile(fileId) {
        //判断该项目是否已经上传分析表，如果没有则新增，有则修改其明细表里面的附件
        if (this.$myfunction.isEmpty(this.data)) {
          let ref = {
            projectKeyid: this.currentItem.keyid,
            resourcename: '土建工程指标分析表',
          }
          addItemFile(ref).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message)
              let ref = {
                resourcekeyid: item.data.keyid,
                filename: '土建工程指标分析表',
                fileAttch: fileId
              }
              addItemFileList(ref)
              this.networkGetDatas()
            }
          })
        } else {
          getItemFileList({resourcekeyid: this.data.keyid}).then(fileList => {
            let file = fileList.data[0]
            file.fileAttch = fileId
            upItemFileList(file).then(()=>{
              this.networkGetDatas()
            })
          })
        }
      },
    }
  }
</script>
<style lang='less' scoped>
  .body {
    .button {
      .column {
        height: 45px;
        width: 50%;
        float: left;
      }
    }
  }
</style>
