<!--
 * @Author: 肖环宇
 * @Date: 2021-07-12 20:56:29
 * @LastEditTime: 2021-07-12 23:23:10
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
          <span>{{fills.score}}</span>
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
            style="width: 25%"
            resize="none"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.head"
            disabled
          >
          </el-input>
          {{ "第" + item.order + "空" }}
          <!-- tail -->
          <el-input
            type="textarea"
            resize="none"
            style="width: 25%"
            disabled
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.tail"
          >
          </el-input>

          <!-- answer -->
          
          <el-input
            type="textarea"
            resize="none"
            placeholder="请输入答案"
            style="width: 25%"
            clearable
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.reply"
            @change="finish('Fill',fills.order,item.reply)"
          >
          </el-input>
          
         
           
        </el-row>
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
    fills() {
     
        return this.$store.state.paper.paperContent.Fill.topic[
          this.currentOrder - 1
        ];
    
    },
     courses(){
      return this.$store.state.cs.myCourses;
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
    console.log("Fill created!");
  },
};
</script>

<style scoped>
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
  height: 6vh;
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-around;
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