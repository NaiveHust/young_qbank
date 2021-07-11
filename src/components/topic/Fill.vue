<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 19:34:26
 * @LastEditTime: 2021-07-11 11:52:21
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <!-- 填空题 -->
  <div class="fill">
    <el-form
      v-if="fills"
      :model="fills"
      ref="form"
      label-width="80px"
      :inline="false"
      class="fill-form"
    >
      <el-row v-if="inPaper">
        <el-form-item :label="'第' + fills.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="fills.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <!-- 题目 -->
      <el-scrollbar class="fill-ones">
        <el-row
          v-for="(item, index) in fills.question"
          :key="index"
          class="fill-one"
        >
          <!-- head -->
          <el-input
            type="textarea"
            style="width: 30%"
            resize="none"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.head"
          >
          </el-input>
          {{ "第" + item.order + "空" }}
          <!-- tail -->
          <el-input
            type="textarea"
            resize="none"
            style="width: 30%"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.tail"
          >
          </el-input>

          <!-- answer -->
          答案
          <el-input
            type="textarea"
            resize="none"
            style="width: 30%"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.answer"
          >
          </el-input>

          <el-button
            class="el-icon-delete"
            @click.stop="delItem(item.order)"
            style="width: 10%; float: right"
          >
          </el-button>
        </el-row>
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addItem(currentOrder)"
          >添加填空</el-button
        >
      </el-form-item>
 <div style="width: 100%;display:flex;justify-content:space-between;">
       
        <el-select
          v-model="fills.level"
          placeholder="试题难度"
          style="width: 15%"
        >
          <el-option label="易" value="易"></el-option>
          <el-option label="中" value="中"></el-option>
          <el-option label="难" value="难"></el-option>
        </el-select>
        
          <el-select
          v-model="fills.course"
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
          v-model="fills.explain"
        >
        </el-input>
        
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //sContent: null,
    };
  },
  computed: {
    editNew() {
      return this.$store.state.qs.editNew;
    },
    inPaper() {
      return this.$store.state.paper.inPaper;
    },
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    fills() {
      if (this.inPaper) {
        return this.$store.state.paper.paperContent.Fill.topic[
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
  methods: {
    delItem(order) {
      this.$store.commit("delTopicItem", {
        //题型键名
        tType: "Fill",
        //题条键名
        iType: "question",
        tOrder: this.currentOrder,
        iOrder: order,
      });
    },
    addItem(order) {
      let i = !this.fills.question ? 0 : this.fills.question.length;
      this.$store.commit("addTopicItem", {
        //题型键名
        tType: "Fill",
        //题条键名
        iType: "question",
        tOrder: order,
        content: {
          order: i + 1,
          head: "",
          tail: "",
          answer: "",
        },
      });
    },
  },
  created() {
    console.log("Fill created!");
  },
};
</script>

<style>
.fill {
  width: 100%;
  height: 100%;
  
}
.fill-form {
  width: 100%;
  height: 100%;
  
}
.fill-one {
  width: 95%;
  height: 20%;
  margin-bottom: 2vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  
}
.fill-info {
  width: 100%;
  height: 20vh;
  
}
.fill-ones {
  width: 100%;
  height: 50vh;
  
}
</style>