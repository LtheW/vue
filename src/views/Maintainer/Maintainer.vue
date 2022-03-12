
<template>
  <div>
    <el-button @click="add()" type="success" size="medium">添加维修人员</el-button>
    <el-table :data="tableData" style="width: 100%" max-height="100%">
      <el-table-column fixed prop="jobNumber" label="工号" width="300">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="260"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="260"> </el-table-column>
      <el-table-column prop="contactInformation" label="联系方式" width="300">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <el-button @click="Booking(scope.row)" type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$router.push({
        name: "add"
      });
    },
    Booking(row) {
    this.$http({
        url: "/api/administer/deletemaintainer",
        method: "delete",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        params: {
          administer_number: this.$store.state.administer_number,
          maintainer_number: row.jobNumber,
          passport: this.$store.state.password,
        }, //传值 如：params:{id:1,name:"gw"}
      }).then((res) => {
        console.log("删除成功");
        console.log(res);
        this.$router.go(0);
      });
    },
  },
  data() {
    return {
      tableData: [],
      state: ["待维修", "维修中", "维修完成"],
    };
  },
  created() {
    this.$http({
      url: "/api/administer/maintainerlist",
      method: "get",
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }).then((res) => {
      console.log("数据接收");
      this.tableData = res.data.data;

      console.log(res);
    });
  },
};
</script>

