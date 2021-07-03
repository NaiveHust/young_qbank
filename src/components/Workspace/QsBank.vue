<template>
  <div class="qsbank">
    <el-row class="qsbank-north">
      <!-- 菜单工具栏 -->
      <el-col :span="16">
        <div class="north-bar">
          <div>
            题型
            <el-select v-model="viewType" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

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
      </el-col>
      <!-- 图表区 -->
      <el-col :span="8">
        <div class="north-chart"></div>
      </el-col>
    </el-row>
    <el-row class="qsbank-south">
      <!-- 显示列表 -->
      <el-col :span="12">
        <div class="south-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column 
            v-for="(head,index) in tableHead"
            :key="index"
            :prop ="head.name" :label="head.label" sortable>
            </el-table-column>
          
          </el-table>
        </div>
      </el-col>

      <!-- 题目显示区 -->
      <el-col :span="12">
        <div class="south-view">
          <component
            :is="viewType"
            style="width: 100%; height: 100%"
          ></component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Single from "../topic/Single";
import Multiple from "../topic/Multiple";
import Answer from "../topic/Answer";
import Fill from "../topic/Fill";
import Truefalse from "../topic/TrueFalse";
export default {
  components: {
    Single,
    Multiple,
    Answer,
    Fill,
    Truefalse,
  },
  data() {
    return {
      options: [
        {
          value: "Single",
          label: "单选题",
        },
        {
          value: "Multiple",
          label: "多选题",
        },
        {
          value: "Truefalse",
          label: "判断题",
        },
        {
          value: "Fill",
          label: "填空题",
        },
        {
          value: "Answer",
          label: "简答题",
        },
      ],
      tableHead: [
        {
          prop: "name",
          label: "题目简称",
        },
        {
          prop: "course",
          label: "所属课程",
        },
        {
          prop: "type",
          label: "题型",
        },
        {
          prop: "level",
          label: "题目难度",
        },
      ],
      viewType: "",
      searchType: "",
    };
  },
  created() {
    this.$store.commit("setInPaper", false);
  },
};
</script>

<style scoped>
.el-input-group__prepend {
  width: 30%;
}
.qsbank {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.qsbank-north {
  height: 30%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.north-bar {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.north-chart {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.qsbank-south {
  height: 70%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.south-table {
  height: 100%;
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
</style>