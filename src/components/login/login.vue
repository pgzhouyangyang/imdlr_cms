<template lang="html">
    <div class="container">
        <div class="login">
            <div class="login-wrap">
                <h2 class="login-title">电力职业鉴定学习管理平台</h2>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0" class="loginForm" show-message>
                  <el-form-item  prop="loginName">
                    <el-input  auto-complete="off" v-model="loginForm.loginName" placeholder="用户名"></el-input>
                  </el-form-item>
                  <el-form-item  prop="password">
                    <el-input  auto-complete="off" v-model="loginForm.password" :type="inputType" placeholder="密码" :maxlength="15" ></el-input>
                    <!-- <el-switch
                      v-model="switchValue"
                      active-color="#3190e8"
                      inactive-color="#dcdfe6"
                      >
                    </el-switch> -->
                    <i :class="eyes" id="eyes" @click="switchEvent"></i>
                  </el-form-item>
                  <el-form-item>
                    <el-button :loading="submiting" type="primary" @click="submitForm('loginForm')">{{submitBtnText}}</el-button>
                  </el-form-item>
              </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "@/api/getData"
import { isvalidPwd } from "@/assets/js/validate"
export default {
    data() {
        return {
            loginForm: {
                loginName: "admin",
                password: "123456"
            },
            rules: {
                loginName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: isvalidPwd, trigger: 'blur' },
                ],

            },
            showPassword: false,
            submiting: false,
            submitBtnText: "登录"
        }
    },
    created() {

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.submiting = true;
                  this.submitBtnText = "正在登录";
                  login({
                    param:this.loginForm
                    }).then((data)=> {
                    if(data.data.sessionKey) {
                        this.$store.commit("setSession",data.data.sessionKey);
                        this.$store.commit("setAdminName",data.data.adminInfo.name);
                        if(this.$route.query.redirect) {
                            this.$router.replace({
                                path: this.$route.query.redirect
                            })
                        } else {

                            this.$router.replace({
                                path: "/home"
                            })
                        }

                    } else  {
                        switch (data.data.errcode) {
                            case 60104:
                                this.$message.error("用户不存在");
                                break;
                            case 60105:
                                this.$message.error(data.data.errmsg);
                                break;
                        };
                        this.submiting = false;
                        this.submitBtnText = "登录";
                    }
                }).catch((data)=> {
                    this.submiting = false;
                    this.submitBtnText = "登录";
                })
              } else {
                return false;
              }
          });
      },
      switchEvent() {
          this.showPassword = !this.showPassword
      }
    },
    computed: {
        inputType() {
            return this.showPassword?"text":"password"
        },
        eyes() {
            return this.showPassword?"iconfont open-eyes":"iconfont close-eyes"
        }
    }

}
</script>

<style lang="css">
    .login {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url(/static/img/bg.jpg) center -130px no-repeat;
    }
    .login-wrap {
        width: 350px;
        padding: 40px 40px 20px;
        background-color: rgba(20,25,36,0.8);
    }
    .login-wrap form {
        width: 300px;
        margin: auto;
    }
    .login-title {
        margin-bottom: 40px;
        text-align: center;
        font-size: 25px;
        font-weight: normal;
        font-size: 26px;
        color: #fff;
    }
    .login-wrap .el-button {
        width: 100%
    }
    .login-wrap .el-switch {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    #eyes {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        color: #000;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
    }
</style>
