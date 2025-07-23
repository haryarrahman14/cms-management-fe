<template>
  <v-container>
    <BaseBreadcrumb
      :items="[
        { text: 'CONSENT RECORD', active: false },
        { text: 'CONSENT USER LIST', to: '/consent-records', active: false },
        { text: 'TAMBAH USER CONSENT', active: true },
      ]"
    />
    <v-row v-if="submitError?.message">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ submitError.message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-card class="mt-4">
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4 pt-3">Tambah User Consent</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="formValid">
          <v-row dense>
            <v-col cols="12">
              <BaseInput
                v-model="form.submitDate"
                label="Tanggal Persetujuan"
                type="date"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12">
              <BaseInput v-model="form.cif" label="CIF" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12">
              <BaseInput v-model="form.userChannel" label="Nama Nasabah" />
            </v-col>
            <v-col cols="12">
              <BaseInputSelect
                v-model="form.consentFormId"
                label="Consent Template"
                :items="consentTemplates"
                item-title="title"
                item-value="consentFormId"
                :rules="[rules.required]"
                :loading="templatesLoading"
              />
            </v-col>
            <v-col cols="12">
              <BaseInput v-model="form.version" label="Version" readonly />
            </v-col>
            <v-col cols="12">
              <BaseInputSelect
                v-model="form.channel"
                label="Channel"
                :items="channelList"
                item-title="label"
                item-value="value"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12">
              <BaseInputSelect
                v-model="form.status"
                label="Status"
                :items="statusList"
                item-title="name"
                item-value="id"
                disabled
              />
            </v-col>
          </v-row>
          <v-row class="mt-4" v-if="templateDetail?.sections?.length > 0">
            <v-col cols="12">
              <h3 class="text-body-1 font-weight-bold mb-3">Consent</h3>
              <v-card>
                <v-table>
                  <thead>
                    <tr>
                      <th
                        id="consent-section-header"
                        class="text-white font-weight-bold"
                        style="background-color: #004d4d"
                      ></th>
                      <th
                        id="consent-section-value"
                        class="text-white font-weight-bold text-center"
                        style="background-color: #004d4d; width: 200px; min-width: 200px"
                      >
                        <div class="d-flex flex-row justify-center">
                          <span class="flex-grow-1">Ya</span>
                          <span class="flex-grow-1">Tidak</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(section, sectionIndex) in templateDetail.sections"
                      :key="`section-${section.consentSectionId}`"
                    >
                      <td :style="{ paddingLeft: `${getSectionDepth(section)}rem` }">
                        <div>
                          <div class="font-weight-bold">{{ section.header }}</div>
                          <div
                            v-if="section.description"
                            class="text-caption text-grey-darken-1 mt-1"
                            v-html="section.description"
                          ></div>
                        </div>
                      </td>
                      <td class="w-full" style="width: 200px; min-width: 200px">
                        <v-radio-group
                          v-model="form.decisions[sectionIndex].accepted"
                          inline
                          hide-details
                          :rules="[rules.required]"
                        >
                          <span class="w-full flex-grow-1 d-flex justify-center">
                            <v-radio :value="true" color="primary" />
                          </span>
                          <span class="w-full flex-grow-1 d-flex justify-center">
                            <v-radio :value="false" color="primary" />
                          </span>
                        </v-radio-group>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-4">
            <v-col cols="12" class="d-flex justify-end">
              <BaseButton
                :loading="isSubmitting"
                @click="submitForm"
                :disabled="!formValid || isSubmitting"
              >
                Simpan
              </BaseButton>
              <BaseButton class="ml-2" color="grey" variant="outlined" @click="cancel">
                Batal
              </BaseButton>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import TemplatesService from '@/usecases/TemplatesService'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const formValid = ref(false)
const snackbar = useSnackbarStore()
const form = reactive({
  submitDate: null,
  cif: null,
  userChannel: null,
  consentFormId: null,
  version: null,
  channel: null,
  // for submit status is always active
  status: 1,
  decisions: [],
})
const rules = {
  required: (value) => {
    if (Array.isArray(value)) return value.length > 0 || 'Field ini wajib diisi'
    return value !== null || 'Field ini wajib diisi'
  },
}
const { data: statusList } = ConsentSubmissionService.useGetConsentRecordStatusList()
const { data: channelList } = ConsentSubmissionService.useGetConsentRecordChannelList({
  select: (data) => data.map((item) => ({ label: item.name, value: item.id })),
})
const { data: consentTemplates, isLoading: templatesLoading } = TemplatesService.useGetTemplates({
  isGetAll: true,
  templateName: '',
})
const { data: templateDetail } = TemplatesService.useGetTemplateDetail(
  computed(() => form.consentFormId),
  { enabled: computed(() => !!form.consentFormId) },
)
const {
  mutate: submitConsent,
  isPending: isSubmitting,
  error: submitError,
} = ConsentSubmissionService.useSubmitConsentSubmission({
  onSuccess: () => {
    snackbar.open('Data consent berhasil disimpan!')
    router.push({ name: 'consent-records' })
  },
  onError: (err) => {
    snackbar.open(`Error: ${err.message}`, { color: 'error' })
  },
})
const getSectionDepth = ConsentSubmissionService.useGetSectionDepth(
  computed(() => templateDetail.value?.sections || []),
)
watch(
  () => templateDetail.value,
  (newTemplate) => {
    if (newTemplate) {
      form.version = newTemplate.version
      form.decisions = newTemplate.sections.map((section) => ({
        consentSectionId: section.consentSectionId,
        accepted: null,
      }))
    }
  },
  { immediate: true },
)
const submitForm = async () => {
  if (!formRef.value) return
  const { valid } = await formRef.value.validate()
  if (!valid) return
  const payload = {
    consentFormId: form.consentFormId,
    channel: form.channel,
    userChannel: form.userChannel,
    cif: form.cif,
    decisions: form.decisions.filter((d) => d.accepted !== null),
  }
  submitConsent(payload)
}
const cancel = () => router.push({ name: 'consent-records', query: route.query })
</script>

<style scoped>
.v-radio-group {
  justify-content: center;
}

.v-radio-group .v-selection-control-group {
  justify-content: center;
}

.v-table > .v-table__wrapper > table > tbody > tr > td {
  padding: 12px 16px;
}
</style>
