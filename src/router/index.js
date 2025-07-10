import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TemplateDetail from '@/views/pages/content/ContentTemplateDetail.vue'
import ConsentView from '../views/ConsentView.vue'
import AdminRoles from '@/views/pages/admin/AdminRoles.vue'
import AdminUsers from '@/views/pages/admin/AdminUsers.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/consent',
    name: 'consent',
    component: ConsentView,
  },
  {
    path: '/consent/template-detail',
    name: 'TemplateDetail',
    component: TemplateDetail,
  },
  {
    path: '/admin',
    name: 'AdminRoles',
    component: AdminRoles,
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
