<!--
 * @Author: 肖环宇
 * @Date: 2021-07-07 11:25:10
 * @LastEditTime: 2021-07-10 10:33:44
 * @LastEditors: 肖环宇
 * @Description: 
-->
<template>
  <div class="teacourse">
    <el-row class="teacourse-north">
      <el-col :span="24">
        <el-row style="width: 100%; height: 30%">
          <!-- 菜单工具栏 -->
          <div class="north-bar">
            <div style="margin-top: 15px">
              <el-input
                placeholder="请输入课程名"
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

              <el-button type="primary" @click="initCourse()"
                >创建课程</el-button
              >
            </div>
          </div>
        </el-row>
        <el-row>
          <!-- 课程列表区 -->
          <div class="south-table">
            <el-table
              :data="myCourses"
              style="width: 100%"
              height="60vh"
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
                    >查看</el-button
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
          </div>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      title="创建课程"
      v-model="dialogVisible"
      width="80vw"
      center
      top="10vh"
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="handleClose"
    >
      课程名称
      <el-input
        v-model="courseName"
        placeholder="请输入课程名称"
        style="width: 40%"
        clearable
      ></el-input>

      <component :is="viewType" style="width: 100%; height: 100%"></component>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="undoCourse()">取 消</el-button>
          <el-button type="primary" @click="saveCourse()">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//import instance from "../../axios";
export default {
  data() {
    return {
      dialogVisible: false,
      courseName: "",
    };
  },
  computed: {
    tableHead() {
      return this.$store.state.cs.tableHead;
    },
    myCourses() {
      if (this.$store.state.userType === "teacher") {
        return this.$store.state.cs.myCourses;
      } else {
        return this.$store.state.cs.courseList;
      }
    },
  },
  methods: {
   
    handleEdit(index, row) {
      this.$store.commit("setTempTopic");
      this.$store.commit("setEditNew", false);

      for (const key in this.qsBank) {
        if (this.qsBank[key].id === row.id) {
          this.$store.commit("setQsOrder", parseInt(key));
          this.viewType = row.type;
          console.log("编辑", row.type, row.id);
          break;
        }
      }
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log("delete", index, row);
      for (const key in this.qsBank) {
        if (this.qsBank[key].id === row.id) {
          this.$store.commit("delBankTopic", parseInt(key));
          console.log("删除", row.type, parseInt(key));
        }
      }
    },
    //点击创建课程
    initCourse() {
      this.$store.commit("setEditNew", true);
      console.log("创建新题目", this.editNew);
      this.dialogVisible = true;
    },

    //保存课程修改
    saveCourse() {
      this.dialogVisible = false;
      this.$store.dispatch("saveCourse", this.courseName);
    },
    //取消课程修改
    undoCourse() {
      this.dialogVisible = false;
    },
  },
  created() {
    if (this.$store.state.userType === "teacher") {
      this.$store.dispatch("getTeaCourse");
    } else {
      this.$store.dispatch("getCourses");
    }
  },
};
</script>

<style scoped>
.el-input-group__prepend {
  width: 30%;
}
.teacourse {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 3px solid rgb(7, 115, 216);
}
.teacourse-north {
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
.teacourse-south {
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