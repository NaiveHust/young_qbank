<!--
 * @Author: 肖环宇
 * @Date: 2021-07-03 16:56:03
 * @LastEditTime: 2021-07-12 14:24:30
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="ppbank">
    <el-row class="ppbank-north">
      <!-- 菜单工具栏 -->
      <el-col :span="16">
        <div class="north-bar">
          <div style="margin-top: 15px">
            <el-select
              v-model="searchType"
              placeholder="搜索类型"
              clearable
              style="width: 20%"
            >
              <el-option label="题目名称" value="1"></el-option>
              <el-option label="课程" value="2"></el-option>
              <el-option label="创建人" value="3"></el-option>
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
            :data="paperList"
            style="width: 100%"
            height="50vh"
            :default-sort="{ prop: 'name', order: 'descending' }"
          >
            <el-table-column
              v-for="(head, index) in tableHead"
              :key="index"
              :prop="head.prop"
              :label="head.label"
              sortable
            >
              <template #header v-if="head.chart">
                <el-button plain @click="showChart(head.prop)">{{
                  head.label
                }}</el-button>
              </template>
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
                 <el-button 
                  v-if="$store.state.userType==='teacher'&&scope.row.type==='no'"
                  size="mini" @click="pushPaper(scope.row)"
                  >发布</el-button>
                  
                   <el-button 
                  v-if="$store.state.userType==='teacher'&&scope.row.type==='yes'"
                  size="mini" 
                  disabled
                  >已发布</el-button>
                  
                <el-button size="mini" @click="exportPaper(scope.row)"
                  >导出</el-button>
                 
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
        <div id="north"></div>

        <div id="south"></div>
      </el-col>
    </el-row>

    <el-dialog
      title="试卷编辑"
      v-model="dialogVisible"
      width="80vw"
      height="80vh"
      center
      :close-on-click-modal="false"
      :show-close="true"
      :before-close="handleClose"
    >
      <ExamPaper> </ExamPaper>
    </el-dialog>
  </div>
</template>

<script>
import { jsonToPaper } from "../../office";
import ExamPaper from "./ExamPaper";
export default {
  components: {
    ExamPaper,
  },
  data() {
    return {
      viewType: "",
      dialogVisible: false,
      searchType: "",
      searchVal: "",
      currentPage: 1,
      pageSize: 5,
      pieChart:null,
      barChart:null,
    };
  },
  computed: {
    paperList() {
      return this.$store.state.paper.paperList;
    },
    tableHead() {
      return this.$store.state.paper.tableHead.filter(
        (item) => item.roles.indexOf(this.$store.state.userType) > -1
      );
    },
    totalCount() {
      return this.$store.state.paper.totalCount;
    },
     chartData(){
      return this.$store.state.paper.chartData;
    },
  },
  methods: {
  drawPie() {
      // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.getInstanceByDom(this.pieChart);
           if(myChart){
            myChart.dispose();
          }
          myChart =null;
          if(!myChart){
          myChart =  this.$echarts.init(this.pieChart);
          }
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            /*  name: "访问来源", */
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.chartData,
          },
        ],
      });
      console.log('pieChart',myChart);
    },
    drawBar() {
         
          let myChart = this.$echarts.getInstanceByDom(this.barChart);
          if(myChart){
            myChart.dispose();
          }
          myChart =null;
          if(!myChart){
          myChart =  this.$echarts.init(this.barChart);
          }
      myChart.setOption({
        xAxis: {
          type: "category",

          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: this.chartData.map((item) => item.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.chartData.map((item) => item.value),
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
      console.log('barChart',myChart);
      
       
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.$store.dispatch("getPapers", {
        index: this.currentPage,
        size: this.pageSize,
      });
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$store.dispatch("getPapers", {
        index: this.currentPage,
        size: this.pageSize,
      });
    },
    exportPaper(row) {
      for (const key in this.paperList) {
        if (this.paperList[key].id === row.id) {
          jsonToPaper(this.paperList[key].json);
          break;
        }
      }
    },
    pushPaper(row){
        for (const key in this.paperList) {
        if (this.paperList[key].id === row.id) {
          row.type='yes';
          this.$store.dispatch('pushPaper',key);
          break;
        }
      }
    },
    
    handleEdit(index, row) {
      for (const key in this.paperList) {
        if (this.paperList[key].id === row.id) {
          this.$store.commit(
            "setCurrentPaper",
            JSON.parse(this.paperList[key].json)
          );
          this.$store.commit("setEditId", row.id);
          break;
        }
      }
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$store.dispatch("delPaper", row.id);
    },
    handleClose() {
      this.$store.commit("setEditId", null);
      this.$store.commit("resetPaper");
      this.dialogVisible = false;
    },
   async showChart(prop){
     if(prop ==='course'){
       
       await  this.$store.dispatch('getPNumByCs');
     }
     console.log('表数据',this.chartData);
     this.drawPie();
     this.drawBar();
     
    },
    
  },
  created() {
    this.$store.commit("setInPaper", false);
    this.$store.dispatch("getPapers", {
      index: this.currentPage,
      size: this.pageSize,
    });
    
    if (this.$store.state.userType === "teacher") {
      this.$store.dispatch("getTeaCourse");
    } else {
      this.$store.dispatch("getCourses",{index:1,size:1000});
    }
  },
  mounted(){
    this.pieChart = document.getElementById('north');
    this.barChart = document.getElementById('south');
    this.showChart('course');
  }
};
</script>

<style scoped>
.el-input-group__prepend {
  width: 30%;
}
.ppbank {
  height: 100%;
  width: 100%;
  overflow: hidden;
  
}
.ppbank-west {
  height: 100%;
  width: 100%;
  
}
.north-bar {
  height: 30%;
  width: 100%;
  
}
.north-chart {
  height: 100%;
  width: 100%;
  
}
.ppbank-south {
  height: 70vh;
  width: 100%;
  
}
.south-table {
  height: 70%;
  width: 100%;
  
}
.south-view {
  height: 100%;
  width: 100%;
  
}
.bar-search {
  width: 50%;
  
}
#north,
#south {
  height: 40vh;
  width: 100%;
  
}
</style>