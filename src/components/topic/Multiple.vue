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
      <el-row>
        <el-form-item :label="'第' + multiples.order + '题'"> </el-form-item>
        <el-form-item label="分值">
          <el-input v-model.number="multiples.score" type="number"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="题干信息">
        <el-input
          type="textarea"
          style="width: 50vw"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题干信息"
          v-model="multiples.question"
        >
        </el-input>
      </el-form-item>

      <el-scrollbar class="multiple-ones">
        <!--   <el-radio-group v-model="multiples.answer">
          <div
            v-for="item in multiples.choice"
            :key="item.name"
            class="multiple-one"
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
        </el-radio-group> -->
        <el-checkbox-group v-model="multiples.answer">
          <div
           v-for="item in multiples.choice"
            :key="item.name"
            class="multiple-one"
          >
           <el-checkbox-button  :label="item.name" ></el-checkbox-button>
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
        </el-checkbox-group>
        
      </el-scrollbar>

      <el-form-item>
        <el-button type="primary" @click="addItem()">添加选项</el-button>
        <!-- <el-button type="primary" @click="finishTopic()">完成编辑</el-button> -->
      </el-form-item>

      <el-form-item label="答案解析">
        <el-input
          type="textarea"
          style="width: 50vw"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目解析"
          v-model="multiples.explain"
        >
        </el-input>
      </el-form-item>
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
    multiples() {
      return this.$store.state.paper.paperContent.Multiple.topic[
        this.currentOrder - 1
      ];
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
  },
  created() {
    console.log("created!");
  },
};
</script>

<style>
.multiple {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.multiple-form {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(216, 7, 52);
  display: flex;
  justify-content: center;
}
.multiple-one {
  width: 100%;
  height: 7vh;
  margin-bottom: 1vh;
  display: flex;
  flex-wrap: nowrap;
  border: 3px solid rgb(7, 115, 216);
}
.multiple-info {
  width: 100%;
  height: 20vh;
  border: 3px solid rgb(7, 115, 216);
}
.multiple-ones {
  width: 100%;
  height: 40vh;
}
</style>