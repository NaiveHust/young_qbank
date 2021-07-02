<template>
  <!-- 单选题 -->
  <div class="single">
    <el-form
      v-if="truefalse"
      :model="truefalse"
      ref="form"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="题目">
        <el-input
          type="textarea"
          style="width: 50vw"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目"
          v-model="truefalse.question"
        >
        </el-input>

        
          <el-switch
            style="display: block"
            v-model="truefalse.answer"
            active-color="#13ce66"
            inactive-color="#ff4949"
           active-icon-class="el-icon-check"
           inactive-icon-class="el-icon-close"
          >
          </el-switch>
        
      </el-form-item>

      <el-form-item label="答案解析">
        <el-input
          type="textarea"
          style="width: 50vw"
          resize="none"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入题目解析"
          v-model="truefalse.explain"
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
    truefalse() {
      return this.$store.state.paper.paperContent.Truefalse.topic[
        this.currentOrder - 1
      ];
    },
  },
  methods: {},
  created() {
    console.log("TF created!");
  },
};
</script>

<style>
.single {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
</style>