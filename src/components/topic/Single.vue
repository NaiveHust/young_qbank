<template>
  <!-- 单选题 -->
  <div class="single">
    <el-form
      v-if="singles"
      :model="singles"
      label-width="80px"
      :inline="false"
    >
      <el-row v-if="inPaper" class="single-info">
        <el-form-item :label="'第' + singles.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="singles.score" type="number"></el-input>
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
            <el-radio-button :label="item.name"> </el-radio-button>
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
        </el-radio-group>
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addItem()">添加选项</el-button>
        <!-- <el-button type="primary" @click="finishTopic()">完成编辑</el-button> -->
      </el-form-item>

      <div style="width:100%">
      <span>难度</span>
      <el-select v-model="singles.level" placeholder="请选择" style="width:10%">
        <el-option label="易" value=0 ></el-option>
        <el-option label="中" value=1 ></el-option>
        <el-option label="难" value=2 ></el-option>
      </el-select>

        <span style="margin-left:5%">答案解析</span>
        <el-input
          type="textarea"
          style="width: 60%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
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

    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    singles() {
      return this.$store.state.paper.paperContent.Single.topic[
        this.currentOrder - 1
      ];
    },
    sContent() {
      return this.$store.state.paper.sTem;
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
  border: 3px solid rgb(7, 115, 216);
}
.single-form {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(216, 7, 52);
  display: flex;
  justify-content: center;
}
.single-one {
  width: 100%;
  height: 8vh;
  margin-bottom: 1vh;
  display: flex;
  flex-wrap: nowrap;
  border: 3px solid rgb(7, 115, 216);
}
.single-info {
  width: 100%;
  height: 10%;
  border: 3px solid rgb(7, 115, 216);
}
.single-ones {
  width: 100%;
  height: 40vh;
}
</style>