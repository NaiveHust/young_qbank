<!--
 * @Author: 肖环宇
 * @Date: 2021-07-12 20:05:32
 * @LastEditTime: 2021-07-12 23:11:42
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <!-- 单选题 -->
  <div class="single">
    <el-form v-if="singles" :model="singles" label-width="80px" :inline="false">
      <el-row  class="single-info">
        <el-form-item :label="'第' + singles.order + '题'"> </el-form-item>
        <el-form-item label="分值">
         
          <span>{{singles.score}}分</span>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <!-- <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          disabled
          v-model="singles.question"
        >
        </el-input> -->
        <span>{{singles.question}}</span>
      </el-form-item>

      <el-scrollbar class="single-ones">
        <el-radio-group v-model="singles.reply" 
        @change="finish('Single',singles.order)"
        style="width: 100%">
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
              disabled
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>
           
          </div>
        </el-radio-group>
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
    singles() {
      
        return this.$store.state.paper.paperContent.Single.topic[this.currentOrder - 1];
      
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
    console.log("created!");
  },
};
</script>

<style scoped>
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
.single-one .el-input{
background-color:transparent;border:0;
}
.single-info {
  width: 100%;
  height: 10%;
}
.single-ones {
  width: 80%;
  height: 40vh;
  margin: 1vh;
  
}
</style>