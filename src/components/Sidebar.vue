<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items.filter(item=>item.roles.indexOf($store.state.userType) > -1)">
        <!-- 多级菜单 -->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>

            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <!-- 单级菜单 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-s-home",
          index: "welcome",
          title: "系统首页",
          roles:['student','teacher','manager'],
        },
        {
          icon: "el-icon-apple",
          index: "manageuser",
          title: "用户管理",
          roles:['manager'],
        },
           {
          icon: "el-icon-apple",
          index: "exampaper",
          title: "创建试卷",
          roles:['teacher',],
        },
         
        {
          icon: "el-icon-apple",
          index: "qsbank",
          title: "题库管理",
          roles:['teacher','manager'],
        },
         {
          icon: "el-icon-apple",
          index: "ppbank",
          title: "试卷管理",
          roles: ['teacher', 'manager'],
        }, 
         {
          icon: "el-icon-apple",
          index: "markpaper",
          title: "我要阅卷",
          roles:['teacher',],
        },  
        {
          icon: "el-icon-apple",
          index: "takeexam",
          title: "我的考试",
          roles:['student',],
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
};
</script>

<style scoped>
.sidebar {
    height:100%;
    width: 100%;
    border: 2px solid rgb(13, 88, 201);
    overflow-y: scroll;
    display: flex;
} 
.sidebar::-webkit-scrollbar {
    width: 0px;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 100%;
  height:auto;
}
.el-menu--collapse{
  height:auto;
}
.sidebar > ul {
  height: 100%;
}
</style>
