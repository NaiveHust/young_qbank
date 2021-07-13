<!--
 * @Author: 肖环宇
 * @Date: 2021-07-12 20:56:16
 * @LastEditTime: 2021-07-12 23:14:16
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
      <el-row >
        <el-form-item :label="'第' + multiples.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <span>{{multiples.score}}</span>
          
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width: 80%"
          resize="none"
          disabled
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="multiples.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="multiple-ones">
        <el-checkbox-group 
        @change="finish('Multiple',multiples.order)"
        v-model="multiples.reply">
          <div
            v-for="item in multiples.choice"
            :key="item.name"
            class="multiple-one"
          >
            <el-checkbox-button :label="item.name"></el-checkbox-button>
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
        </el-checkbox-group>
      </el-scrollbar>

    
    
        
     

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
  
    currentOrder() {
      return this.$store.state.paper.currentOrder;
    },
    qsOrder() {
      return this.$store.state.qs.qsOrder;
    },
    multiples() {
     
        return this.$store.state.paper.paperContent.Multiple.topic[
          this.currentOrder - 1
        ];
    
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
    reCount(){
      this.$store.commit('countNowCount');
    },
    finish(type,order){
      this.$store.commit('refreshOne',{
        type:type,
        order:order,
        val:true,
        })
    },
  },
  created() {
    console.log("created!");
  },
};
</script>

<style scoped>
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
  height: 8vh;
  margin: 1vh;
  display: flex;
  flex-wrap: nowrap;
  
}
.multiple-info {
  width: 100%;
  height: 10%;
  
}
.multiple-ones {
  width: 80%;
  height: 40vh;
  margin: 1vh;
  border: 2px double rgb(63, 14, 153, 0.3);
}
</style>