<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="工号" style="width: 50%">
      <el-input v-model="form.passportnumber"></el-input>
    </el-form-item>
    <el-form-item label="姓名" style="width: 50%">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" style="width: 50%">
      <el-input v-model="form.sex"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" style="width: 50%">
      <el-input v-model="form.telephone"></el-input>
    </el-form-item>
    <el-form-item label="密码" style="width: 50%">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
        telephone: "",
        passportnumber: "",
        password: "",
      },
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$http({
        url: "/api/administer/addmaintainer",
        method: "post",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        params: {
          job_number: this.form.passportnumber,
          name: this.form.name,
          passport: this.form.password,
          sex: this.form.sex,
          contact_information: this.form.telephone,
        }, //传值 如：params:{id:1,name:"gw"}
      }).then((res) => {
        console.log("数据接收");
        console.log(res);
         this.$router.go(-1);
      });
    },
  },
};
</script>