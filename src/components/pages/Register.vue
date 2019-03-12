<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack" />
      <div class="register-panel">
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
        <div class="register-button">
          <van-button
            type="primary"
            size="large"
            :loading="openLoading"
            @click="registerAction">马上注册</van-button>
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
        openLoading: false,    //是否开启用户注册的loading状态
        usernameErrorMsg: '',  //当用户名出现错误的时候
        passwordErrorMsg: '',  //当密码出现错误的时候
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },

      registerAction() {
        this.checkForm() && this.axiosRegisterUser();
      },

      axiosRegisterUser() {
        this.openLoading = true;
        axios({
          url: url.registerUser,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
        .then(response => {
          console.log(response)
          if(response.data.code == 200) {
            Toast.success(response.data.message);
            this.$router.push('/');
          } else {
            console.log(response.data.message);
            Toast.fail('注册失败');
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail('注册失败');
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
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom: 50px;
    padding-top: 20px;
  }
  .register-button{
    padding-top:30px;
  }
</style>