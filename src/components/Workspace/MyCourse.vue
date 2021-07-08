<!--
 * @Author: 肖环宇
 * @Date: 2021-07-05 09:27:09
 * @LastEditTime: 2021-07-06 19:43:22
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="mycourse">
    <el-row class="mycourse-north">
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
              <el-option label="课程名" value="1"></el-option>
              <el-option label="老师" value="2"></el-option>
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
    <el-row class="mycourse-south">
      <!-- 显示列表 -->
      <el-col :span="20">
        <div class="south-table">
          <el-table
            :data="paperList"
            style="width: 100%"
            :default-sort="{ prop: 'name', order: 'descending' }"
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
                <el-button size="mini" @click="exportPaper(scope.row)"
                  >导出</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="试卷编辑"
      v-model="dialogVisible"
      width="80vw"
      height="80vh"
      center
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="handleClose"
    >
      <ExamPaper></ExamPaper>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePaper()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchType: "课程名",
    };
  },
  computed: {
    tableHead() {
      return this.$store.state.cs.tableHead;
    },
    courseList() {
      return this.$store.state.cs.courseList;
    },
  },
};
</script>

<style scoped>
.el-input-group__prepend {
  width: 30%;
}
.mycourse {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.mycourse-north {
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
.mycourse-south {
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