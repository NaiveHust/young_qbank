<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-07 20:13:57
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <el-row type="flex" class="header" justify="space-between">
    <!-- 折叠按钮 -->
    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
      <div class="header-left">
        <div class="collapse-btn" @click="collapseChage">
          <i v-if="!collapse" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :md="4" :lg="6" :xl="6" class="hidden-md-and-down">
      <div class="logo">试题库系统</div>
    </el-col>

    <el-col :xs="20" :sm="20" :md="20" :lg="14" :xl="14">
      <div class="header-right">
        <!-- 切换语言 -->
        <el-dropdown split-button type="primary" @command="switchLanguage">
          {{ $t("login.lang") }}

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="cn">简体中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>

        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a
                href="https://github.com/lin-xin/vue-manage-system"
                target="_blank"
              >
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      fullscreen: false,
      name: "linxin",
      message: 2,
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command === "loginout") {
        localStorage.removeItem("young-userInfo");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.$store.commit("hadndleCollapse", !this.collapse);
    },
    switchLanguage(command) {
      this.$i18n.locale = command ? command : this.$i18n.locale;
    },
  },
  mounted() {
    if (document.body.clientWidth < 1200) {
      this.collapseChage();
    }
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 100%;

  font-size: auto;
  color: #fff;
}
.collapse-btn {
  float: left;
  /*内边距样式 上下 左右*/
  padding: 0 21px;
  /*鼠标悬浮样式*/
  cursor: pointer;
  height: 100%;
  border: 3px solid rgb(7, 115, 216);
}
.logo {
  float: left;
  height: 100%;
  line-height: 350%;
  border: 3px solid rgb(7, 115, 216);
}
.header-right {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  border: 3px solid rgb(7, 115, 216);
}
.header-left {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border: 3px solid rgb(7, 115, 216);
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;

  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  border: 3px solid rgb(7, 115, 216);
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  border: 3px solid rgb(7, 115, 216);
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-icon-s-unfold,
.el-icon-s-fold {
  height: 100%;
  line-height: 350%;
}
</style>
