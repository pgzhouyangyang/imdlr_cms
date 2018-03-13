<template>
  <div id="app">
      <div class="header">
          <div class="logo">
              <img src="../static/images/logo.png" alt="" height="61">
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-header"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            mode="horizontal"
            router
            @select="menuSelect"
            >
            <el-submenu index="account">
                <template slot="title">账号管理</template>
                <el-menu-item index="authstr" :route="{name:'Authstr', params: {breadNumber:2,name:'待审核列表' }}">待审核列表</el-menu-item>
                <el-menu-item index="audited">已审核列表</el-menu-item>
                <el-menu-item index="prepaid">已支付列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="quesBank">
                题库管理
            </el-menu-item>
            <el-menu-item index="3">
                消息管理
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">附件管理</template>
                <el-menu-item index="4-1">鉴定公告</el-menu-item>
                <el-menu-item index="4-2">法律法规</el-menu-item>
                <el-menu-item index="4-3">实操规范</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">系统管理</template>
                <el-menu-item index="5-1">字典表</el-menu-item>
                <el-menu-item index="5-2">后台管理员</el-menu-item>
            </el-submenu>

          </el-menu>
          <div class="user">
              <span class="username">周洋洋</span>
              <router-link to="/login" class="exitBtn">退出</router-link>
          </div>
      </div>
      <div class="source">
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadList" :key="item.name">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>


      <div class="main">
        <router-view/>
      </div>
  </div>
</template>

<script>
import { mapName }from "./assets/js/map.js"
export default {
  name: 'App',
  data() {
      return {
         activeIndex: "authstr",
      }

  },
  computed: {
     breadList() {
         return this.$store.state.breadListState
     }
  },
  created() {

  },
  methods: {
      menuSelect(index,indexPath) {
        this.activeIndex = index
        console.log(indexPath);
        indexPath.map((item)=> {
            console.log(mapName(item));
        })
      },
      getBreadcrumb() {
        // var breadNumber= typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1;//默认为1
        // var newBread={name:this.$route.meta.name,path:this.$route.fullPath};//当前页面的
        // var breadList=this.$store.state.breadListState;//获取breadList数组
        // // console.log(breadList);
        // breadList.splice(breadNumber,breadList.length-breadNumber,newBread);
        // // console.log(breadList);
        // this.$store.commit('breadListMutations',breadList);
    }
  },
  watch: {
      $route (newVal,oldVal) {
          this.activeIndex = newVal.path.substring(1)
          // this.getBreadcrumb()
          // console.log(this.$route);
     }
  }
}
</script>

<style>
    html, body{
        height: 100%;
        overflow: hidden;
    }
    body {
        max-width: 1140px;
        min-width: 800px;
        margin: 0 auto;
        font-size: 14px;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        font-weight: 400;
    }
    a {
        color: #fff;
    }
    a:hover {
        color: #09c
    }
    #app {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .header {
        display: flex;
        justify-content: space-around;
        background: #545c64
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
    .el-menu-header {
        /* padding-left: 200px; */
    }
    .source {
        padding: 20px 0;
    }
    .main {
        padding: 20px 0;
        /* padding-bottom: 20px; */
        box-sizing: border-box;
        flex: 1;
        overflow: hidden;
    }
    .container {
        height: 100%;
        overflow: hidden;
    }
    /* .table-header, .table-footer {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .table-wrapp {
        margin-top: 20px;
        flex: 1;
        overflow: hidden;
    }
    .table-footer {
        padding-bottom: 20px;
    }
    .table-th th {

    }
    .el-pagination {
        margin-top: 4px;
    } */
</style>
