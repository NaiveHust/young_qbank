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
      <el-row>
        <el-form-item :label="'第' + answers.order + '题'">
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="answers.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width:50vw;"
           resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="answers.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="answer-ones">
       
          <div
            v-for="item in answers.subQ"
            :key="item.order"
            class="answer-one"
          >
            第{{item.order}}问
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

         <el-form-item label="答案解析">
        <el-input
          type="textarea"
          style="width:50vw;"
           resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目解析"
          v-model="answers.explain"
        >
        </el-input>
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
    answers() {
      return this.$store.state.paper.paperContent.Answer.topic[this.currentOrder-1];
    },
   
  },
  methods: {
    delItem(order) {
      this.$store.commit('delTopicItem',{
      //题型键名
        tType:"Answer",
        //题条键名
        iType:"subQ",
        tOrder:this.currentOrder,
        iOrder:order,
      });
      
    },
    addItem() {
      let i = !this.answers.subQ?0:this.answers.subQ.length;
      this.$store.commit('addTopicItem',{
        //题型键名
        tType:"Answer",
        //题条键名
        iType:"subQ",
        tOrder:this.currentOrder,
        content:{
                order:i+1,
                content: '',
                answer: "",
            }
      }
      );
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