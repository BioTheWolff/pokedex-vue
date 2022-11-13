import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/pokemon/:name',
      component: () => import('../views/DetailsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not found',
      component: NotFound
    }
  ]
})

export default router
