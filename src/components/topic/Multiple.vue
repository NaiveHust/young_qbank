<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 19:33:16
 * @LastEditTime: 2021-07-11 11:52:28
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <!-- 单选题 -->
  <div class="multiple">
    <el-form
      v-if="multiples"
      :model="multiples"
      ref="form"
      label-width="80px"
      :inline="false"
    >
      <el-row v-if="inPaper">
        <el-form-item :label="'第' + multiples.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="multiples.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="multiples.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="multiple-ones">
        <el-checkbox-group v-model="multiples.answer">
          <div
            v-for="item in multiples.choice"
            :key="item.name"
            class="multiple-one"
          >
            <el-checkbox-button :label="item.name"></el-checkbox-button>
            <el-input
              v-model="item.content"
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
        </el-checkbox-group>
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addItem()">添加选项</el-button>
        <!-- <el-button type="primary" @click="finishTopic()">完成编辑</el-button> -->
      </el-form-item>
       <div style="width: 100%;display:flex;justify-content:space-between;">
       
        <el-select
          v-model="multiples.level"
          placeholder="试题难度"
          style="width: 15%"
        >
          <el-option label="易" value="易"></el-option>
          <el-option label="中" value="中"></el-option>
          <el-option label="难" value="难"></el-option>
        </el-select>
        
          <el-select
          v-model="multiples.course"
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
          v-model="multiples.explain"
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
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    multiples() {
      if (this.inPaper) {
        return this.$store.state.paper.paperContent.Multiple.topic[
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
        tType: "Multiple",
        //题条键名
        iType: "choice",
        tOrder: this.currentOrder,
        iOrder: order,
      });
    },
    addItem() {
      let i = !this.multiples.choice ? 0 : this.multiples.choice.length;
      this.$store.commit("addTopicItem", {
        //题型键名
        tType: "Multiple",
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
  },
  created() {
    console.log("created!");
  },
};
</script>

<style>
.multiple {
  width: 100%;
  height: 100%;
  
}
.multiple-form {
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
}
.multiple-one {
  width: 100%;
  height: 7vh;
  margin-bottom: 1vh;
  display: flex;
  flex-wrap: nowrap;
  
}
.multiple-info {
  width: 100%;
  height: 20vh;
  
}
.multiple-ones {
  width: 100%;
  height: 40vh;
}
</style>