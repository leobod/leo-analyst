import { createRouter, createWebHashHistory } from 'vue-router'

import CustomDragFrame from '../layouts/CustomDragFrame/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: CustomDragFrame,
      redirect: '/Home',
      meta: {},
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: () => import('../views/Home/Home.vue'),
          meta: {
            title: '首页'
          }
        }
      ]
    },
    {
      path: '/Analyser',
      component: CustomDragFrame,
      redirect: '/Analyser/PkgAnalyser',
      meta: {},
      children: [
        {
          path: 'PkgAnalyser',
          name: 'PkgAnalyser',
          component: () => import('../views/Analyser/PkgAnalyser.vue'),
          meta: {
            title: 'Package分析器'
          }
        },
        {
          path: 'PageAnalyser',
          name: 'PageAnalyser',
          component: () => import('../views/Analyser/PageAnalyser.vue'),
          meta: {
            title: '页面分析器'
          }
        },
        {
          path: 'I18nCollector',
          name: 'I18nCollector',
          component: () => import('../views/Analyser/I18nCollector.vue'),
          meta: {
            title: '多语言搜集器'
          }
        }
      ]
    }
  ]
})

export default router
