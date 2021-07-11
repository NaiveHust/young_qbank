<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-11 11:50:23
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
/*    (function(){
            change();
            function change(){
                //html的 font-size 的大小尺寸
                //这里的html字体大小利用了一个简单的数学公式，当我们默认设置以屏幕320px位基准此时的字体大小为20px(320    20px),那么浏览器窗口大小改变的时候新的html的fontSize（clientWidth  新的值）就是clientWidth*20/320
                document.documentElement.style.fontSize = document.documentElement.clientWidth*20/320 +'px';
                console.log('字体大小',document.documentElement.style.fontSize);
            }
           
            window.addEventListener('resize',change,false);
        })(); */
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