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

        <el-row
          v-for="(item, index) in fills.question"
          :key="index"
          class="fill-one"
        >

        <el-col :span="12">
           <!-- head -->
          <el-input
            type="textarea"
            style=" width: 15vw;"
            resize="none"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.head"
          >
          </el-input>
            {{'第' + item.order + '空'}}
              <!-- tail -->
          <el-input
            type="textarea"
            resize="none"
            style=" width: 15vw;"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.tail"
          >
          </el-input>
          
        </el-col>
          <el-col :span="8">
                <!-- answer -->
            答案
             <el-input
            type="textarea"
            resize="none"
            style=" width: 15vw;"
            :autosize="{ minRows: 1, maxRows: 2 }"
            v-model="item.answer"
          >
          </el-input>
          </el-col>

      
        <el-col :span="4">
           <el-button
                    class="el-icon-delete"
                    @click.stop="delItem(item.order)"
                    style="float: right"
                  >
                  </el-button>
        </el-col>

        

        </el-row>
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addItem(currentOrder)"
          >添加填空</el-button
        >
      </el-form-item>

      <el-form-item label="答案解析">
        <el-input
          type="textarea"
          style="width: 50vw"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目解析"
          v-model="fills.explain"
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
    fills() {
      return this.$store.state.paper.paperContent.Fill.topic[
        this.currentOrder - 1
      ];
    },
  },
  methods: {
    delItem(order) {
       this.$store.commit('delTopicItem',{
      //题型键名
        tType:"Fill",
        //题条键名
        iType:"question",
        tOrder:this.currentOrder,
        iOrder:order,
      });
    },
    addItem(order) {
      let i = !this.fills.question?0:this.fills.question.length;
      this.$store.commit("addTopicItem", {
        //题型键名
        tType:"Fill",
        //题条键名
        iType:"question",
        tOrder:order,
        content:{
                order:i+1,
                head: '',
                tail: '',
                answer: "",
            }
      });
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
  align-items: center;
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