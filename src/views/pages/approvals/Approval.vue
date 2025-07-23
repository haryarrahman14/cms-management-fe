<template>
  <v-container>
    <BaseBreadcrumb :items="[{ text: 'Persetujuan', active: false }]" />
    <v-row v-if="error?.message">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ error.message }}
        </v-alert>
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
        <BaseInputSelect
          :items="approvalTypesList"
          v-model="filters.approvalType"
          label="Tipe Approval"
          item-title="description"
          item-value="type"
        />
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
    <v-row no-gutters class="mb-6">
      <v-col cols="12" class="d-flex">
        <BaseButton @click="search">Cari</BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="overflow-x-auto">
        <BaseTable
          :headers="tableHeaders"
          :items="data"
          :loading="isLoading"
          :show-detail="true"
          :show-edit="false"
          @detail="handleDetailClick"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import ApprovalListTableHeaderStruct from './structs/ApprovalListTableHeaderStruct'
import GetApprovalListRequest from '@/structs/networks/request/GetApprovalListRequest'
import ApprovalsService from '@/usecases/ApprovalsService'
import { formatDate } from '@/plugins/DateUtil'

const filters = reactive(new GetApprovalListRequest())
const router = useRouter()

const { data: approvalTypesList } = ApprovalsService.useGetMasterApprovalTypesList()
const { data: statusList } = ApprovalsService.useGetApprovalStatusList()
const { data, error, isLoading } = ApprovalsService.useGetApprovalsList(
  filters,
  { enabled: computed(() => approvalTypesList.value.length > 0) },
  (data) =>
    data.map((item) => ({
      ...item,
      createdDate: formatDate(item.createdDate),
      typeApproval: approvalTypesList.value.find((typeItem) => typeItem.type === item.typeApproval)
        ?.description,
      status: statusList.value.find((status) => status.id === item.status)?.name,
      approvedDate: formatDate(item.approvedDate),
    })),
)

const tableHeaders = Object.entries(new ApprovalListTableHeaderStruct()).map(([key, label]) => ({
  text: label,
  value: key,
  class: 'text-white font-weight-bold text-no-wrap',
}))

const handleDetailClick = (item) => {
  router.push({
    name: 'ApprovalDetail',
    params: { id: item.approvalRequestId },
  })
}
</script>
