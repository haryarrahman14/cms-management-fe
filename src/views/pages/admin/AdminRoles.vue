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
          :editAction="true"
          editRoute="AdminRolesEdit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

const roleItems = ref([])

onMounted(() => {
  getRoles()
})

const getRoles = async () => {
  const response = await RolesService.getRoles()
  if (response.code === 200) {
    roleItems.value = response.data.map((item) => ({
      ...item,
      createdDate: Format.dateLong(item.createdDate || item.createdAt),
    }))
  }
}

const showPopup = ref(false)

const form = ref({
  name: '',
  type: '',
  isRequired: false,
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  showPopup.value = false
  router.push({
    name: 'AdminRolesCreate',
  })
}
</script>
