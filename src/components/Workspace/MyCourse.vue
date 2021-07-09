<!--
 * @Author: 肖环宇
 * @Date: 2021-07-05 09:27:09
 * @LastEditTime: 2021-07-09 16:43:48
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="mycourse">
    <el-row class="mycourse">
      <!-- 菜单工具栏 -->
      <el-col :span="14">
        <div class="west-header">
          <span>已选课程</span>
          <el-table
            :data="myCourses"
            style="width: 100%"
            height="60vh"
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
                <el-button size="mini" type="primary">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleJoin(scope.row)"
                  >退出</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="west-course"></div>
      </el-col>
      <!-- 搜索课程区 -->
      <el-col :span="10">
        <div class="north-bar">
          <div style="margin-top: 15px">
            <el-select
              v-model="searchType"
              placeholder="搜索类型"
              clearable
              style="width: 30%"
            >
              <el-option label="课程名称" value="course"></el-option>
              <el-option label="老师名称" value="teacher"></el-option>
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
            :data="courseList"
            style="width: 100%"
            height="60vh"
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
                  v-if="notChosen(scope.row.id)"
                  size="mini"
                  type="primary"
                  @click="handleJoin(scope.row)"
                  >加入课堂</el-button
                >
                <el-button
                  v-else
                  size="mini"
                  type="success"
                  disabled
                  @click="handleJoin(scope.row)"
                  >已加入</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchType: "teacher",
    };
  },
  computed: {
    tableHead() {
      return this.$store.state.cs.tableHead;
    },
    courseList() {
      return this.$store.state.cs.courseList;
    },
    myCourses() {
      return this.$store.state.cs.myCourses;
    },
  },
  methods: {
    handleJoin(course) {
      this.$store.dispatch("joinCourse", course);
    },
    notChosen(id) {
      for (const chosen of this.myCourses) {
        if (chosen.id === id) {
          return false;
        }
      }
      return true;
    },
  },
  created() {
    this.$store.dispatch("getCourses");
    this.$store.dispatch("getChosen");
    console.log("我的课程");
  },
};
</script>

<style scoped>
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
  height: 20%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.north-chart {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.west-header {
  height: 10%;
  width: 100%;
  display: flex;
  border: 3px solid rgb(153, 12, 209);
}
.west-course {
  height: 90%;
  width: 100%;
  display: flex;
  border: 3px solid rgb(153, 12, 209);
}
.south-table {
  height: 80%;
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