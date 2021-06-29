<template>
  <div class="login-wrap">

    <el-row style="height: 15%">
      <Header></Header>
    </el-row>

    <el-row style="height: 70%">
      <!-- xs：phone  lg:computer -->
      <!--xs 768  sm 992 md  1200 lg 1920 xl-->

      <el-col :span="14" class="hidden-md-and-down">
        <el-carousel style="height: 80%" pause-on-hover>

          <el-carousel-item v-for="img in images" :key="img" class="login-img" >
            <el-image  
              :src=img 
              :fit="scale-down"
              style = "height:100%;"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>

      <el-col :xs="2" :sm="6" :md="8" :lg="0" :xl="0" :offset="0"> </el-col>

      <el-col :xs="20" :sm="12" :md="12" :lg="8" :xl="12" :offset="0">
        <el-form
          :model="param"
          :rules="rules"
          ref="login"
          label-width="0px"
          class="ms-login"
        >
          <!-- up -->
          <div class="login-up">
            <el-dropdown
              split-button
              type="primary"
              @command="switchLanguage"
              style="margin-top: 2%; margin-right: 2%"
            >
              {{ $t("login.lang") }}
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="cn">简体中文</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-divider></el-divider>
          </div>
          <!-- mid -->
          <div class="login-mid">
            <el-form-item prop="username">
              <el-input
                v-model="param.username"
                :placeholder="$t('login.userName')"
              >
                <template #prepend>
                  <el-button icon="el-icon-user" type="success"></el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                type="password"
                :placeholder="$t('login.pwd')"
                v-model="param.password"
                @keyup.enter="submitForm()"
              >
                <template #prepend>
                  <el-button icon="el-icon-lock"></el-button>
                </template>
              </el-input>
            </el-form-item>

            <div style="width: 100%">
              <el-button type="primary" @click="submitForm()">
                {{ $t("login.login") }}
              </el-button>
            </div>
          </div>

          <!-- down -->
          <div class="login-down">
            <el-divider></el-divider>
            <p class="login-tips">{{ $t("login.tip") }}</p>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="height: 15%">
      <Footer></Footer>
    </el-row>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
export default {
   components: {
        Footer,
        Header,
      },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.reqName")));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   // this.$refs.login.validateField('checkPass');
        // }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.reqPwd")));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   // this.$refs.login.validateField('checkPass');
        // }
        callback();
      }
    };
    return {
     
      param: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
      images: [
        require("../../assets/img/login/01.jpg"),
        require("../../assets/img/login/02.jpg"),
        require("../../assets/img/login/03.jpg"),
        require("../../assets/img/login/04.jpg"),
      ],
    };
  },
  created() {
    this.$store.commit("clearTags");
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        console.log("submit!");
        if (valid) {
          this.$message.success("登录成功");
          localStorage.setItem("ms_username", this.param.username);
          this.$router.push("/home");
        } else {
          this.$message.error(this.$t("login.error0"));
          return false;
        }
      });
    },
    switchLanguage(command) {
      this.$i18n.locale = command ? command : this.$i18n.locale;
    },
  },
};
</script>

<style scoped>
.login-wrap {
  background-color: rgb(60, 170, 175);
  background-size: auto;
  height: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: relative;
  width: 100%;
  height: 80%;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 2% 10%;
}

.login-mid button {
  width: 100%;
  height: 100%;
}
.login-tips {
  font-size: 15px;
  line-height: 10%;
  text-align: center;
  color: #fff;
}

.login-up {
  height: 10%;
  text-align: right;
}
.login-mid {
  height: 50%;
  margin: 10% 10%;
}
.login-dowm {
  height: 20%;
}

.login-lang {
  margin-top: 20px;
}
.login-img{
  border: 20px;
  border-color: black;
  height:100%;
  text-align: center;
}
</style>