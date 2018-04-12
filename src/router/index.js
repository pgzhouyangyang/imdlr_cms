import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// 登录
import Login from '@/components/login/login'

// 默认首页
import Home from '@/components/home/home'

// 账号管理
import Account from '@/components/account/account'
import Authstr from '@/components/account/authstr'
// import Audited from '@/components/account/audited'
import Prepaid from '@/components/account/prepaid'
import Learning from '@/components/account/learnsituation'
// 题库管理
import QuesBank from '@/components/quesBank/quesBank'
// 消息管理
import Info from '@/components/information/information'
// 附件管理
import Attachment from '@/components/attachment/attachment'
import Skillnotice from '@/components/attachment/skillnotice'
import Laws from '@/components/attachment/laws'
import Standard from '@/components/attachment/standard'
// 系统管理
import System from '@/components/system/system'
import Dictionary from '@/components/system/dictionary'
import Admin from '@/components/system/administrator'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true
        },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
        path: '/account',
        meta: {
            name: '账号管理',
            requireAuth: true
        },
        component: Account,
        children: [
            {
                path: '',
                redirect: 'authstr'
            },
            {
                path: 'authstr',
                name: 'Authstr',
                meta: {
                    name: '待审核列表',
                    requireAuth: true
                },
                component: Authstr
            },

            {
                path: 'prepaid',
                name: 'Prepaid',
                meta: {
                    name: '已支付列表',
                    requireAuth: true
                },
                component: Prepaid
            },
            {
                path: 'learning',
                name: 'Learning',
                meta: {
                    name: '学习情况',
                    requireAuth: true
                },
                component: Learning
            },
        ]
    },
    {
      path: '/quesBank',
      name: 'QuesBank',
      meta: {
          name: "题库管理",
          requireAuth: true
      },
      component: QuesBank
    },
    {
      path: '/information',
      name: 'Info',
      meta: {
          name: "消息管理",
          requireAuth: true
      },
      component: Info
    },
    {
        path: '/attachment',
        meta: {
            name: '附件管理',
            requireAuth: true
        },
        component:Attachment,
        children: [
            {
                path: '',
                redirect: 'skillnotice'
            },
            {
                path: 'skillnotice',
                name: 'Skillnotice',
                meta: {
                    name: '鉴定公告',
                    requireAuth: true
                },
                component: Skillnotice
            },
            {
                path: 'laws',
                name: 'Laws',
                meta: {
                    name: '法律法规',
                    requireAuth: true
                },
                component: Laws
            },
            {
                path: 'standard',
                name: 'Standard',
                meta: {
                    name: '实操规范',
                    requireAuth: true
                },
                component: Standard
            }
        ]
    },
    {
        path: '/system',
        meta: {
            name: '系统管理',
            requireAuth: true
        },
        component:System,
        children: [
            {
                path: '',
                redirect: 'dictionary'
            },
            {
                path: 'dictionary',
                name: 'Dictionary',
                meta: {
                    name: '字典表',
                    requireAuth: true
                },
                component: Dictionary
            },
            {
                path: 'administrator',
                name: 'Admin',
                meta: {
                    name: '后台管理员',
                    requireAuth: true
                },
                component: Admin
            }
        ]
    }

  ]
})
router.beforeEach((to, from, next) => {

    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.session_key) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

export default router
