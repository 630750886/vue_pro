<template>
  <div>
    <el-form :model="form" ref="expiryDateRef">
      <el-form-item prop="expiryDate">
        <el-date-picker
          v-model="form.expiryDate"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="submitData"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    startDome: ,
    endDome: 
  },
  watch: {
    startDome() {
      this.form.expiryDate.splice(0, 1, this.startDome);
    },
    endDome() {
      this.form.expiryDate.splice(1, 1, this.endDome);
    }
  },
  //数据节点
  data() {
    return {
      form: {
        expiryDate: [this.startDome, this.endDome]
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    submitData() {
      this.$emit("getTime", this.form.expiryDate[0], this.form.expiryDate[1]);
    },
    resetTime() {
      this.$refs.expiryDateRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped></style>
