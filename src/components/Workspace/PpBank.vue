<!--
 * @Author: 肖环宇
 * @Date: 2021-07-03 16:56:03
 * @LastEditTime: 2021-07-09 20:22:35
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="qsbank">
    <el-row class="qsbank-north">
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
      </el-col>
      <!-- 图表区 -->
      <el-col :span="8">
        <div class="north-chart"></div>
      </el-col>
    </el-row>

    <el-row class="qsbank-south">
      <!-- 显示列表 -->
      <el-col :span="20">
        <div class="south-table">
          <el-table
            :data="paperList"
            style="width: 100%; height: 60vh"
            max-height="400"
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
      tableHead: [
        {
          prop: "name",
          label: "试卷名称",
        },
        {
          prop: "course",
          label: "所属课程",
        },
      ],
      viewType: "",
      dialogVisible: false,
      searchType: "",
      searchVal: "",
    };
  },
  computed: {
    paperList() {
      return this.$store.state.paper.paperList;
    },
  },
  methods: {
    exportPaper(row) {
      for (const key in this.paperList) {
        if (this.paperList[key].id === row.id) {
          jsonToPaper(this.paperList[key].json);
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
  },
  created() {
    this.$store.commit("setInPaper", false);
    this.$store.dispatch("getPapers", {
      index: 1,
      size: 1000,
    });
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
  overflow: hidden;
  border: 3px solid rgb(7, 115, 216);
}
.qsbank-north {
  height: 30vh;
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
  height: 70vh;
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