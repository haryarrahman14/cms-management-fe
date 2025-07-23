<template>
  <v-container>
    <BaseBreadcrumb :items="breadcrumb" />
    <v-row v-if="error?.message">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ error.message }}
        </v-alert>
      </v-col>
    </v-row>
    <app-label
      label="Tipe Persetujuan"
      :value="approvalTypesList.find((item) => item)?.description"
    />
    <app-label label="Tanggal Dibuat" :value="formatDate(data.createdDate)" />
    <app-label label="Dibuat Oleh" :value="data.createdBy" />
    <app-label
      v-if="!isCanBeApprovedOrRejected"
      label="Status Persetujuan"
      :value="statusList.find((status) => status.id === data.status)?.name"
    />
    <app-label
      v-if="!isCanBeApprovedOrRejected && data.status === 3"
      label="Catatan"
      :value="data.notes"
    />
    <v-divider class="mt-4 mb-6" />
    <v-row no-gutters>
      <v-col>
        <component :is="selectedApprovalComponent" :approval-data="data" />
      </v-col>
    </v-row>
    <v-row class="mt-12" no-gutters v-if="isCanBeApprovedOrRejected">
      <v-col cols="7">
        <base-input-select
          v-model="status"
          label="Status"
          :items="statusList"
          item-title="name"
          item-value="id"
        />
      </v-col>
      <v-col v-if="status === 3" cols="7">
        <base-input v-model="notes" label="Catatan" />
      </v-col>
    </v-row>
    <v-row class="mb-4 text-center">
      <v-col cols="12">
        <BaseButton v-if="isCanBeApprovedOrRejected" @click="handleBtnSubmitClick"
          >Simpan</BaseButton
        >
        <BaseButton @click="handleBtnCancelClick" class="ml-2" color="primary">Batal</BaseButton>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLabel from '@/components/AppLabel.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import ApprovalsService from '@/usecases/ApprovalsService'
import { formatDate } from '@/plugins/DateUtil'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import ApprovalCreateTemplateDetail from './ApprovalCreateTemplateDetail.vue'
import ApprovalEditConsentDetail from './ApprovalEditConsentDetail.vue'
import TemplateRecordTable from '@/components/TemplateRecordTable.vue'

const status = ref(null)
const notes = ref(null)
const route = useRoute()
const snackbar = useSnackbarStore()
const router = useRouter()

const breadcrumb = [
  { text: 'Persetujuan', active: true },
  { text: 'Detail', active: true },
]

const approvalTypeComponentList = {
  CREATE_TEMPLATE: ApprovalCreateTemplateDetail,
  EDIT_TEMPLATE: 'ApprovalEditTemplateDetail',
  SUBMIT_CONSENT_BY_BACK_OFFICE: 'ApprovalSubmitConsentDetail',
  EDIT_CONSENT: ApprovalEditConsentDetail,
}

const selectedApprovalComponent = computed(
  () => approvalTypeComponentList[data.value?.typeApproval],
)

const { data: statusList } = ApprovalsService.useGetApprovalStatusList(null, (data) =>
  data.filter((item) => item.id !== 2),
)
const { data: approvalTypesList } = ApprovalsService.useGetMasterApprovalTypesList()
const { data, error, isLoading } = ApprovalsService.useGetApprovalDetail({ id: route.params.id })
const { mutate: rejectApproval, isPending: isRejectLoading } =
  ApprovalsService.useSubmitRejectApproval({
    onSuccess: () => {
      snackbar.open('Persetujuan berhasil ditolak!')
      router.push({ name: 'Approval' })
    },
    onError: (err) => {
      snackbar.open(`Error: ${err.message}`, { color: 'error' })
    },
  })
const { mutate: approveApproval, isPending: isApproveLoading } =
  ApprovalsService.useSubmitApproveApproval({
    onSuccess: () => {
      snackbar.open('Persetujuan berhasil disetujui!')
      router.push({ name: 'Approval' })
    },
    onError: (err) => {
      snackbar.open(`Error: ${err.message}`, { color: 'error' })
    },
  })
const isCanBeApprovedOrRejected = computed(() => data.value.status === 2)

const handleBtnSubmitClick = () => {
  if (status.value === 3) {
    rejectApproval({ id: route.params.id, notes: notes.value })
    return
  }
  approveApproval(route.params.id)
}

const handleBtnCancelClick = () => {
  router.push({ name: 'Approval' })
}
</script>
