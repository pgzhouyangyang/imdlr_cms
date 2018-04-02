<template lang="html">
    <div class="header">
        <!-- logo -->
        <div class="logo">
            <img src="../../../static/images/logo.png" alt="" height="61">
        </div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-header"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          mode="horizontal"
          router
          >
          <el-submenu index="account">
              <template slot="title">账号管理</template>
              <el-menu-item index="authstr" :route="{path:'/account/authstr'}">待审核列表</el-menu-item>

              <el-menu-item index="prepaid" :route="{path:'/account/prepaid'}">已支付列表</el-menu-item>
              <el-menu-item index="learning" :route="{path:'/account/learning'}">学习情况</el-menu-item>
          </el-submenu>
          <el-menu-item index="quesBank" :route="{path:'/quesBank'}">
              题库管理
          </el-menu-item>
          <el-menu-item index="information" :route="{path:'/information'}">
              消息管理
          </el-menu-item>
          <el-submenu index="attachment">
              <template slot="title">附件管理</template>
              <el-menu-item index="skillnotice" :route="{path:'/attachment/skillnotice'}">鉴定公告</el-menu-item>
              <el-menu-item index="laws" :route="{path:'/attachment/laws'}">法律法规</el-menu-item>
              <el-menu-item index="standard" :route="{path:'/attachment/standard'}">实操规范</el-menu-item>
          </el-submenu>
          <el-submenu index="system">
              <template slot="title">系统管理</template>
              <el-menu-item index="dictionary" :route="{path:'/system/dictionary'}">字典表</el-menu-item>
              <el-menu-item index="administrator" :route="{path:'/system/administrator'}">后台管理员</el-menu-item>
          </el-submenu>

        </el-menu>
        <!-- 登录/退出 -->
        <div class="user">
            <span class="username">周洋洋</span>
            <a class="exitBtn" @click="exitBtn">退出</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: ""
        }
    },
    created() {
        this.activeIndex = this.$route.path.substring(this.$route.path.lastIndexOf("/")+1);
    },
    watch: {
        $route (newVal,oldVal) {
            this.activeIndex = newVal.path.substring(newVal.path.lastIndexOf("/")+1);
       }
    },
    methods: {
        exitBtn() {
            this.$store.commit("clearSession")
            this.$router.replace({
                path: "/login"
            })

        }
    }

}
</script>

<style lang="css">
    .header {
        display: flex;
        justify-content: space-around;
        background: #545c64;
        min-width: 768px
    }
    .logo, .user {
        display: flex;
        align-items: center;
    }
    .username {
        color: #fff;
        padding: 0 5px;
        border-right: 1px solid #fff
    }
    .exitBtn {
        padding: 0 5px;
    }
</style>
