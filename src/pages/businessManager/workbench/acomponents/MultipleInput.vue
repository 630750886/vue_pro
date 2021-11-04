<template>
  <div class="body">
    <div class="head-input">
      <el-input v-model="value" @change="addValue" clearable></el-input>
    </div>
    <div class="all-value">
      <template v-for="(item,index) in values">
        <p>{{index+1}}.{{item}}
          <i class="el-icon-remove-outline" @click="deleteValue(index)"></i>
          <i class="el-icon-edit" :id="'update'+index" @click="updateValue(index,item)"></i>
        </p>
      </template>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      model: '',
    },
    model: {
      prop: 'model',
      event: 'bindValue'
    },
    watch: {
      values(newValue) {
        let str = ''
        newValue.forEach((item, index) => {
          if (index === newValue.length - 1) {
            str += item
          } else {
            str += item + ','
          }
        })
        this.$emit('bidValue', str)
      },
      editClick(newValue){
        if (!newValue) {
          this.index=''
        }
      },
    },
    //数据节点
    data() {
      return {
        index: '',
        value: '',
        values: [],
        editClick:false,
        deleteClass:'',
        editClass:'el-icon-edit'
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      addValue(value) {
        if (value !== '') {
          if (this.index !== '') {
            this.values.splice(this.index, 1, value)
          } else {
            this.values.push(value)
            this.value=''
          }
        }

      },
      deleteValue(index) {
        this.deleteClick=!this.deleteClick
        this.values.splice(index, 1)
      },
      updateValue(index, value) {
        if (this.index !== index) {
          this.editClick=true
          console.log('update'+index,'update'+this.index)
          document.getElementById('update'+index).classList.add('i-true')
          if (this.index !== '') {
            document.getElementById('update'+this.index).classList.remove('i-true')
          }
        }else {
          this.editClick=false
          document.getElementById('update'+index).classList.remove('i-true')
          this.index=''
          this.value = ''
        }

        if (this.editClick) {
          this.index = index
          this.value = value
        }

      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    width: 220px;
    .all-value {
      margin-top: 5px;
      height: 150px;
      border: 1px solid #bfcbd9;
      overflow-y: auto;
      p {
        height: 35px;
        line-height: 35px;

        i {
          margin-top: 10px;
          font-size: 16px;
          margin-left: 20px;
          float: right;
        }
        i:hover {
          color: #409EFF;
        }
      }
    }
    .all-value:hover {
      border: 1px solid #409EFF;
    }
  }

  .i-true {
    color: #409EFF;
  }

</style>
