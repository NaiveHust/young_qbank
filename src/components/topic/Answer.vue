<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 19:35:17
 * @LastEditTime: 2021-07-07 08:51:35
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <!-- 单选题 -->
  <div class="answer">
    <el-form
      v-if="answers"
      :model="answers"
      ref="form"
      label-width="80px"
      :inline="false"
    >
      <el-row v-if="inPaper">
        <el-form-item :label="'第' + answers.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="answers.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="answers.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="answer-ones">
        <div v-for="item in answers.subQ" :key="item.order" class="answer-one">
          第{{ item.order }}问
          <el-input
            v-model="item.content"
            style="width: 40vw"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          >
          </el-input>
          答案
          <el-input
            v-model="item.answer"
            style="width: 40vw"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          >
          </el-input>

          <el-button
            class="el-icon-delete"
            @click.stop="delItem(item.order)"
            style="float: right"
          >
          </el-button>
        </div>
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addItem()">添加小问</el-button>
        <!-- <el-button type="primary" @click="finishTopic()">完成编辑</el-button> -->
      </el-form-item>

      <div style="width: 100%">
        <span>难度</span>
        <el-select
          v-model="answers.level"
          placeholder="请选择"
          style="width: 10%"
        >
          <el-option label="易" value="易"></el-option>
          <el-option label="中" value="中"></el-option>
          <el-option label="难" value="难"></el-option>
        </el-select>

        <span style="margin-left: 5%">答案解析</span>
        <el-input
          type="textarea"
          style="width: 60%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目解析"
          v-model="answers.explain"
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
    answers() {
      if (this.inPaper) {
        return this.$store.state.paper.paperContent.Answer.topic[
          this.currentOrder - 1
        ];
      } else if (this.editNew) {
        return this.$store.state.qs.newTopic;
      } else {
        return this.$store.state.qs.qsBank[this.qsOrder].content;
      }
    },
  },
  methods: {
    delItem(order) {
      this.$store.commit("delTopicItem", {
        //题型键名
        tType: "Answer",
        //题条键名
        iType: "subQ",
        tOrder: this.currentOrder,
        iOrder: order,
      });
    },
    addItem() {
      let i = !this.answers.subQ ? 0 : this.answers.subQ.length;
      this.$store.commit("addTopicItem", {
        //题型键名
        tType: "Answer",
        //题条键名
        iType: "subQ",
        tOrder: this.currentOrder,
        content: {
          order: i + 1,
          content: "",
          answer: "",
        },
      });
    },
  },
  created() {
    console.log("Answer created!");
  },
};
</script>

<style>
.answer {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.answer-form {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(216, 7, 52);
  display: flex;
  justify-content: center;
}
.answer-one {
  width: 100%;
  height: 7vh;
  margin-bottom: 1vh;
  display: flex;
  flex-wrap: nowrap;
  border: 3px solid rgb(7, 115, 216);
}
.answer-info {
  width: 100%;
  height: 20vh;
  border: 3px solid rgb(7, 115, 216);
}
.answer-ones {
  width: 100%;
  height: 40vh;
}
</style>