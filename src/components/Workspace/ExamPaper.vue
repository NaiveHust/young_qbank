<template>
<div class="paper">
  <!-- 试卷总体信息 保存 -->
  <el-row style="height: 10%">
    <el-col :span="12" :offset="0">
      <div class="paper-main-info">
        <h1>试卷主题信息</h1>
      </div>
    </el-col>
    <el-col :span="12" :offset="0"></el-col>
  </el-row>
  <!-- 主区域 -->
  <el-row style="height: 90%">
    <!-- 试卷大纲显示 -->
    <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" :offset="0">
      <div class="paper-outline-view">
        <h1>试卷大纲</h1>
      </div>
    </el-col>
    <!-- 试卷内容编辑 -->
    <el-col :xs="16" :sm="16" :md="18" :lg="20" :xl="20" :offset="0">
      <div class="paper-edit">
          <h1>试卷</h1>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.paper{
    width: 100%;
  height: 100%;
}
.paper-main-info {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.paper-outline-view {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.paper-edit {
  width: 100%;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
</style>