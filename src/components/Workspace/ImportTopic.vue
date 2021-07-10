<!--
 * @Author: 肖环宇
 * @Date: 2021-07-04 10:26:10
 * @LastEditTime: 2021-07-09 21:04:07
 * @LastEditors: 肖环宇
 * @Description: 
-->


<template>
  <el-dialog
    title="导入题目"
    v-model="dialogVisible"
    width="80vw"
    center
    top="10vh"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-table
      :data="qsBank"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'name', order: 'descending' }"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        v-for="(head, index) in tableHead"
        :key="index"
        :prop="head.prop"
        :label="head.label"
        sortable
      >
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

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveImport()">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      selectedTopics: [],
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
    totalCount() {
      return this.$store.state.qs.totalCount;
    },
  },
  methods: {
    saveImport() {
      this.dialogVisible = false;
      this.$store.commit("importTopics", this.selectedTopics);
    },
    handleSelectionChange(val) {
      this.selectedTopics = val;
      console.log("导入的题目", this.selectedTopics);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.$store.dispatch("getPageQs", {
        index: this.currentPage,
        size: this.pageSize,
      });
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$store.dispatch("getPageQs", {
        index: this.currentPage,
        size: this.pageSize,
      });
    },
  },
  created() {
    //从服务器分页获取题目,默认为第一页
    this.currentPage = 1;
    this.$store.dispatch("getPageQs", {
      index: this.currentPage,
      size: this.pageSize,
    });
  },
};
</script>

<style>
</style>