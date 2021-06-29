<template>
  <div class="home">
    <!-- header -->
    <el-row style="height: 10%; width: 100%">
      <Header></Header>
    </el-row>
    <!-- mid -->

    <div 
    style="height: 90%; 
    width: 100%; 
    display:flex;
    justify-content: left;
   ">
      <!-- sidebar -->
      <!-- :xs="8" :sm="8" :md="6" :lg="4" :xl="4"  -->
      <div style="  
      height: 100%;
      width: 15%;
      position: relative;
     
      "
      >
        <Sidebar></Sidebar>
      </div>
      <!-- workspace -->

      <div 
     style="height: 100%;
       width: 100%;
       flex: 1
      
        ">
        <div class="workspace">
          <div style="height: 5%">
            <Tags> </Tags>
          </div>

          <div class="dashboard">
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
  height: 100%;
  width: 100%;
}
.workspace {
  height: 100%;

  border: 3px solid rgb(7, 115, 216);
}
.dashboard {
  height: 95%;
  display: flex;
  border: 3px solid rgb(206, 219, 16);
}
</style>