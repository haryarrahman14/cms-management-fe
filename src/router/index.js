import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import admin from './admin'
import approval from './approval'
import consent from './consent'
import notHaveAccess from './notHaveAccess'

let menus = []
menus = menus.concat(home, admin, approval, consent, notHaveAccess)

const routes = [...menus]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
