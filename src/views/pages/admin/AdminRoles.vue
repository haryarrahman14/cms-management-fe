<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'ADMIN', to: '/admin/roles', active: true },
        { text: 'ROLES', active: false },
      ]"
    />

    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-start">
        <BaseButton @click="submitForm">Buat Roles</BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable
          :headers="tableHeaders"
          :items="roleItems"
          :loading="isLoading"
          :editAction="true"
          editRoute="AdminRolesEdit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import RolesService from '@/usecases/RolesService'
import Format from '@/plugins/Format'

const router = useRouter()

const tableHeaders = [
  { text: 'No', value: 'id' },
  { text: 'Nama', value: 'roleName' },
  { text: 'Dibuat oleh', value: 'createdBy' },
  { text: 'Tanggal Dibuat', value: 'createdDate' },
]

const { data: roles, isLoading } = RolesService.useGetRoles()
const roleItems = computed(() => {
  if (!roles.value) return []

  return roles.value.map((item) => ({
    ...item,
    createdDate: Format.dateLong(item.createdDate || item.createdAt),
  }))
})

const submitForm = () => {
  router.push({
    name: 'AdminRolesCreate',
  })
}
</script>
