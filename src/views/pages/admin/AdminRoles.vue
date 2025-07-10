<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'ADMIN', to: '/admin', active: true },
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
        <BaseTable :headers="tableHeaders" :items="roleItems" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// import BasePopup from '@/components/BasePopup.vue'
// import BaseInput from '@/components/BaseInput.vue'
import BaseToggle from '@/components/BaseToggle.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'

const router = useRouter()

const tableHeaders = [
  { text: 'No', value: 'no' },
  { text: 'Nama', value: 'name' },
  { text: 'Dibuat oleh', value: 'createdBy' },
  { text: 'Tanggal Dibuat', value: 'createdAt' },
  { text: 'Status', value: 'status' },
]

const roleItems = [
  {
    no: 1,
    name: 'Admin',
    createdBy: 'RISKA KRISTIANA',
    createdAt: '21/04/2025 16:54:43',
    status: 1,
  },
  {
    no: 2,
    name: 'Agent',
    createdBy: 'STEFANI MEGA',
    createdAt: '17/04/2025 12:06:31',
    status: 1,
  },
]

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
    name: 'TemplateDetail',
  })
}
</script>
