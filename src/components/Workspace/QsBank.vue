<!--
 * @Author: 肖环宇
 * @Date: 2021-07-03 09:00:43
 * @LastEditTime: 2021-07-08 15:24:44
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="qsbank">
    <el-row class="qsbank-north">
      <el-col :span="24">
        <el-row style="width: 100%; height: 30%">
          <!-- 菜单工具栏 -->
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
                style="width: 10%"
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

              <el-button type="primary" @click="initTopic()"
                >创建题目</el-button
              >
            </div>
          </div>
        </el-row>
        <el-row>
          <!-- 题目列表区 -->
          <div class="south-table">
            <!-- :data="
                qsBank.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              " -->
            <el-table
              v-loading="loading"
              :data="qsBank"
              style="width: 100%"
              height="40vh"
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
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      title="题目编辑"
      v-model="dialogVisible"
      width="80vw"
      center
      top="10vh"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-select v-if="editNew" v-model="viewType" placeholder="题型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click="createTopic(item.value)"
        >
        </el-option>
      </el-select>

      <component :is="viewType" style="width: 100%; height: 100%"></component>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="undoTopic()">取 消</el-button>
          <el-button type="primary" @click="saveTopic()">保存</el-button>
        </span>
      </template>
    </el-dialog>
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
      dialogVisible: false,
      viewType: "Single",
      searchType: "",
      searchVal: "",
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    tableHead() {
      return this.$store.state.qs.tableHead;
    },
    qsBank() {
      return this.$store.state.qs.qsBank;
    },
    editNew() {
      return this.$store.state.qs.editNew;
    },
    totalCount() {
      return this.$store.state.qs.totalCount;
    },
    loading() {
      return this.$store.state.qs.loading;
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
      this.$store.dispatch("delBankTopic", {
        id: row.id,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
    },
    //点击创建题目
    initTopic() {
      this.$store.commit("setEditNew", true);
      console.log("创建新题目", this.editNew);
      this.$store.commit("createNewTopic", this.viewType);
      this.dialogVisible = true;
    },
    //切换题目类型
    createTopic(type) {
      this.$store.commit("createNewTopic", type);
    },
    //保存题目修改
    saveTopic() {
      this.dialogVisible = false;
      //this.$store.commit("saveTopic", this.viewType);
      this.$store.dispatch("saveTopic", {
        type: this.viewType,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      this.$store.commit("setEditNew", false);
    },
    //取消题目,修改
    undoTopic() {
      this.dialogVisible = false;
      this.$store.commit("undoTopic");
      this.$store.commit("setEditNew", false);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.$store.commit("getPageQs", {
        index: this.currentPage,
        size: this.pageSize,
      });
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$store.commit("getPageQs", {
        index: this.currentPage,
        size: this.pageSize,
      });
    },
  },

  created() {
    //题目编辑模式从试卷切换到题库
    this.$store.commit("setInPaper", false);
    //从服务器分页获取题目,默认为第一页
    this.currentPage = 1;
    this.$store.commit("getPageQs", {
      index: this.currentPage,
      size: this.pageSize,
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