<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-12 10:51:12
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="login-wrap">
    <el-row style="height: 10vh;">
      <Header></Header>
    </el-row>

    <el-row style="height: 76vh; margin: 2vh">
      <!-- xs：phone  lg:computer -->
      <!--xs 768  sm 992 md  1200 lg 1920 xl-->

      <el-col :span="14" class="hidden-md-and-down">
        <el-carousel style="height: 100%" pause-on-hover>
          <el-carousel-item v-for="img in images" :key="img" class="login-img">
            <el-image
              :src="img"
              fit="fill"
              style="height: 100%"
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
              size="medium"
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
            <el-form-item>
              <el-select v-model="userType" placeholder="身份">
                <el-option
                  v-for="(item, index) in loginType"
                  :key="index"
                  :label="$i18n.messages[$i18n.locale].loginType[item.value]"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

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

            <div style="width: 80%;margin: 10%">
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

    <el-row style="height: 10vh;">
      <Footer></Footer>
    </el-row>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
import { instance } from "../../axios";

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
      userType: "",
      param: {
        username: "",
        password: "",
      },
      loginType: [
        {
          
          value: "student",
        },
        {
         
          value: "teacher",
        },
        {
          
          value: "admin",
        },
      ],

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
        require("../../assets/img/login/01.png"),
        require("../../assets/img/login/02.png"),
       
      ],
    };
  },

  created() {
    this.$store.commit("clearTags");
    this.userType = localStorage.getItem("young-user-type");
    this.setUserType();
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        console.log("submit!");
        if (valid) {
          console.log("valid!");
          this.login(this.userType, this.param.username, this.param.password);
        } else {
          this.$message.error(this.$t("login.error0"));
          return false;
        }
      });
    },
    switchLanguage(command) {
      this.$i18n.locale = command ? command : this.$i18n.locale;
    },
    setUserType() {
      this.$store.commit("setUserType", this.userType);
    },
    login(type, id, pwd) {
      console.log("登录:", type, id, pwd);
      instance
        .get(`/${type}/check/${id}/${pwd}`, {
          /*  params: {
            id: id,
            pwd: pwd,
        }, */
        })
        .then((res) => {
          //后台返回状态码都是200。。。,先这样实现
          console.log("res", res);
          if (res.data === "" || res.data.length === 0) {
            //先假设服务器正常
            this.$message.error("账号或密码错误!");
            this.$router.push("/login");
          } else {
            localStorage.setItem("young-user-type", this.userType);
            this.setUserType();
            console.log("缓存用户类型", this.userType);
            let userInfo = {
              id: res.data.id,
              pwd: res.data.pwd,
              name: res.data.name,
              token: "mock",
            };
            this.$store.commit("storeUser", userInfo);
            localStorage.setItem("young-userInfo", JSON.stringify(userInfo));
            console.log(
              "用户信息",
              JSON.parse(localStorage.getItem("young-userInfo"))
            );
            this.$message.success("登录成功");
            this.$router.push("/welcome");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.login-wrap {
 background:  repeat url('../../assets/img/login/login_bg.png');
  
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
  height: 100%;
  border-radius: 5px;
  background: rgb(31, 138, 180,0.2);
  overflow: hidden;
}
.ms-content {
  padding: 2% 10%;
}


.lan-button{
  color: rgba(160, 33, 219, 1);
  background: rgba(160, 33, 219, 0.1);
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
  height: 60%;
  margin: 10% 10%;
  
  
}
.login-mid .el-form-item{
  margin: 10%;
  
}

.login-down {
  height: 10%;
}

.login-lang {
  margin-top: 20px;
}
.login-img {
 
  height: 150%;
  text-align: center;
}
</style>