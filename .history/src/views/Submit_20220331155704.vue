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
          <el-divider></el-divider>

          <h5 class="title">维修满意度：</h5>
          <el-rate
            v-model="form.maintenanceSatisfaction"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
          <div class="p">
            <h5 class="title">学生评价：</h5>
            <p>{{ form.evaluation }}</p>
          </div>
        </el-card>
        <div class="p">
          <el-card>
            <el-select v-model="value" placeholder="请选择维修人员">
              <el-option
                v-for="item in options"
                :key="item.jobNumber"
                :label="item.name"
                :value="item.jobNumber"
              >
              </el-option>
            </el-select>
            <div class="p">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
            </div>
          </el-card>
        </div>
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
      srcList: [],
      options: [],
      value: "",
      textarea:""
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
        var jsonstr = JSON.parse(res.data.data[0].pictureAddress);
        var arr = this.srcList;
        for (var i = 0; i < 3; i++) {
          if (jsonstr[i] == null) {
            break;
          }
          arr.push(jsonstr[i]);
        }
        this.srcList = arr;
      });

      this.$http({
        url: "/api/administer/maintainerlist",
        method: "get",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then((res) => {
        this.options = res.data.data;
        console.log(this.options);
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