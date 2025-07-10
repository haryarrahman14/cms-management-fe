import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TemplateDetail from '@/views/pages/content/ContentTemplateDetail.vue'
import ConsentView from '../views/ConsentView.vue'
import AdminRoles from '@/views/pages/admin/AdminRoles.vue'
import AdminUsers from '@/views/pages/admin/AdminUsers.vue'
import AdminAgents from '@/views/pages/admin/AdminAgents.vue'
import AdminUsersCreate from '@/views/pages/admin/AdminUsersCreate.vue'
import AdminAgentsCreate from '@/views/pages/admin/AdminAgentsCreate.vue'

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
  {
    path: '/admin/agents',
    name: 'AdminAgents',
    component: AdminAgents,
  },
  {
    path: '/admin/users/create',
    name: 'AdminUsersCreate',
    component: AdminUsersCreate,
  },
  {
    path: '/admin/users/create-agent',
    name: 'AdminAgentsCreate',
    component: AdminAgentsCreate,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
