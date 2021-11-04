<template>
  <div class="logContainer">
    <el-card class="box-card">
      <el-calendar
        v-model="value"
        id="calendar"
        class="calendarArea el-scrollbar"
      >
        <template slot="dateCell" slot-scope="{date, data }">
          <el-tooltip effect="dark" placement="bottom">
            <div class="calendar-day">
              <div
                :class="
                  things.findIndex(value => {
                    return value.date == data.day;
                  }) !== -1
                    ? 'is-selected'
                    : ''
                "
              >
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </div>
            </div>
            <div slot="content" id="mytip">
              <div
                v-if="
                  things.findIndex(value => {
                    return value.date == data.day;
                  }) !== -1
                "
              >
                {{
                  things.find(s => {
                    return s.date == data.day;
                  }).thing
                }}
                <br />
                <el-button
                  type="text"
                  @click="
                    modifyDate(
                      things.find(s => {
                        return s.date == data.day;
                      })
                    )
                  "
                  >修改信息</el-button
                >
              </div>
              <div v-else>
                <el-button type="text" @click="addDate(data)">添加</el-button>
              </div>
            </div>
          </el-tooltip>
        </template>
      </el-calendar>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="内容">
          <el-input
            v-model="form.thing"
            type="textarea"
            :rows="1"
            autocomplete="off"
          ></el-input>
          <el-input
            v-model="form.date"
            autocomplete="off"
            v-show="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setDate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "calendarList",
  props: {
    things: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      value: new Date(),
      dialogFormVisible: false,
      Types: "",
      form: {
        thing: "",
        date: ""
      }
    };
  },
  computed: {
    isok() {
      //return this.things.some(item=>{item.date=="2019-11-12"});
      return "12";
    }
  },
  methods: {
    addDate(da) {
      this.form.date = da.day;
      this.form.thing = "";
      this.dialogFormVisible = true;
      this.Types = "add";
    },
    modifyDate(da) {
      this.form.date = da.date;
      this.form.thing = da.thing;
      this.dialogFormVisible = true;
      this.Types = "modify";
    },
    setDate() {
      let self = this;
      let d = "",
        t = "";
      if (self.Types === "add") {
        d = self.form.date;
        t = self.form.thing;
        self.things.push({ date: d, thing: t });
      } else {
        self.things.splice(
          self.things.findIndex(item => item.date === self.form.date),
          1
        );
        d = self.form.date;
        t = self.form.thing;
        self.things.push({ date: d, thing: t });
      }
      //console.log(self.things);
      self.dialogFormVisible = false;
    }
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
  .calendarArea {
    overflow: auto;
    height: 100%;
  }
}
.is-selected {
  height: 90%;
  width: 98%;
  overflow: auto;
  background-color: #f8a535;
}
.calendar-day {
  text-align: center;
  color: #202535;
  height: 25px;
  font-size: 6px;
  height: 99%;
}
.un-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
  height: 60%;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}
</style>
