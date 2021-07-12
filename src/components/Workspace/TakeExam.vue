<!--
 * @Author: 肖环宇
 * @Date: 2021-07-03 17:26:30
 * @LastEditTime: 2021-07-12 19:35:13
 * @LastEditors: 肖环宇
 * @Description: 
-->
<template>
  <div class="exam-table">
    <el-table
      :data="myExams"
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
          <el-button size="mini" type="danger" @click="takeExam(scope.row)"
            >开始考试</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    tableHead() {
      return this.$store.state.ex.tableHead;
    },
    myExams() {
      return this.$store.state.ex.myExams;
    },
  },
  methods: {
    takeExam(row) {
      for (const key in this.myExams) {
        if (this.myExams[key].paper.paperNo === row.paper.paperNo) {
          this.$store.commit("setExOrder", parseInt(key));
        }
      }
      let test = this.$router.resolve({ name: "Test" });
      localStorage.setItem('the-test',row.paper.paperInfo);
      window.open(test.href, "_blank");
    },
  },
  created() {
    this.$store.dispatch("getExams");
  },
};
</script>

<style scoped>
.exam-table {
  width: 100%;
  height: 100;
}
</style>