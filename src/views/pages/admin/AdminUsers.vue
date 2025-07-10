<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'CONTENT', to: '/consent', active: true },
        { text: 'TEMPLATE CMS', active: false },
      ]"
    />

    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-start">
        <BaseButton @click="submitForm">Buat Template</BaseButton>
      </v-col>
    </v-row>

    <!-- <BasePopup v-model:show="showPopup" title="Buat Template">
      <v-row dense>
        <v-col cols="12">
          <BaseInput v-model="form.name" label="Judul Template" />
        </v-col>
        <v-col cols="12">
          <BaseInput v-model="form.version" label="Version" />
        </v-col>
        <v-col cols="12">
          <BaseToggle v-model="form.status" label="Status Template" />
        </v-col>
      </v-row>
      <v-row class="mb-4">
        <v-col cols="12" class="d-flex justify-end">
          <BaseButton @click="submitForm">Submit</BaseButton>
          <BaseButton class="ml-2" color="primary" @click="submitForm">Cancel</BaseButton>
        </v-col>
      </v-row>
    </BasePopup> -->

    <v-row>
      <v-col cols="12">
        <BaseTable :headers="tableHeaders" :items="tableItems" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const tableItems = [
  {
    no: 1,
    name: 'RISKA PALMIA',
    createdBy: 'RISKA KRISTIANA',
    createdAt: '21/04/2025 16:54:43',
    status: 1,
  },
  {
    no: 2,
    name: 'ANDIKA WAHYU',
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
