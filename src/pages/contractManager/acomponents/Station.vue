<template>
  <div>
    <el-form :model="form" ref="formRef" :label-width="labelWidth">
      <template v-if="direction === 'col'">
        <el-row>
          <el-col :span="12">
            <template v-if="showOrganize">
              <el-form-item :label="labelProp1.label" :prop="labelProp1.prop">
                <el-cascader
                  v-model="form[labelProp1.prop]"
                  :options="allOrganize"
                  :props="{ checkStrictly: true }"
                  clearable
                  @visible-change="handleOrganize"
                  :show-all-levels="false"
                >
                </el-cascader>
              </el-form-item>
            </template>
          </el-col>
          <el-col :span="12">
            <template v-if="showPosition">
              <el-form-item :label="labelProp2.label" :prop="labelProp2.prop">
                <el-select
                  v-model="form[labelProp2.prop]"
                  placeholder="请选择"
                  value=""
                >
                  <el-option
                    v-for="item in allPosition"
                    :key="item.keyid"
                    :label="item.posName"
                    :value="item.keyid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
      </template>
      <template v-if="direction === 'row'">
        <el-row>
          <template v-if="showOrganize">
            <el-form-item :label="labelProp1.label" :prop="labelProp1.prop">
              <el-cascader
                v-model="form[labelProp1.prop]"
                :options="allOrganize"
                :props="{ checkStrictly: true }"
                clearable
                @visible-change="handleOrganize"
                :show-all-levels="false"
              >
              </el-cascader>
            </el-form-item>
          </template>
        </el-row>
        <el-row>
          <template v-if="showPosition">
            <el-form-item :label="labelProp2.label" :prop="labelProp2.prop">
              <el-select
                v-model="form[labelProp2.prop]"
                placeholder="请选择"
                value=""
              >
                <el-option
                  v-for="item in allPosition"
                  :key="item.keyid"
                  :label="item.posName"
                  :value="item.keyid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-row>
      </template>
    </el-form>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  props: {
    model: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: "row"
    },
    showOrganize: {
      type: Boolean,
      default: true
    },
    showPosition: {
      type: Boolean,
      default: true
    },
    labelProp1: {
      type: Object,
      default: () => {
        return {
          label: "岗位组织",
          prop: "organize"
        };
      }
    },
    labelProp2: {
      type: Object,
      default: () => {
        return {
          label: "岗位名称",
          prop: "position"
        };
      }
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    options: {
      type: Object,
      default: () => {
        return {
          organize: [],
          position: []
        };
      }
    }
  },
  model: {
    prop: "model",
    event: "getData"
  },
  watch: {
    options() {
      this.allOrganize = this.changeArray(this.options.organize);
      this.allPosition = this.changeArray(this.options.position);
    },
    showCol() {
      if (this.showCol) {
        this.showRow = false;
      }
    },
    showRow() {
      if (this.showRow) {
        this.showCol = false;
      }
    },
    model() {
      this.form = this.model;
    },
    "form.organize": function(val) {
      if (val === "" || val === undefined || val.length === 0) {
        this.form.position = "";
      }
    }
  },
  //数据节点
  data() {
    return {
      form: {},
      returnValue: this.model,
      allOrganize: [],
      allPosition: []
    };
  },
  //生命周期函数节点
  created() {
    this.allOrganize = this.changeArray(this.options.organize);
    this.$set(this.form, this.labelProp1.prop);
    this.$set(this.form, this.labelProp2.prop);
  },
  //自定义函数节点
  methods: {
    changeArray(array) {
      let array1 = [];
      if (array instanceof Array) {
        array.forEach(val => {
          array1.push({
            value: val.id,
            label: val.label,
            children: this.changeArray(val.children)
          });
        });
      }
      if (array1.length > 0) {
        return array1;
      }
    },
    changeStructure(array, parentId) {
      let objArray = [];
      if (array instanceof Array) {
        array.forEach(val => {
          if (val.parentId === parentId) {
            objArray.push({
              value: val.keyid,
              label: val.orgName,
              children: this.changeStructure(array, val.keyid)
            });
          }
        });
      }
      if (objArray.length > 0) {
        return objArray;
      }
    },
    getData() {
      this.returnValue = this.$myfunction.copyData(this.form);
      this.$emit("getData", this.returnValue);
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    handleOrganize(value) {
      if (!value && this.form.organize instanceof Array) {
        if (this.form.organize.length > 0) {
          const _this = this;
          this.allPosition = [];
          this.form.position = "";
          this.form.organize = this.$myfunction.copyData(
            this.form.organize[this.form.organize.length - 1]
          );
          if (
            this.options.position !== "" &&
            this.options.position !== undefined
          ) {
            this.options.position.forEach(ref => {
              if (ref.orgId === _this.form.organize) {
                _this.allPosition.push(ref);
              }
            });
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
