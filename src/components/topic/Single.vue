<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 19:32:15
 * @LastEditTime: 2021-07-12 14:36:22
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <!-- 单选题 -->
  <div class="single">
    <el-form v-if="singles" :model="singles" label-width="80px" :inline="false">
      <el-row v-if="inPaper" class="single-info">
        <el-form-item :label="'第' + singles.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="singles.score" type="number" @change="reCount()"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="singles.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="single-ones">
        <el-radio-group v-model="singles.answer" style="width: 100%">
          <div
            v-for="item in singles.choice"
            :key="item.name"
            class="single-one"
          >
            <el-radio-button style="height: 100%" :label="item.name">
            </el-radio-button>
            <el-input
              v-model="item.content"
              style="width: 40vw; margin: 0 2vw"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>

            <el-button
              class="el-icon-delete"
              size="medium"
              @click.stop="delItem(item.order)"
              type="danger"
              round
              style="float: right"
            >
            </el-button>
          </div>
        </el-radio-group>
      </el-scrollbar>

      
        <el-button type="primary" @click="addItem()">添加选项</el-button>
     

    

      <div style="width: 100%; display: flex; justify-content: space-around">
        <el-select
          v-model="singles.level"
          placeholder="试题难度"
          style="width: 15%"
        >
          <el-option label="易" value="易"></el-option>
          <el-option label="中" value="中"></el-option>
          <el-option label="难" value="难"></el-option>
        </el-select>

        <el-select
          v-model="singles.course"
          placeholder="所属课程"
          style="width: 15%"
        >
          <el-option
            v-for="(course, index) in courses"
            :key="index"
            :label="course.cName"
            :value="course.cName"
          ></el-option>
        </el-select>

        <el-input
          type="textarea"
          style="width: 40%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="请输入题目解析"
          v-model="singles.explain"
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
    inPaper() {
      return this.$store.state.paper.inPaper;
    },
    editNew() {
      return this.$store.state.qs.editNew;
    },
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    singles() {
      if (this.inPaper) {
        return this.$store.state.paper.paperContent.Single.topic[
          this.currentOrder - 1
        ];
      } else if (this.editNew) {
        return this.$store.state.qs.newTopic;
      } else {
        return this.$store.state.qs.qsBank[this.qsOrder].content;
      }
    },
    courses() {
      return this.$store.state.cs.myCourses;
    },
  },
  methods: {
    delItem(order) {
      this.$store.commit("delTopicItem", {
        //题型键名
        tType: "Single",
        //题条键名
        iType: "choice",
        tOrder: this.currentOrder,
        iOrder: order,
      });
    },
    addItem() {
      let i = !this.singles.choice ? 0 : this.singles.choice.length;
      this.$store.commit("addTopicItem", {
        //题型键名
        tType: "Single",
        //题条键名
        iType: "choice",
        tOrder: this.currentOrder,
        content: {
          order: i + 1,
          name: String.fromCharCode(65 + i),
          content: "",
        },
      });
    },
    reCount(){
      this.$store.commit('countNowCount');
    }
  },
  created() {
    console.log("created!");
  },
};
</script>

<style>
.single {
  width: 100%;
  height: 100%;
}
.single-form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.single-one {
  width: 100%;
  height: 8vh;
  margin: 1vh;
  display: flex;
  flex-wrap: nowrap;
}
.single-info {
  width: 100%;
  height: 10%;
}
.single-ones {
  width: 80%;
  height: 40vh;
  margin: 1vh;
  border: 2px double rgb(63, 14, 153, 0.3);
}
</style>