<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">查询航班</h3>

    <el-form-item label="起飞地点" label-width="80px" prop="departureposition" class="departureposition">
      <el-input
        type="input"
        v-model="form.departureposition"
        autocomplete="off"
        placeholder="请输入起飞地点"
      ></el-input>
    </el-form-item>

    <el-form-item label="抵达地点" label-width="80px" prop="arrivalposition">
      <el-input
        type="arrivalposition"
        v-model="form.arrivalposition"
        autocomplete="off"
        placeholder="请输入抵达地点"
      ></el-input>
    </el-form-item>

    <!-- <el-form-item label="日期" label-width="80px" prop="date">
    <el-date-picker
      v-model="form.date"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
     </el-form-item> -->

         <div style="display:flex;justify-content:center">
      <el-button type="primary" @click="login" class="longin_submit">查询</el-button>

         </div>

  </el-form>
</template>
<script>

export default {
  data() {
    return {
      form: {
        departureposition: "武汉",
        arrivalposition: "上海",
        //date:""
      },
      rules: {
        departureposition: [
          { required: false, message: "请输入起飞地点", trigger: "blur" },
        ],
        arrivalposition: [{ required: false, message: "请输入抵达地点", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$http({
				url: '/api/flight/selectFlight',
				method: 'get',
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
				params:{
          Trip_DeparturePosition:this.form.departureposition,
          Trip_ArrivalPosition:this.form.arrivalposition
        }//传值 如：params:{id:1,name:"gw"}
			}).then(res => {
				console.log('数据接收');
				console.log(res);
        if(res.status==200){
          this.$router.push({name:'form',params: {departureposition:this.form.departureposition,arrivalposition:this.form.arrivalposition}})
        }
			});
      // this.$http.post("api/permission/getMenu", this.form).then((res) => {
      //   res = res.data;
      //   if (res.code === 20000) {
      //     //先清除 房子重复加入
      //     this.$store.commit("clearMenu");
      //     //再加入
      //     this.$store.commit("setMenu", res.data.menu);
      //     //放入token
      //     this.$store.commit("setToken", res.data.token);
      //     //添加动态路由
      //     this.$store.commit("addMenu", this.$router);
      //     //跳转到首页
      //     this.$router.push({ name: "home" });
      //   } else {
      //     //如果失败 提示失败信息
      //     this.$message.warning(res.data.message);
      //   }
      // });
    },
  },
};
</script>

<style>
.login-container {
  border-radius: 15px; /*圆角*/
  background-clip: padding-box; /*背景被裁剪到内边距框*/
  margin: 180px auto; /*边界 距上180px 左右居中*/
  width: 550px; /*表单宽度*/
  padding: 35px 35px 15px 35px; /*填充*/
  background: #fff;
  border: 1px solid #eaeaea; /*边框*/
  box-shadow: 0 0 25px #cac6c6; /*隐形*/
}

.login_title {
  margin: 0px auto 40px auto; /*上边界0 下边边界40 左右居中*/
  text-align: center; /*上面仅是标签居中 这里是文字居中*/
  color: #505458;
}

.longin_submit {
  /*margin: 10px auto 0px auto; 上边界10 下边边界40 左右居中*/
  width:50%
}
</style>
