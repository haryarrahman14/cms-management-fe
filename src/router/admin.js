import AdminRoles from '@/views/pages/admin/AdminRoles.vue'
import AdminRolesCreate from '@/views/pages/admin/AdminRolesCreate.vue'
import AdminUsers from '@/views/pages/admin/AdminUsers.vue'
import AdminChannels from '@/views/pages/admin/AdminChannels.vue'
import AdminUsersCreate from '@/views/pages/admin/AdminUsersCreate.vue'
import AdminChannelsCreate from '@/views/pages/admin/AdminChannelsCreate.vue'

const admin = [
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

export default admin
