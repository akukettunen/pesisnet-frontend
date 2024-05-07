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
        meta: {
          index: 0,
          transition: 'slide'
        }
      },
    ],
  },
  {
    path: '/privacy',
    component: () => import('@/views/Privacy.vue'),
  },
  {
    path: '/news',
    component: () => import('@/layouts/NewsLayout.vue'),
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
        path: 'runs',
        name: 'Ruuns',
        component: () => import('@/views/data/Runs.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'hps-by-base',
        name: 'Hps',
        component: () => import('@/views/data/HpsByBase.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'karkilyonnit',
        name: 'Runs',
        component: () => import('@/views/data/Karkilyonnit.vue'),
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
      {
        path: 'pitchers',
        name: 'Pitchers',
        component: () => import('@/views/data/Pitchers.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'pitchers',
        name: 'Pitchers',
        component: () => import('@/views/data/Pitchers.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'fitness',
        name: 'Fitness',
        component: () => import('@/views/data/Pitchers.vue'),
        meta: {
          show_data_bar: true,
        }
      },
      {
        path: 'top-runners',
        name: 'TopRunners',
        component: () => import('@/views/data/TopRunners.vue'),
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
          show_news_bar: false,
          index: 1,
          transition: 'slide',
          backButton: true
        }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const toIndex = to.meta.index || 0;

  const fromIndex = from.meta.index || 0;
  const direction = toIndex > fromIndex ? 'right' : 'left';
  to.meta.transitionName = direction === 'right' ? 'slide-right' : 'slide-left';

  if(to.path === '/') return next({ path: '/games' })
  if(to.path === '/stats') return next({ path: '/stats/player-cards' })
  next();
})

export default router
