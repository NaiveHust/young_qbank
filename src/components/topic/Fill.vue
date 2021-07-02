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
      <el-row>
        <el-form-item :label="'第' + fills.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="fills.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <!-- 题目 -->
      <el-scrollbar class="fill-ones">
        <div
          v-for="(blank, index) in fills.question"
          :key="index"
          class="fill-one"
        >
          <!-- head -->
          <el-input
            type="textarea"
            style="width: 15vw; height: 8vh"
            resize="none"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="blank.head"
          >
          </el-input>

          <el-form-item
            style="width: 5vw; height: 8vh"
            :label="'第' + blank.order + '空'"
          >
          </el-form-item>
          <!-- tail -->
          <el-input
            type="textarea"
            resize="none"
            style="width: 15vw; height: 8vh"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="blank.tail"
          >
          </el-input>

          <!-- answer -->

          <el-form-item
            style="width: 5vw; height: 8vh"
            label="答案"
          ></el-form-item>
          <el-input
            type="textarea"
            resize="none"
            style="width: 20vw"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="blank.answer"
          >
          </el-input>
        </div>
      </el-scrollbar>

      <!-- 答案 -->
      <!--  <el-scrollbar style="height: 30vh">
        <el-form-item v-for="(answer, index) in fills.answer" 
         style="width:20vw"
        :key="index">

          <el-input 
           type="textarea"
          
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="answer.content">
            <template #prepend>第{{ answer.order }}空</template>
          </el-input>
          
        </el-form-item>
      </el-scrollbar> -->

      <el-form-item>
        <el-button type="primary" @click="addFill(currentOrder)"
          >添加填空</el-button
        >
        <!-- <el-button type="primary" @click="finishTopic()">完成编辑</el-button> -->
      </el-form-item>
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
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    fills() {
      return this.$store.state.paper.paperContent.Fill.topic[
        this.currentOrder - 1
      ];
    },
  },
  methods: {
    deleteFill(name) {
      console.log(name);
    },
    addFill(order) {
      this.$store.commit("addFillItem", order);
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
  border: 3px solid rgb(7, 115, 216);
}
.fill-form {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(216, 7, 52);
}
.fill-one {
  width: 70vw;
  height: 8vh;
  margin-bottom: 2vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  border: 3px solid rgb(7, 115, 216);
}
.fill-info {
  width: 100%;
  height: 20vh;
  border: 3px solid rgb(7, 115, 216);
}
.fill-ones {
  width: 100%;
  height: 50vh;
  border: 3px solid rgb(7, 115, 216);
}
</style>