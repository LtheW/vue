<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="联系方式" style="width: 50%">
      <el-input v-model="form.telephone"></el-input>
    </el-form-item>
    <el-form-item label="地址" style="width: 50%">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="描述" style="width: 50%">
      <el-input v-model="form.description"></el-input>
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
      options: [
        {
          value: "1",
          label: "头等舱",
        },
        {
          value: "2",
          label: "商务舱",
        },
        {
          value: "3",
          label: "经济舱",
        },
      ],
      options1: [
        {
          value: "01",
          label: "一排",
        },
        {
          value: "02",
          label: "二排",
        },
        {
          value: "03",
          label: "三排",
        },
      ],
      options2: [
        {
          value: "01",
          label: "一号", 
        },
        {
          value: "02",
          label: "二号",
        },
        {
          value: "03",
          label: "三号",
        },
      ],
      form: {
        name: "",
        description: "",
        telephone: "",
        passportnumber: "",
        address:"",
        password:""
      },
      flight_ID: "",
      trip_ID: "",
    };
  },
  created() {
    this.flight_ID = this.$route.params.flight_ID;
    this.trip_ID = this.$route.params.trip_ID;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
    }
  },
};
</script>