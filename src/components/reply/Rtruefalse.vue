<!--
 * @Author: 肖环宇
 * @Date: 2021-07-12 20:56:58
 * @LastEditTime: 2021-07-12 23:15:46
 * @LastEditors: 肖环宇
 * @Description: 
-->


<template>
  <!-- 判断题 -->
  <div class="tf">
    <el-form
      v-if="truefalse"
      :model="truefalse"
      ref="form"
      label-width="80px"
      :inline="false"
    >
      <el-row>
        <el-form-item :label="'第' + truefalse.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <span>{{truefalse.score}}</span>
        </el-form-item>
      </el-row>

      <el-form-item label="题目">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目"
          disabled
          v-model="truefalse.question"
        >
        </el-input>

        <div>
          答案
          <el-switch
            style="display: block"
            v-model="truefalse.reply"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-icon-class="el-icon-check"
            inactive-icon-class="el-icon-close"
            @change="finish('Truefalse',truefalse.order)"
          >
          </el-switch>
        </div>
      </el-form-item>

       <div style="width: 100%;display:flex;justify-content:space-around;">
       
   
        
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
    
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    truefalse() {
      
        return this.$store.state.paper.paperContent.Truefalse.topic[
          this.currentOrder - 1
        ];
     
    },
     courses(){
      return this.$store.state.cs.myCourses;
    },
  },
  methods: {
    reCount(){
      this.$store.commit('countNowCount');
    },
     finish(type,order){
      this.$store.commit('refreshOne',{
        type:type,
        order:order,
        val:true,
        })
    }
  },
  created() {
    console.log("TF created!");
  },
};
</script>

<style>
.tf {
  width: 100%;
  height: 100%;
  
}
</style>