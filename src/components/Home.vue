<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-12 16:41:29
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="home">
    <!-- header -->
    <el-row class="home-header">
      <Header></Header>
    </el-row>
    <!-- mid -->

    <div class="home-body">
      <div class="body-sidebar">
        <Sidebar></Sidebar>
      </div>
      <!-- workspace -->

      <div class="body-workspace">
        <div style="height: 5%" class="hidden-md-and-down">
          <Tags> </Tags>
        </div>
        <div class="body-dashboard">
          <!-- 组件内绑定的作用域值的映射 -->
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./HomeHeader";
import Sidebar from "./Sidebar";
import Tags from "./Tags";

export default {
  components: {
    Header,
    Sidebar,
    Tags,
  },
  computed: {
    tagsList() {
      return this.$store.state.tagsList.map((item) => item.name);
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
};
</script>
<style scoped>
.home {
  height: 100vh;
  width: 100vw;
}
.home-header {
  height: 10vh;
  width: 100vw;
}
.home-body {
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
}
.body-sidebar {
  height: 100%;
  width: auto;
}
.body-workspace {
  height: 100%;
  flex: 1 1 auto;
  overflow: hidden;
}
.body-dashboard {
  height: 95%;
  width: 100%;
  border-style: inset;
 
  overflow: hidden;
}
</style>