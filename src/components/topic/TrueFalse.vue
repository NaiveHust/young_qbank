<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 19:33:55
 * @LastEditTime: 2021-07-10 09:59:45
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <!-- 判断题 -->
  <div class="tf">
    <el-form
      v-if="truefalse"
      :model="truefalse"
      ref="form"
      label-width="80px"
      :inline="false"
    >
      <el-row v-if="inPaper">
        <el-form-item :label="'第' + truefalse.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="truefalse.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题目">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目"
          v-model="truefalse.question"
        >
        </el-input>

        <div>
          答案
          <el-switch
            style="display: block"
            v-model="truefalse.answer"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-icon-class="el-icon-check"
            inactive-icon-class="el-icon-close"
          >
          </el-switch>
        </div>
      </el-form-item>

       <div style="width: 100%;display:flex;justify-content:space-between;">
       
        <el-select
          v-model="truefalse.level"
          placeholder="试题难度"
          style="width: 15%"
        >
          <el-option label="易" value="易"></el-option>
          <el-option label="中" value="中"></el-option>
          <el-option label="难" value="难"></el-option>
        </el-select>
        
          <el-select
          v-model="truefalse.course"
          placeholder="所属课程"
          style="width: 15%"
        >
         <el-option 
          v-for="(course,index) in courses"
          :key="index"
          :label="course.cName" :value="course.cName"
          ></el-option>
        </el-select>
        

        <el-input
          type="textarea"
          style="width: 60%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目解析"
          v-model="truefalse.explain"
        >
        </el-input>
        
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    editNew() {
      return this.$store.state.qs.editNew;
    },
    inPaper() {
      return this.$store.state.paper.inPaper;
    },
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    truefalse() {
      if (this.inPaper) {
        return this.$store.state.paper.paperContent.Truefalse.topic[
          this.currentOrder - 1
        ];
      } else if (this.editNew) {
        return this.$store.state.qs.newTopic;
      } else {
        return this.$store.state.qs.qsBank[this.qsOrder].content;
      }
    },
     courses(){
      return this.$store.state.cs.myCourses;
    },
  },
  methods: {},
  created() {
    console.log("TF created!");
  },
};
</script>

<style>
.tf {
  width: 100%;
  height: 100%;
  
}
</style>