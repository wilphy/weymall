<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack" />
      <div class="login-panel">
        <van-field
          v-model="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          :error-message="usernameErrorMsg"
          @click-icon="username = ''" />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          icon="clear"
          required
          :error-message="passwordErrorMsg"
          @click-icon="password = ''" />
        <div class="login-button">
          <van-button
            type="primary"
            size="large"
            :loading="openLoading"
            @click="loginAction">登录</van-button>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'

  export default {
    data () {
      return {
        username: '',
        password: '',
        openLoading: false,    //是否开启用户登录的loading状态
        usernameErrorMsg: '',  //当用户名出现错误的时候
        passwordErrorMsg: '',  //当密码出现错误的时候
      }
    },
    created() {
      if(localStorage.userInfo) {
        Toast.success('您已经登录');
        this.$router.push('/');
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },

      loginAction() {
        this.checkForm() && this.axiosLoginUser();
      },

      axiosLoginUser() {
        //先把按钮进行loading状态，防止重复提交
        this.openLoading = true;
        
        axios({
          url: url.loginUser,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
        .then(response => {
          
          console.log(response)

          if(response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username}
              setTimeout(() => {
                  resolve()
              }, 500)
            }).then(() => {
              Toast.success('登录成功')
              this.$router.push('/')
            }).catch(err => {
              Toast.fail('登录状态保存失败')
              console.log(err)
            })
          } else {
            console.log(response.data.message);
            Toast.fail('登录失败');
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail('登录失败');
          this.openLoading = false;
        })
      },

      //表单验证
      checkForm() {
        let isOk = true;
        if(this.username.length < 5) {
          this.usernameErrorMsg = '用户名不能小于5位';
          isOk = false;
        } else {
          this.usernameErrorMsg = '';
        }

        if(this.password.length < 6) {
          this.passwordErrorMsg = '密码不能小于6位';
          isOk = false;
        } else {
          this.passwordErrorMsg = '';
        }

        return isOk;
      }
    }
  }
</script>

<style scoped>
  .login-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom: 50px;
    padding-top: 20px;
  }
  .login-button{
    padding-top:30px;
  }
</style>