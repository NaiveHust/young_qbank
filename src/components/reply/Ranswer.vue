<!--
 * @Author: 肖环宇
 * @Date: 2021-07-12 20:56:42
 * @LastEditTime: 2021-07-12 23:26:13
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
      <el-row >
        <el-form-item :label="'第' + answers.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <span>{{answers.score}}</span>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          disabled
          v-model="answers.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="answer-ones">
        <div v-for="item in answers.subQ" :key="item.order" class="answer-one">
          第{{ item.order }}问
          <el-input
            v-model="item.content"
            style="width: 30%"
            type="textarea"
            resize="none"
            disabled
            :autosize="{ minRows: 2, maxRows: 4 }"
          >
          </el-input>
        
          <el-input
            v-model="item.reply"
            style="width: 30%"
            placeholder="请输入答案"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            @change="finish('Answer',answers.order,item.reply)"
          >
          </el-input>

        </div>
      </el-scrollbar>

    

    
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
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    answers() {
     
        return this.$store.state.paper.paperContent.Answer.topic[
          this.currentOrder - 1
        ];
     
    },
   
  },
  methods: {
     finish(type,order,val){
      this.$store.commit('refreshOne',{
        type:type,
        order:order,
        val:val===''||!val?false:true,
        })
        console.log(val);
    }
  },
  created() {
    console.log("Answer created!");
  },
};
</script>

<style scoped>
.answer {
  width: 100%;
  height: 100%;
  
}
.answer-form {
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
}
.answer-one {
  width: 100%;
  height: 8vh;
  margin: 1vh 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  
}
.answer-info {
  width: 100%;
  height: 20vh;
  
}
.answer-ones {
  width: 100%;
  height: 40vh;
}
</style>