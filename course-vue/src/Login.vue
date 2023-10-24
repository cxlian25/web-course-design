<template>
<div class="page">
  <div class="main">
  <div class="main-box">
    <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
      <form>
        <h2 class="title">Create Account</h2>
        <span class="text">or use email for registration</span>
        <input class="form__input" type="text" placeholder="请输入邮箱" v-model="email"/>
        <input class="form__input" type="text" placeholder="请输入姓名" v-model="perName"/>
        <input class="form__input" type="text" placeholder="请输入学号" v-model="username"/>
        <input class="form__input" type="password" placeholder="请输入密码" v-model="password"/>
        <select class="role" v-model="role">
                  <option value="ADMIN">管理员</option>
                  <option value="STUDENT">学生</option>
                  <option value="TEACHER">教师</option>
                </select>
                <div class="valicodediv">
          <input class="valicode" v-model="valiCode" placeholder="请输入验证码" />
          <img @click="changeValiCode()" class="img1" referrerpolicy="no-referrer" :src="img" />
        </div>
        <div class="register-btn" @click=register()>立即注册</div>
      </form>
    </div>
    <div
      :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]"
    >
      <form>
        <h2 class="title">登录 学生管理系统</h2>
        <span class="text">或使用邮箱注册</span>
        <input class="form__input" type="text" placeholder="请输入学号" v-model="username"/>
        <input class="form__input" type="password" placeholder="请输入密码" v-model="password"/>
        <div class="valicodediv">
          <input class="valicode" v-model="valiCode" placeholder="请输入验证码" />
          <img @click="changeValiCode()" class="img1" referrerpolicy="no-referrer" :src="img" />
        </div>
        
        
        <div class="primary-btn" @click=loginSubmit()>立即登录</div>
      </form>
    </div>
    <div :class="['switch', { login: isLogin }]">
      <div class="switch__circle"></div>
      <div class="switch__circle switch__circle_top"></div>
      <div class="switch__container">
        <h2>{{ isLogin ? '您好 !' : '欢迎 !' }}</h2>
        <p>
          {{
            isLogin
              ? 'Enter your personal details and start journey with us'
              : 'To keep connected with us please login with your personal info'
          }}
        </p>
        <div class="primary-btn" @click="isLogin = !isLogin">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "./stores/app";
import {
  getValidateCode,
  testValidateInfo,
  resetPassWord,
  registerUser,
} from "./services/mainServ";
import { message } from "./tools/messageBox";
import router from "./router";
import { Base64 } from "js-base64";
function checkNotEmpty(value: string): boolean | string {
  if (value) return true;

  return "您必须输入用户名密码";
}
const USER_KEY = "UserKey";
export default defineComponent({
  //返回的数据，templte中使用的数据
  data: () => ({
    // username: '2022030001',
    // username: 'admin',
    // password: '123456',
    isLogin:true,
    username: "",
    password: "",
    valiCode: "",
    pageType: 1,
    id: 0,
    jwt: "",
    img: "",
    funId: "",
    vueName: "",
    loginCode: "",
    email: "",
    messageCode: "",
    showSlider: false,
    remember: true,
    role: "STUDENT",
    perName: "",
    rules: [checkNotEmpty],
  }),
  //页面加载前执行的函数 设置初始为登录界面
  beforeMount() {
    this.pageType = 1;
  },
  //页面加载后执行的函数， 执行性一次， 从后台请求验证码，从浏览器获取上次登录的用户信息作为用户和密码的初始值
  async created() {
    const res = await getValidateCode();
    this.id = res.validateCodeId;
    this.img = res.img;
    const store = useAppStore();
    if (store.remember) {
      this.username = Base64.decode(store.usernameSave);
      this.password = Base64.decode(store.passwordSave);
      this.remember = true;
    } else {
      this.username = "";
      this.password = "";
      this.remember = false;
    }
  },
  //页面加载后执行的函数， 执行性多次
  methods: {
    //刷新验证码
    async changeValiCode() {
      const res = await getValidateCode();
      this.id = res.validateCodeId;
      this.img = res.img;
      this.valiCode = "";
    },
    //返回登录界面
    backLogin() {
      this.username = "";
      this.password = "";
      this.valiCode = "";
      this.pageType = 1;
    },
    //忘记密码 显示密码设置表单显示
    forgetPass() {
      this.username = "";
      this.password = "";
      this.valiCode = "";
      this.pageType = 2;
    },
    //用户注册 显示用户注册表单
    pageRegister() {
      this.username = "";
      this.password = "";
      this.valiCode = "";
      this.pageType = 3;
    },
    // 初始密码 请求后台服务，将发送初始密码到邮箱
    async initPassword() {
      let res = await testValidateInfo({
        validateCodeId: this.id,
        validateCode: this.valiCode,
      });
      if (res.code != 0) {
        message(this, res.msg);
        this.changeValiCode();
        return;
      }
      if (this.username == "" || this.username == undefined) {
        message(this, "账号为空,请填写账号");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        message(this, "邮箱为空,请填写邮箱");
        return;
      }
      res = await resetPassWord({
        username: this.username,
        email: this.email,
      });
      if (res.code == 0) {
        message(this, "初始密码已发送至您的邮箱，请注意查收");
        this.changeValiCode();
        this.pageType = 1;
      } else {
        message(this, res.msg);
      }
    },
    //用户注册 请求后台服务，将用户注册信息发送到后台，后台添加账户人员教师或学生信息
    async register() {
      let res = await testValidateInfo({
        validateCodeId: this.id,
        validateCode: this.valiCode,
      });
      if (res.code != 0) {
        message(this, res.msg);
        this.changeValiCode();
        return;
      }
      if (this.username == "" || this.username == undefined) {
        message(this, "账号为空,请填写账号");
        return;
      }
      if (this.password == "" || this.password == undefined) {
        message(this, "账号为空,请填写密码");
        return;
      }
      if (this.perName == "" || this.perName == undefined) {
        message(this, "姓名为空,请填写姓名");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        message(this, "邮箱为空,请填写邮箱");
        return;
      }
      if (this.role == "" || this.role == undefined) {
        message(this, "角色为空,请选择角色");
        return;
      }
      res = await registerUser({
        username: this.username,
        password: this.password,
        perName: this.perName,
        email: this.email,
        role: this.role,
      });
      if (res.code == 0) {
        message(this, "已注册成功！");
        this.changeValiCode();
        this.pageType = 1;
      } else {
        message(this, res.msg);
      }
    },
    //登录请求后台服务，将用户登录信息发送到后台，后台验证用户信息，返回jwt
    async loginSubmit() {
      const res = await testValidateInfo({
        validateCodeId: this.id,
        validateCode: this.valiCode,
      });
      if (res.code != 0) {
        message(this, res.msg);
        this.changeValiCode();
        return;
      }
      if (this.username == "" || this.username == undefined) {
        message(this, "用户名为空");
      } else if (this.password == "" || this.password == undefined) {
        message(this, "密码为空");
      } else {
        const store = useAppStore();
        try {
          //登录成功后，将用户信息保存到store中，将用户信息保存到浏览器中
          await store.login(this.username, this.password);
          await store.setNavi();
          if (this.remember) {
            store.saveAccount(
              Base64.encode(this.username),
              Base64.encode(this.password)
            );
          } else {
            store.removeAccount();
          }
          router.push("/MainPage");
        } catch (err) {
          message(this, "登录失败!");
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.img1 {
  width: 86px;
  height: 25px;
}
.main {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 确保body元素占满整个视口高度 */
  margin: 0; /* 移除默认的外边距 */
}
.head-text {
  text-align: center;
  line-height: 50px; /* 假设你的div高度为50px */
  overflow-wrap: break-word;
  color: rgba(85, 85, 85, 1);
  font-size: 16px;
  font-family: PingFangTC-Regular;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.page {
  background: url("/backgroud.png") -1px -1px no-repeat;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 确保body元素占满整个视口高度 */
  margin: 0; /* 移除默认的外边距 */
}
.main-box {
  // margin: 300px;
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color:rgba(236, 240, 243,0.5);
  box-shadow: 10px 10px 10px rgba(209, 217, 230,0.5), -10px -10px 10px rgba(249, 249, 249,0.5);
  border-radius: 12px;
  overflow: hidden;
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;
      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      .text {
        margin-top: 10px;
        margin-bottom: 12px;
      }
      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
      .role {
        width: 377px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
      .valicode {
        padding-top: 0px;
        width: 262px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
      .valicodediv{
        height: 43px;
        align-items: center; /* 垂直居中 */
      }
    }
  }
  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }
  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }
  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }
  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: rgba(236, 240, 243, 0.5);
    overflow: hidden;
    box-shadow: 4px 4px 10px rgba(209, 217, 230,0.5), -4px -4px 10px rgba(249, 249, 249,0.5);
    color: #a0a5a8;
    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -60%;
      left: -60%;
      transition: 1.25s;
    }
    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }
    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;
      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }
  .login {
    left: calc(100% - 400px);
    .switch__circle {
      left: 0;
    }
  }
  .primary-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
        -4px -4px 6px 0 rgb(116 125 136 / 50%),
        inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
        inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
    }
  }
  .register-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 5px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
        -4px -4px 6px 0 rgb(116 125 136 / 50%),
        inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
        inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
    }
  }
}
</style>

