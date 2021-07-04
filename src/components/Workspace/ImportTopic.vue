<template>
  <el-dialog
    title="导入题目"
    v-model="dialogVisible"
    width="80vw"
    center
    top="10vh"
    :close-on-click-modal="false"
    :show-close="false"
    :before-close="handleClose"
  >
    <el-table
      :data="qsBank"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'name', order: 'descending' }"
    >
      <el-table-column type="selection" > </el-table-column>
      <el-table-column
        v-for="(head, index) in tableHead"
        :key="index"
        :prop="head.prop"
        :label="head.label"
        sortable
      >
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>

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
      selectedTopics:[],
    };
  },
  computed: {
    tableHead() {
      return this.$store.state.qs.tableHead;
    },
     qsBank() {
      return this.$store.state.qs.qsBank;
    },
  },
  methods: {
    saveImport() {
      this.dialogVisible = false;
      this.$store.commit("importTopics",this.selectedTopics);
    },
     handleSelectionChange(val) {
        this.selectedTopics = val;
        console.log('导入的题目',this.selectedTopics);
      },
  },
};
</script>

<style>
</style>