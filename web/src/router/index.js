import { createRouter, createWebHistory } from 'vue-router'

import CustomDragFrame from '../layouts/CustomDragFrame/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/',
      component: CustomDragFrame,
      hidden: false, // 是否隐藏
      redirect: '/Home',
      alwaysShow: false, // 是否显示根节点路由
      meta: {
        title: '',
        icon: 'home'
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/Home.vue'),
          meta: {
            title: '',
            icon: 'home',
            affix: true, // 是否固定标签页
            noCache: false // 是否会被<keep-alive>缓存 true会 false 不会
          }
        }
      ]
    }
  ]
})

export default router
