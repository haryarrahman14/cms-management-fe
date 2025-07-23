<template>
  <v-container>
    <BaseBreadcrumb
      :items="[
        { text: 'CONSENT RECORD', active: false },
        { text: 'CONSENT USER LIST', active: true },
      ]"
    />
    <v-row v-if="error?.message">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ error.message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <BaseButton @click="addNewConsent">Tambah User Consent</BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <BaseInput v-model="filters.startDate" label="Tanggal awal" type="date" />
      </v-col>
      <v-col cols="3">
        <BaseInput v-model="filters.endDate" label="Tanggal Akhir" type="date" />
      </v-col>
      <v-col cols="3">
        <BaseInput v-model="filters.cif" label="CIF" />
      </v-col>
      <v-col cols="3">
        <BaseInputSelect
          v-model="filters.status"
          label="Status"
          :items="statusList"
          item-title="name"
          item-value="id"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex">
        <BaseButton @click="searchRecords">Cari</BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="overflow-x-auto">
        <BaseTable
          :headers="tableHeaders"
          :items="data"
          :loading="isLoading"
          :show-detail="true"
          :show-edit="true"
          @detail="viewDetail"
          @edit="editRecord"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'
import { ConsentRecordListTableHeaderStruct } from './structs/ConsentRecordListStruct'
import Lazy from '@/plugins/Lazy'

const router = useRouter()
const route = useRoute()

const filters = reactive({
  startDate: '',
  endDate: '',
  cif: '',
  status: '',
})
const appliedFilters = ref({
  startDate: '',
  endDate: '',
  cif: '',
  status: '',
})

onMounted(() => {
  Object.assign(filters, route.query)
  appliedFilters.value = { ...appliedFilters.value, ...route.query }
})

const headers = new ConsentRecordListTableHeaderStruct()
const tableHeaders = Object.entries(headers).map(([key, label]) => ({
  text: label,
  value: key,
  class: 'text-white font-weight-bold text-no-wrap',
}))
const { data: statusList } = ConsentSubmissionService.useGetConsentRecordStatusList()
const { data, error, isLoading } = ConsentSubmissionService.useGetConsentSubmissions(
  computed(() => appliedFilters.value),
  { enabled: computed(() => statusList.value.length > 0) },
  async (data) =>
    await Promise.all(
      data.map(async (item) => {
        const tableData = await Lazy.transform(item, new ConsentRecordListTableHeaderStruct())
        return {
          ...tableData,
          id: item.id,
          title: item.consentForm.title,
          status: statusList.value.find((status) => status.id === item.status)?.name,
        }
      }),
    ),
)
const searchRecords = () => {
  appliedFilters.value = { ...appliedFilters.value, ...filters }
  router.replace({
    query: {
      ...route.query,
      ...filters,
    },
  })
}
const addNewConsent = () => router.push({ name: 'consent-records-create', query: route.query })
const viewDetail = (record) =>
  router.push({ name: 'consent-records-detail', params: { id: record.id }, query: route.query })
const editRecord = (record) =>
  router.push({ name: 'consent-records-edit', params: { id: record.id }, query: route.query })
</script>
