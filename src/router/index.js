import Vue from 'vue'
import Router from 'vue-router'

// 账号管理
import Authstr from '@/components/account/authstr'
import Audited from '@/components/account/audited'
import Prepaid from '@/components/account/prepaid'
// 题库管理
import QuesBank from '@/components/quesBank/quesBank'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
     redirect: '/authstr'
    },
    {
      path: '/authstr',
      name: 'Authstr',
      meta: {
          name: "待审核列表"
      },
      component: Authstr
    },
    {
      path: '/audited',
      name: 'Audited',
      meta: {
          name: "已审核列表"
      },
      component: Audited
    },
    {
      path: '/prepaid',
      name: 'Prepaid',
      meta: {
          name: "已支付列表"
      },
      component: Prepaid
    },
    {
      path: '/quesBank',
      name: 'QuesBank',
      meta: {
          name: "题库管理"
      },
      component: QuesBank
    },
  ]
})
