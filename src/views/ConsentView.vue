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
        <BaseTable :headers="tableHeaders" :items="templateItems" :loading="isLoading" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import TemplatesService from '@/usecases/TemplatesService'
import { GetTemplateRequest } from '@/structs/networks/request/GetTemplateRequest'
import Format from '@/plugins/Format'

const router = useRouter()
const route = useRoute()

const searchForm = reactive(new GetTemplateRequest())
const appliedFilters = reactive(new GetTemplateRequest())

onMounted(() => {
  Object.assign(searchForm, route.query)
  Object.assign(appliedFilters, route.query)
})

watch(
  () => route.query,
  (newQuery) => {
    Object.assign(searchForm, newQuery)
    Object.assign(appliedFilters, newQuery)
  },
)

watch(
  () => searchForm.templateName,
  (val) => {
    searchForm.isGetAll = !val
  },
)

const tableHeaders = [
  { text: 'No', value: 'no' },
  { text: 'Nama Template', value: 'title' },
  { text: 'Version', value: 'version' },
  { text: 'Tanggal Dibuat', value: 'createdDate' },
  { text: 'Dibuat oleh', value: 'createdBy' },
]

const { data: templates, isLoading } = TemplatesService.useGetTemplates(
  computed(() => appliedFilters),
  {
    enabled: computed(() => true),
  },
)

const templateItems = computed(() => {
  if (!templates.value) return []

  return templates.value.map((item) => ({
    ...item,
    createdDate: Format.dateLong(item.createdDate || item.createdAt),
  }))
})

const showPopup = ref(false)

const submitForm = () => {
  showPopup.value = false
  router.push({
    name: 'TemplateDetail',
  })
}

const searchTemplate = () => {
  Object.assign(appliedFilters, searchForm)
  router.replace({
    query: {
      ...route.query,
      ...searchForm,
    },
  })
}
</script>
