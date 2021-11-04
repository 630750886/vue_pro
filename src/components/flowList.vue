<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> </span>
      </div>
      <div class="logArea el-scrollbar">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="执行环节">
            <el-checkbox-group v-model="form.type" @change="bindcheck">
              <ul>
                <template v-for="(item, index) in flowData">
                  <li :key="index">
                    <el-checkbox :label="item" :key="index">{{
                      item.NAMES
                    }}</el-checkbox>
                  </li>
                </template>
              </ul>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="意见">
            <el-input type="textarea" v-model="form.desc" :rows="1"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select
              v-model="form.region"
              placeholder="请选择活动区域"
              ref="test"
            >
              <template v-for="(item, index) in mydatas">
                <el-option
                  :label="item.text"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">执行</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "flowList",
  props: {
    flowData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      mydatas: []
    };
  },
  // watch:{
  //   "form.type":function(newvalue,oldvalue){
  //     console.log(newvalue);
  //      console.log('----------------------');
  //     console.log(oldvalue);
  //   }
  // },
  methods: {
    bindcheck(value) {
      this.form.type = [];
      if (value.length == 1) {
        this.form.type.push(value[0]);
      } else {
        this.form.type.push(value[1]);
      }
      this.mydatas = JSON.parse(this.form.type[0].PERSON);
      this.form.region = "";

      //this.$refs["form"].resetFields();
      //this.$refs["test"].value="";
      //this.$refs["form"].resetFields();
      // console.log(this.$refs);
      // console.log(eval('('+this.form.type[0]+')'));
    },
    createInstance() {
      let mydata = {
        vid: "48B2C644526F4539A1693ADACDF147B6",
        exeman: "chengguanghe",
        vars: '{person:"chengguanghe",gcbID:"53",scbID:"55"}'
      };
      let myps = { InstanceID: "1049", exeman: "shiya" };
      $.ajax({
        url: "/capi/doget/getExecute",
        method: "POST",
        type: "json",
        data: myps,
        success: function(data) {
          let myb = JSON.parse(data);
          if (myb.sucess) {
            this.mydatas = myb.msg;
            console.log(this.mydatas);
          }
        }
      });
    },
    getData() {
      console.log(this.form);
    },
    execute() {}
  }
};
</script>
<style lang="less" scoped>
.logContainer {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height: 370px;
  max-height: 370px;
  overflow: hidden;
  border-radius: 6px;
  .logArea {
    overflow: auto;
    height: 100%;
  }
  .item {
    .title {
      font-size: 13px;
    }
    .time {
      color: #87de75;
    }
    .logContent {
      .logUl {
        padding-left: 30px;
        li {
          font-size: 12px;
          list-style: disc;
          line-height: 20px;
        }
      }
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
