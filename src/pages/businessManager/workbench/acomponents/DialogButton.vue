<template>
  <div>
    <el-row>
      <el-col v-if="position==='left'">
        <div class="btn-left">
          <el-button v-if="newResetBtn.show" type="warning" @click="$emit('resetBtn')">{{newResetBtn.title}}</el-button>
          <el-button v-if="newCancelBtn.show" @click="$emit('cancelBtn')">{{newCancelBtn.title}}</el-button>
          <el-button v-if="newOkBtn.show" type="primary" @click="$emit('okBtn')">{{newOkBtn.title}}</el-button>
        </div>
      </el-col>
      <el-col v-if="position==='center'">
        <div class="btn-center">
          <el-button v-if="newResetBtn.show" type="warning" @click="$emit('resetBtn')">{{newResetBtn.title}}</el-button>
          <el-button v-if="newCancelBtn.show" @click="$emit('cancelBtn')">{{newCancelBtn.title}}</el-button>
          <el-button v-if="newOkBtn.show" type="primary" @click="$emit('okBtn')">{{newOkBtn.title}}</el-button>
        </div>
      </el-col>
      <el-col v-if="position==='right'">
        <div class="btn-right">
          <el-button v-if="newResetBtn.show" type="warning" @click="$emit('resetBtn')">{{newResetBtn.title}}</el-button>
          <el-button v-if="newCancelBtn.show" @click="$emit('cancelBtn')">{{newCancelBtn.title}}</el-button>
          <el-button v-if="newOkBtn.show" type="primary" @click="$emit('okBtn')">{{newOkBtn.title}}</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    props: {
      position:{
        type:String,
        default:'right'
      },
      resetBtn: '',
      cancelBtn: '',
      okBtn: ''
    },
    watch: {
      resetBrn() {
        this.loadResetBtn(this.resetBtn, this.newResetBtn)
      },
      canaelBtn() {
        this.loadCancelBtn(this.cancelBtn, this.newCancelBtn)
      },
      okBtn() {
        this.loadOkBtn(this.okBtn, this.newOkBtn)
      }
    },
    mounted(){

    },
    //数据节点
    data() {
      return {
        newResetBtn: {},
        newCancelBtn: {},
        newOkBtn: {},
      }
    },
    //生命周期函数节点
    created() {
      this.loadResetBtn(this.resetBtn, this.newResetBtn)
      this.loadCancelBtn(this.cancelBtn, this.newCancelBtn)
      this.loadOkBtn(this.okBtn, this.newOkBtn)

    },
    //自定义函数节点
    methods: {
      loadResetBtn(objBtn, targetBtn) {
        if (objBtn instanceof Object) {
          const _this = this
          let keysBtn = Object.keys(objBtn)
          keysBtn.forEach(key => {
            _this.$set(targetBtn, key, objBtn[key])
          })
          let bool = function () {
            let bo=false
            keysBtn.forEach(key => {
              if (key=='show') {
                bo=true
              }
            })
            return bo
          }
          if (!bool()) {
            _this.$set(targetBtn, 'show', true)
          }
        } else if (typeof objBtn === 'string') {
          if (objBtn.includes('true')) {
            this.$set(targetBtn, 'show', true)
            this.$set(targetBtn, 'title', '重 置')
          } else if (objBtn.includes('false')) {
            this.$set(targetBtn, 'show', false)
          } else {
            this.$set(targetBtn, 'show', true)
            this.$set(targetBtn, 'title', objBtn)
          }
        } else if (typeof objBtn==='boolean') {
          this.$set(targetBtn, 'show', objBtn)
          this.$set(targetBtn, 'title', '重 置')
        } else {
          this.$set(targetBtn, 'show', true)
          this.$set(targetBtn, 'title', '重 置')
        }
      },
      loadCancelBtn(objBtn, targetBtn) {
        if (objBtn instanceof Object) {
          const _this = this
          let keysBtn = Object.keys(objBtn)
          keysBtn.forEach(key => {
            _this.$set(targetBtn, key, objBtn[key])
          })
          let bool = function () {
            let bo=false
            keysBtn.forEach(key => {
              if (key=='show') {
                bo=true
              }
            })
            return bo
          }
          if (!bool()) {
            _this.$set(targetBtn, 'show', true)
          }
        } else if (typeof objBtn === 'string') {
          if (objBtn.includes('true')) {
            this.$set(targetBtn, 'show', true)
            this.$set(targetBtn, 'title', '取 消')
          } else if (objBtn.includes('false')) {
            this.$set(targetBtn, 'show', false)
          } else {
            this.$set(targetBtn, 'show', true)
            this.$set(targetBtn, 'title', objBtn)
          }
        } else if (typeof objBtn==='boolean') {
          this.$set(targetBtn, 'show', objBtn)
          this.$set(targetBtn, 'title', '取 消')
        } else {
          this.$set(targetBtn, 'show', true)
          this.$set(targetBtn, 'title', '取 消')
        }
      },
      loadOkBtn(objBtn, targetBtn) {
        if (objBtn instanceof Object) {
          const _this = this
          let keysBtn = Object.keys(objBtn)
          keysBtn.forEach(key => {
            _this.$set(targetBtn, key, objBtn[key])
          })
          let bool = function () {
            let bo=false
            keysBtn.forEach(key => {
              if (key=='show') {
                bo=true
              }
            })
            return bo
          }
          if (!bool()) {
            _this.$set(targetBtn, 'show', true)
          }
        } else if (typeof objBtn === 'string') {
          if (objBtn.includes('true')) {
            this.$set(targetBtn, 'show', true)
            this.$set(targetBtn, 'title', '确 定')
          } else if (objBtn.includes('false')) {
            this.$set(targetBtn, 'show', false)
          } else {
            this.$set(targetBtn, 'show', true)
            this.$set(targetBtn, 'title', objBtn)
          }
        } else if (typeof objBtn==='boolean') {
          this.$set(targetBtn, 'show', objBtn)
          this.$set(targetBtn, 'title', '确 定')
        } else {
          this.$set(targetBtn, 'show', true)
          this.$set(targetBtn, 'title', '确 定')
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .el-col{
    .btn-left {
      float: left;
      margin-right: 0 !important;
    }
    .btn-center {
      text-align: center;
      margin-right: 0 !important;
    }
    .btn-right {
      float: right;
      margin-right: 0 !important;
    }
  }

</style>
