import TodoPage from '@/views/TodoPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoPage
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: { name: 'todo' } }
  ]
})

export default router
