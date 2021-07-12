<!--
 * @Author: 肖环宇
 * @Date: 2021-07-03 17:26:30
 * @LastEditTime: 2021-07-12 16:34:04
 * @LastEditors: 肖环宇
 * @Description: 
-->
<template>
   <el-empty
  style="width:100%;height:100%"
   description="快实现了..."></el-empty>
 
    <!--  
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
        <el-button size="mini" type="primary">查看</el-button>
        <el-button size="mini" type="danger" @click="handleJoin(scope.row)"
          >退出</el-button
        >
      </template>
    </el-table-column>
  </el-table> -->

 
  
</template>

<script>
export default {
  data(){
    return{

    }
  },
 /*  computed:{
    tableHead(){
      return this.$store.state.ex.tableHead;
    },
    myExams(){
      return this.$store.state.ex.myExams;
    }
  }, */
};
</script>

<style scoped>
.exam-table{
  width: 100%;
  height: 100;
}

</style>