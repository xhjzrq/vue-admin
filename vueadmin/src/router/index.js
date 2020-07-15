import Vue from 'vue'
import VueRouter from 'vue-router'
//引入布局组件
import Layout  from '@/views/layout/index'
Vue.use(VueRouter)
/**
 *
 * 避免相同名字报错
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: "login",
        meta: {
            name: "主页"
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            name: "登录"
        },
        component: () => import('../views/login/index')

    },
    {
        path: '/console',
        name: 'Console',
        redirect: "index",
        meta: {
            name: "控制台"
        },
        component: Layout,
        children: [{
            path: '/index',
            name: '/Index',
            meta: {
                name: "首页"
            },
            component: () => import('../views/console/index')
        }]
    },
  /**
   * 信息管理
   */
  {
        path: '/info',
        name: 'Info',
        meta: {
            name: "信息管理"
        },
        component: Layout,
        children: [{
            path: '/InfoIndex',
            name: '/InfoIndex',
            meta: {
                name: "信息列表"
            },
            component: () => import('../views/info/InfoIndex')
        },
            {
                path: '/infoCategory',
                name: '/InfoCategory',
                meta: {
                    name: "信息分类"
                },
                component: () => import('../views/info/InfoCategory')
            }
        ]
    },
  /**
   * 用户管理
   */

  {
    path: '/info',
    name: 'Info',
    meta: {
      name: "用户管理"
    },
    component: Layout,
    children: [{
      path: '/userIndex',
      name: '/UserIndex',
      meta: {
        name: "用户列表"
      },
      component: () => import('../views/user/UserIndex')
    },

    ]
  }


]

const router = new VueRouter({
    routes
})

export default router
