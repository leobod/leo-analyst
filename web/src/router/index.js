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
      meta: {},
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: {}
        },
        {
          path: 'PkgVersion',
          name: 'PkgVersion',
          component: () => import('../views/PkgVersion.vue'),
          meta: {}
        }
      ]
    }
  ]
})

export default router
