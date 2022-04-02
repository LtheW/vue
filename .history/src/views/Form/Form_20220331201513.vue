<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%"
          max-height="100%"
        >
          <el-table-column
            fixed
            prop="workorderNumber"
            label="工单号"
            width="100"
          >
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
          <el-table-column prop="initiationTime" label="申请时间" width="180">
          </el-table-column>

          <el-table-column prop="updateTime" label="上传时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
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
        </el-table>
        <div class="block" style="margin-top: 15px">
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待维修" name="second">
        <el-table :data="tableData1" style="width: 100%" max-height="100%">
          <el-table-column
            fixed
            prop="workorderNumber"
            label="工单号"
            width="100"
          >
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
          <el-table-column prop="initiationTime" label="申请时间" width="180">
          </el-table-column>

          <el-table-column prop="updateTime" label="上传时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button
                @click="Booking1(scope.row)"
                type="primary"
                size="small"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="已完成" name="third">
        <el-table :data="tableData2" style="width: 100%" max-height="100%">
          <el-table-column
            fixed
            prop="workorderNumber"
            label="工单号"
            width="100"
          >
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
          <el-table-column prop="initiationTime" label="申请时间" width="180">
          </el-table-column>

          <el-table-column prop="updateTime" label="上传时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button
                @click="Booking2(scope.row)"
                type="primary"
                size="small"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    Booking(row) {
      console.log(row.workorderNumber);
      this.$router.push({
        name: "submit",
        params: { workorderNumber: row.workorderNumber },
      });
    },
    Booking1(row) {
      console.log(row.workorderNumber);
      this.$router.push({
        name: "repaired",
        params: { workorderNumber: row.workorderNumber },
      });
    },
    Booking2(row) {
      console.log(row.workorderNumber);
      this.$router.push({
        name: "completed",
        params: { workorderNumber: row.workorderNumber },
      });
    },
    handleClick(tab) {
      console.log(tab._data.index);
      this.load(tab._data.index);
    },
    load(index) {
      if (index == 0) {
        this.$http({
          url: "/api/administer/orderlist",
          method: "get",
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then((res) => {
          console.log("数据接收");
          this.tableData = res.data.data;

          console.log(res);
        });
      }
      if (index == 1) {
        this.$http({
          url: "/api/administer/orderlist2",
          method: "get",
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then((res) => {
          console.log("数据接收");
          this.tableData1 = res.data.data;

          console.log(res);
        });
      }
      if (index == 2) {
        this.$http({
          url: "/api/administer/orderlist3",
          method: "get",
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then((res) => {
          console.log("数据接收");
          this.tableData2 = res.data.data;

          console.log(res);
        });
      }
    },
  },
  data() {
    return {
      totalCount: 0,
      tableData: [],
      tableData1: [],
      tableData2: [],
      state: ["待维修", "维修中", "维修完成"],
      activeName: "first",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  created() {
    this.load(0);
  },
};
</script>

