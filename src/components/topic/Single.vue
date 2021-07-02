<template>
  <!-- 单选题 -->
  <div class="single">
    <el-form
      v-if="singles"
      :model="singles"
      ref="form"
      label-width="80px"
      :inline="false"
      
    >
      <el-row>
        <el-form-item :label="'第' + singles.order + '题'">
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="singles.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="singles.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar style="height:50vh">
        <el-radio-group v-model="singles.answer">
          <div
            v-for="choice in singles.choice"
            :key="choice.name"
            class="single-one"
          >

            
            <el-radio-button :label="choice.name"> </el-radio-button>
            <el-input
              v-model="choice.content"
              style="width: 40vw"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>
            <el-button type="primary" @click="deleteChoice(choice.name)">
              删除
            </el-button>
            
          </div>
        </el-radio-group>
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addChoice(currentOrder)">添加选项</el-button>
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
    singles() {
      return this.$store.state.paper.paperContent.Single.topic[this.currentOrder-1];
    },
    sContent() {
      return this.$store.state.paper.sTem;
    },
  },
  methods: {
    deleteChoice(name) {
      console.log(name);
    },
    addChoice(order) {
      this.$store.commit('addSingleItem',order);
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
  margin-bottom: 2vh;
  display: flex;
  flex-wrap: nowrap;
  border: 3px solid rgb(7, 115, 216);
}
.single-info {
  width: 100%;
  height: 20vh;
  border: 3px solid rgb(7, 115, 216);
}
.single-ones {
  width: 100%;
  height: 40vh;
}
</style>