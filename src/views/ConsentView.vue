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

    <v-row class="mb-4">
      <v-col cols="4">
        <BaseInput v-model="searchForm.templateName" label="Cari Template" />
      </v-col>
      <v-col cols="4" class="d-flex">
        <BaseButton @click="searchTemplate">Cari</BaseButton>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <BaseTable :headers="tableHeaders" :items="templateItems" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import TemplatesService from '@/usecases/TemplatesService'
import { GetTemplateRequest } from '@/structs/networks/request/GetTemplateRequest'
import Format from '@/plugins/Format'

const router = useRouter()

const searchForm = ref(new GetTemplateRequest())

onMounted(() => {
  searchTemplate()
})

watch(
  () => searchForm.value.templateName,
  (val) => {
    searchForm.value.isGetAll = !val
  },
)

const tableHeaders = [
  { text: 'No', value: 'no' },
  { text: 'Nama Template', value: 'title' },
  { text: 'Version', value: 'version' },
  { text: 'Tanggal Dibuat', value: 'createdDate' },
  { text: 'Dibuat oleh', value: 'createdBy' },
]

const templateItems = ref([])

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

const searchTemplate = async () => {
  const response = await TemplatesService.getTemplates(searchForm.value)
  if (response.code === 200) {
    templateItems.value = response.data.map((item) => ({
      ...item,
      createdDate: Format.dateLong(item.createdDate || item.createdAt),
    }))
  }
}
</script>
