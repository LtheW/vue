<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待维修" name="first"
        ><el-table :data="tableData" style="width: 100%" max-height="100%">
          <el-table-column
            fixed
            prop="workorderNumber"
            label="工单号"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="workorderState" label="工单状态" width="130">
          </el-table-column>
          <el-table-column
            prop="contactInformation"
            label="联系方式"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="address" label="地址" width="150">
          </el-table-column>
          <el-table-column prop="workorderContent" label="内容描述" width="250">
          </el-table-column>
          <el-table-column prop="initiationTime" label="申请时间" width="150">
          </el-table-column>

          <el-table-column prop="updateTime" label="上传时间" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="Booking(scope.row)"
                type="primary"
                size="small"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table></el-tab-pane
      >
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  methods: {
    Booking(row) {
      console.log(row.workorderNumber);
      this.$router.push({
        name: "submit",
        params: { workorderNumber: row.workorderNumber },
      });
    },
     handleClick(tab, event) {
        console.log(tab.data);
      }
  },
  data() {
    return {
      tableData: [],
      state: ["待维修", "维修中", "维修完成"],
      activeName:"first"
    };
  },
  created() {
    this.$http({
      url: "/api/administer/orderlist",
      method: "get",
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }).then((res) => {
      console.log("数据接收");
      this.tableData = res.data.data;
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].workorderState = this.state[i];
      }
      console.log(res);
    });
  },
  
};
</script>

