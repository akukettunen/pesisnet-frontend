// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/games',
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
          show_data_bar: true,
        }
      },
      {
        path: 'standings',
        name: 'Standings',
        component: () => import('@/views/data/Standings.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'scores',
        name: 'Scores',
        component: () => import('@/views/data/Scores.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'player-cards',
        name: 'PlayerCards',
        component: () => import('@/views/Data.vue'),
        meta: {
          show_data_bar: true,
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

router.beforeEach((to, from) => {
  if(to.path === '/') return { path: '/games' }
  if(to.path === '/stats') return { path: '/stats/player-cards' }
})

export default router
