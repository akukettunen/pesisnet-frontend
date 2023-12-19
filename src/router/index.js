// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Games',
        component: () => import('@/views/Games.vue'),
      },
    ],
  },
  {
    path: '/news',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'News',
        component: () => import('@/views/News.vue'),
        meta: {
          show_news_bar: true
        }
      },
    ],
  },
  {
    path: '/stats',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Data',
        component: () => import('@/views/Data.vue'),
        meta: {
          show_news_bar: false
        }
      },
    ],
  },
  {
    path: '/games/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Game',
        component: () => import('@/views/Game.vue'),
        meta: {
          show_news_bar: false
        }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
