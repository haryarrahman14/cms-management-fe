import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TemplateDetail from '@/views/pages/content/ContentTemplateDetail.vue'
import ConsentView from '../views/ConsentView.vue'
import ConsentRecordList from '@/views/pages/consent_records/ConsentRecordList.vue'
import ConsentRecordCreate from '@/views/pages/consent_records/ConsentRecordCreate.vue'
import ConsentRecordDetail from '@/views/pages/consent_records/ConsentRecordDetail.vue'
import ConsentRecordEdit from '@/views/pages/consent_records/ConsentRecordEdit.vue'
import AdminRoles from '@/views/pages/admin/AdminRoles.vue'
import AdminRolesCreate from '@/views/pages/admin/AdminRolesCreate.vue'
import AdminUsers from '@/views/pages/admin/AdminUsers.vue'
import AdminChannels from '@/views/pages/admin/AdminChannels.vue'
import AdminUsersCreate from '@/views/pages/admin/AdminUsersCreate.vue'
import AdminChannelsCreate from '@/views/pages/admin/AdminChannelsCreate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/consent-records',
    name: 'consent-records',
    component: ConsentRecordList,
  },
  {
    path: '/consent-records/create',
    name: 'consent-records-create',
    component: ConsentRecordCreate,
  },
  {
    path: '/consent-records/detail/:id',
    name: 'consent-records-detail',
    component: ConsentRecordDetail,
  },
  {
    path: '/consent-records/edit/:id',
    name: 'consent-records-edit',
    component: ConsentRecordEdit,
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
    path: '/admin/roles',
    name: 'AdminRoles',
    component: AdminRoles,
  },
  {
    path: '/admin/roles/create',
    name: 'AdminRolesCreate',
    component: AdminRolesCreate,
  },
  {
    path: '/admin/roles/edit/:id',
    name: 'AdminRolesEdit',
    component: AdminRolesCreate,
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
  },
  {
    path: '/admin/channel',
    name: 'AdminChannels',
    component: AdminChannels,
  },
  {
    path: '/admin/users/create',
    name: 'AdminUsersCreate',
    component: AdminUsersCreate,
  },
  {
    path: '/admin/users/create-channel',
    name: 'AdminChannelsCreate',
    component: AdminChannelsCreate,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
