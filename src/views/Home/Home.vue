<template>
    
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="姓名" style="width:50%">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="性别" style="width:50%">
    <el-input v-model="form.sex"></el-input>
  </el-form-item>
  <el-form-item label="手机号" style="width:50%">
    <el-input v-model="form.telephone"></el-input>
  </el-form-item>
  <el-form-item label="身份证号" style="width:50%">
    <el-input v-model="form.passportnumber"></el-input>
  </el-form-item>
  <el-form-item label="座位">
     <el-col :span="3">
     <el-select v-model="form.seatType" placeholder="请选择类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-col>
    <el-col :span="3">
    <el-select v-model="form.row" placeholder="请选择排号">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-col>
    <el-col :span="3">
    <el-select v-model="form.number" placeholder="请选择座位号">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-col>
  </el-form-item>
  <el-form-item label="机票日期">
    <el-col :span="8">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        options:[{
          value: '1',
          label: '头等舱'
        }, {
          value: '2',
          label: '商务舱'
        }, {
          value: '3',
          label: '经济舱'
        }],
        options1:[{
          value: '01',
          label: '一排'
        }, {
          value: '02',
          label: '二排'
        }, {
          value: '03',
          label: '三排'
        }],
        options2:[{
          value: '01',
          label: '一号'
        }, {
          value: '02',
          label: '二号'
        }, {
          value: '03',
          label: '三号'
        }],
        form: {
          name:'',
          sex:'',
          telephone:'',
          passportnumber:'',
          seatType:'',
          row:'',
          number:'' 
        }
      }
    },
    methods: {
      onSubmit() {
        this.$http({
				url: '/api/passenger/addData',
				method: 'get',
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
				params:{
          Passenger_ID:this.form.passportnumber,
          Passenger_Name:this.form.name,
          Passenger_Sex:this.form.sex,
          Passenger_Telephone:this.form.telephone,
          Passenger_PassportNumber:this.form.passportnumber
        }//传值 如：params:{id:1,name:"gw"}
			}).then(res => {
				console.log('数据接收');
				console.log(res);
        
			});
      this.$http({
				url: '/api/seat/getSeat',
				method: 'get',
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
				params:{
          Seat_ID:this.form.seatType+this.form.row+this.form.number
        }//传值 如：params:{id:1,name:"gw"}
			}).then(res => {
				console.log('数据接收');
				console.log(res);
        if(res.data[0].seat_State==0){
          this.$http.get("/api/seat/update",
           { 
             params: { 
             Seat_ID:res.data[0].seat_ID,
             Seat_State:1
            } 
          }).then(res1 => {
				console.log('数据接收');
				console.log(res1);
      //    this.$http({
			// 	url: '/api/ticket/addData',
			// 	method: 'get',
			// 	headers: { 'X-Requested-With': 'XMLHttpRequest' },
			// 	params:{
      //    Ticket_ID:"",
      //    Passenger_ID:this.form.passportnumber,
      //    Flight_ID:
      //   }//传值 如：params:{id:1,name:"gw"}
			// }).then(res2 => {
			// 	console.log('数据接收');
			// 	console.log(res2);
        
			// });
			});
        }
        else{
         alert("座位被选，请选择别的座位");

        }
			});
      }
    }
  }
</script>