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
      <template v-for="item in items">
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
        },
        {
          icon: "el-icon-apple",
          index: "table",
          title: "用户管理",
        },
        {
          icon: "el-icon-apple",
          index: "tabs",
          title: "课程管理",
        },
       /*  {
          icon: "el-icon-apple",
          index: "3",
          title: "试题管理",
          subs: [
            {
              index: "form",
              title: "基本表单",
            },
            {
              index: "3-2",
              title: "三级菜单",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器",
                },
                {
                  index: "markdown",
                  title: "markdown编辑器",
                },
              ],
            },
            {
              index: "upload",
              title: "文件上传",
            },
          ],
        }, */
           {
          icon: "el-icon-apple",
          index: "exampaper",
          title: "创建试卷",
        },
        {
          icon: "el-icon-apple",
          index: "6",
          title: "待定功能1",
          subs: [
            {
              index: "drag",
              title: "拖拽列表",
            },
            {
              index: "dialog",
              title: "拖拽弹框",
            },
          ],
        },

        {
          icon: "el-icon-apple",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试",
            },
            {
              index: "404",
              title: "404页面",
            },
          ],
        },
     
         {
          icon: "el-icon-apple",
          index: "/donate",
          title: "待定功能3",
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
