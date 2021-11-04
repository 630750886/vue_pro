<template>
  <div class='previewPdf' v-loading="loading" element-loading-text="加载中">
    <section class="pdf-btn" id="previewBtn">
      <el-button @click.stop="newPagePreview" type="primary" icon="el-icon-document">新页面预览PDF</el-button>
      <el-button @click.stop="print" type="primary" icon="el-icon-printer">打 印</el-button>
    </section>
    <iframe :src="src" width="100%" :height="height" id="previewPdf" frameborder="0"
            scrolling="no"></iframe>
  </div>
</template>
 
<script>
export default {
  name: 'previewPdf',
  data () {
    return {
      loading: true,
      height: '100%',
      src: ''
    }
  },
  mounted () {
    this.height = document.body.offsetHeight - 105 + 'px'
    this.handlePreview()
  },
  methods: {
    /**
     * 新页面预览接口返回的pdf文件流
     * @param {string} url 接口url
     * @param {int} type 1为返回url对象，用于新页面除PDF外还有其它操作；2为直接打开新页面预览PDF
     * @param {string} callBack 回调
     */
    previewPdf (url, type = 1, callBack) {
      let xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open('get', url, true)
      xhr.setRequestHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status === 200) {
          let changeUrl = ''
          let file = new Blob([this.response], { type: 'application/pdf' })
          if (window.createObjectURL !== undefined) { // basic
            changeUrl = window.createObjectURL(file)
          } else if (window.webkitURL !== undefined) { // webkit or chrome
            try {
              changeUrl = window.webkitURL.createObjectURL(file)
            } catch (error) {
 
            }
          } else if (window.URL !== undefined) { // Mozilla (firefox)
            try {
              changeUrl = window.URL.createObjectURL(file)
            } catch (error) {
 
            }
          }
          if (type === 1) {
            callBack && callBack(changeUrl)
          } else {
            let a = document.createElement('a')
            a.href = changeUrl
            a.target = '_blank'
            let evt = document.createEvent('MouseEvents')
            evt.initEvent('click', true, true)
            a.dispatchEvent(evt)
          }
        }
      }
      xhr.send()
    },
    // 文件流pdf转换
    handlePreview () {
      this.previewPdf('/test/previewFile', 1, (changeUrl) => {
        this.src = changeUrl
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    // 新页面预览PDF
    newPagePreview () {
      this.previewPdf('/test/previewFile', 2, '')
    },
    // 打印
    print () {
      const iframe = document.getElementById('previewPdf')
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
    }
  }
}
</script>
 
<style lang="less" scoped>
  .previewPdf {
    width: 100%;
    height: 100%;
    .pdf-btn {
      display: flex;
      justify-content: flex-end;
      padding: 30px 50px;
      > button {
        margin: 0 20px;
      }
    }
  }
</style>
<style lang="less">
  .previewPdf {
    .el-loading-mask {
      position: fixed;
      overflow: hidden;
    }
  }
</style>