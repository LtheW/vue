<template>
  <div class="form">
    <div>
      <el-card>
        <el-descriptions
          class="margin-top"
          title="基本信息："
          :column="3"
          :size="size"
          border
        >
          <template slot="extra">
            <el-button type="primary" size="small">操作</el-button>
          </template>
          <el-descriptions-item width="150">
            <template slot="label">
              <i class="el-icon-user"></i>
              工单编号
            </template>
            {{ form.workorderNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              学生学号
            </template>
            {{ form.fkStudentNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ form.contactInformation }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              宿舍
            </template>
            {{ form.address }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              预约上门时间
            </template>
            {{ form.fixedTime }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>

    <div class="p">
      <el-card>
        <i class="title">工单流程：</i>
        <div>
          <el-steps
            :space="600"
            :active="1"
            finish-status="success"
            align-center="true"
            style="padding-top: 40px"
          >
            <el-step title="派单中"></el-step>
            <el-step title="维修中"></el-step>
            <el-step title="维修完成"></el-step>
          </el-steps>
        </div>
      </el-card>
      <div class="p">
        <el-card>
          <h5 class="title">工单详情：</h5>
          <p>{{ form.workorderContent }}</p>
          <h5 class="title">相关图片：</h5>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
          >
          </el-image>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
     
      form: {},
      workorderNumber: "",
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
  created() {
    this.workorderNumber = this.$route.params.workorderNumber;
    this.Load();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {},
    Load() {
      this.$http({
        url: "/api/administer/getorder",
        method: "get",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        params: {
          workorder_number: this.workorderNumber,
        }, //传值 如：params:{id:1,name:"gw"}
      }).then((res) => {
        this.form = res.data.data[0];
        console.log(this.form);
        var jsonstr=JSON.parse(res.data.data[0].pictureAddress);
        this.srcList=jsonstr;
        console.log(this.srcList);
      });
    },
  },
};
</script>

<style >
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.title {
  font-size: 16px;
  font-weight: 700;
}
.p {
  padding-top: 20px;
}
.border {
  border: 1px solid grey;
}
</style>