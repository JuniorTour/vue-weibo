<template>
<div class="login">
  <!--<h1 v-title>登录-vue-weibo</h1>-->
  <div class="container">
    <header class="avatar">
      <img src="../../../static/img/avatar/my-weibo-avatar.jpg">
    </header>
    <form class="login-form">
      <section class="login-input-wrapper">
        <p>
          <label for="loginName">
            <i class="iconfont">用户名：</i><input type="text" id="loginName" value="帅到被人砍___">
          </label>
        </p>
        <p>
          <label for="loginPassword">
            <i class="iconfont">密码：</i><input type="password" id="loginPassword" value="帅到被人砍___">
          </label>
        </p>
      </section>
      <router-link to="/home" class="btn login-btn">首页</router-link>
      <!--<a href="./home" class="btn login-btn">登录</a>-->
      <p class="third-part-login">
        <a>第三方账号</a>
      </p>
    </form>
    <footer class="other-options">
      <a class="register">注册账号</a>
      <a class="forgot-password">忘记密码</a>
    </footer>
  </div>
</div>
</template>

<script>

</script>

<style scoped lang="stylus">
  // 去除chrome浏览器自动填充时的黄色背景
  input:-webkit-autofill
    -webkit-box-shadow 0 0 0 1000px white inset !important

  a {
    color: #5184BC;
  }

  /*body {
    background-color: #f8f8f8;
  }*/

  .login
    margin-top: -94px;

  .avatar {
    width:70px;
    height: 70px;
    border: 1px solid rgba(0,0,0,0.1);
    margin: 80px auto 0;
  }
  .avatar img {
    width:100%;
  }

  .login-form {
    width:100%;
    font-size: .9275rem;
  }
  .login-input-wrapper {
    padding: 0 27px;
    background-color: #fff;
    border-top:1px solid #d7d7d7;
    border-bottom:1px solid #d7d7d7;
    margin: 27px 0 20px;
  }
  .login-input-wrapper p {
    border-bottom:1px solid #d7d7d7;
  }
  .login-input-wrapper label {
    position: relative;
  }
  .login-input-wrapper p:last-of-type {
    border: none;
  }
  .iconfont {
    color: #aaa;
    font-style: normal;
    width: 70px;
    position: absolute;
    top: 0;
    white-space: nowrap;
    word-break: keep-all;
  }
  .login-form input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 10px 12px 75px;
  }

  .btn {
    display: block;
    color: #fff;
    font-size: 1.0625rem;
    text-align: center;
    padding 0
    background-color: #ff8200;
    border: 1px solid #e86b0f;
    border-radius: 3px;
  }
  .login-btn {
    line-height:43px;
    margin: 20px 16px 15px;
  }
  .login-btn:active {
    background-color: #c67827;
  }
  .third-part-login {
    font-size:.875rem;
    text-align: center;
    margin-top: 27px;
  }
  .third-part-login a {
    color: #7c7c7c;
  }

  .third-part-login a:active, footer a:active {
    background-color: #5bb4da;
  }
  .other-options {
    font-size:.875rem;
    text-align: center;
    margin-top: 20px;
  }
  .other-options a:first-of-type {
    margin-right: 30px;
    position: relative;
  }
  .other-options a:first-of-type:after {
    content: ' ';
    width:1px;
    height: 100%;
    background-color: #c8c8c8;
    position: absolute;
    top: 0;
    right: -15px;
  }

</style>
