<!--
 * @Author: 肖环宇
 * @Date: 2021-07-03 20:41:38
 * @LastEditTime: 2021-07-10 10:31:13
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="user">
    <el-row class="user">
      <el-col :span="16">
        <!-- 菜单工具栏 -->
        <div class="north-bar">
          <div style="margin-top: 15px">
            <el-select
              v-model="searchType"
              placeholder="用户类型"
              clearable
              style="width: 20%"
            >
              <el-option label="学生" value="student" @click="switchType('student')"></el-option>
              <el-option label="老师" value="teacher" @click="switchType('teacher')"></el-option>
            </el-select>
            <el-input
              placeholder="请输入搜索内容"
              v-model="searchVal"
              class="bar-search"
            >
              <template #append>
                <el-button
                  icon="el-icon-search"
                  @click="searchTopic()"
                ></el-button>
              </template>
            </el-input>
          </div>
        </div>
          <div class="south-table">
          <el-table
            v-loading="loading"
            :data="userList"
            style="width: 100%"
            height="50vh"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              v-for="(head, index) in tableHead"
              :key="index"
              :prop="head.prop"
              :label="head.label"
              sortable
            >
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </el-col>
      <!-- 图表区 -->
      <el-col :span="8">   
        <div  id="north"></div>     
        <div  id="south"></div>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchType:'student',
       currentPage: 1,
      pageSize: 5,
    };
  },
  computed:{
      userList(){
        if(this.searchType ==='student'){       
          return this.$store.state.ad.stuList;
        }
        else{
           return this.$store.state.ad.teaList;
        }
      },
      tableHead(){
        return this.$store.state.ad.tableHead;
      },
      totalCount() {
      return this.$store.state.ad.totalCount;
    },
  },
  methods:{
    drawPie(){
       // 基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById("north"));
    // 绘制图表
    myChart.setOption({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
            ]
        }
    ]
});
  },
    drawBar(){
      var myChart = this.$echarts.init(document.getElementById("south"));
      myChart.setOption({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    }]
})
    },
    switchType(type){
      if(type ==='teacher'){
        this.$store.dispatch("getTeas", {
        index: this.currentPage,
        size: this.pageSize,
      });
      }
      else{
        this.$store.dispatch("getStus", {
        index: this.currentPage,
        size: this.pageSize,
      });
      }
    },
       //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
     this.switchType(this.searchType);
      
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.switchType(this.searchType);
      }
    },
  created(){
    this.$store.dispatch('getStus',{
      index:1,
      size:5
    });
  },
  mounted() {
   this.drawPie();
   this.drawBar();
  },
};
</script>

<style  scoped>
.user {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 3px solid rgb(7, 115, 216);
}
.user-north {
  height: 30%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.north-bar {
  height: 30%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.north-chart {
  height: 50%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.user-south {
  height: 70%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}

.south-table {
  height: 70%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.south-view {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.bar-search {
  width: 50%;
  border: 3px solid rgb(7, 115, 216);
}
#north, #south{
  height: 40vh;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
</style>
