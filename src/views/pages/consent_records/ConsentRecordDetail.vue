<template>
  <v-container>
    <BaseBreadcrumb
      :items="[
        { text: 'CONSENT RECORD', active: false },
        { text: 'CONSENT USER LIST', to: '/consent-records', active: false },
        { text: `${recordData?.cif || ''} - ${recordData?.userChannel || ''}`, active: true },
      ]"
    />
    <v-row v-if="error?.message">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ error.message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-card class="mt-4">
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4 pt-3">Detail Consent User</h1>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1"
                >Tanggal Persetujuan</label
              >
              <div class="text-body-1 font-weight-medium">{{ recordData?.submitDate || '-' }}</div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1">CIF</label>
              <div class="text-body-1 font-weight-medium">{{ recordData?.cif || '-' }}</div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1">Nama Nasabah</label>
              <div class="text-body-1 font-weight-medium">{{ recordData?.userChannel || '-' }}</div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1"
                >Consent Template</label
              >
              <div class="text-body-1 font-weight-medium">
                {{ recordData?.consentForm?.title || '-' }}
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1">Version</label>
              <div class="text-body-1 font-weight-medium">
                {{ recordData?.version?.toString() || '-' }}
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1">Channel</label>
              <div class="text-body-1 font-weight-medium">
                {{ getChannelLabel(recordData?.channel) || '-' }}
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="mb-4">
              <label class="text-body-2 font-weight-medium text-grey-darken-1">Status</label>
              <div class="text-body-1 font-weight-medium">
                {{ recordData?.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-4" v-if="templateDetail?.sections?.length > 0">
          <v-col cols="12">
            <h3 class="text-body-1 font-weight-bold mb-3">Consent Result</h3>
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
                    v-for="section in templateDetail.sections"
                    :key="`section-${section.consentSectionId}`"
                  >
                    <td
                      :class="
                        getSectionDepth(section) === 1 ? 'font-weight-bold' : 'font-weight-medium'
                      "
                      :style="{ paddingLeft: `${getSectionDepth(section)}rem` }"
                    >
                      <div>
                        <div>{{ section.header }}</div>
                        <div
                          v-if="section.description"
                          class="text-caption text-grey-darken-1 mt-1"
                          v-html="section.description"
                        ></div>
                      </div>
                    </td>
                    <td class="w-full" style="width: 200px; min-width: 200px">
                      <div class="d-flex justify-center align-center" style="min-height: 40px">
                        <span class="w-full flex-grow-1 d-flex justify-center">
                          <v-icon
                            v-if="Boolean(getDecisionValue(section.consentSectionId))"
                            color="success"
                            size="small"
                          >
                            mdi-check-circle
                          </v-icon>
                        </span>
                        <span class="w-full flex-grow-1 d-flex justify-center">
                          <v-icon
                            v-if="!Boolean(getDecisionValue(section.consentSectionId))"
                            color="error"
                            size="small"
                          >
                            mdi-close-circle
                          </v-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-4">
          <v-col cols="12" class="d-flex justify-end">
            <BaseButton color="grey" variant="outlined" @click="goBack"> Kembali </BaseButton>
            <BaseButton class="ml-2" @click="editRecord"> Edit </BaseButton>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'
import TemplatesService from '@/usecases/TemplatesService'
import UsersService from '@/usecases/UsersService'

const router = useRouter()
const route = useRoute()
const error = ref(null)

const recordId = computed(() => route.params.id)
const { data: recordData } = ConsentSubmissionService.useGetConsentSubmissionDetail(recordId, {
  enabled: computed(() => !!recordId.value),
})

const { data: channelData } = UsersService.useGetUsers('CHANNEL')
const channelList = computed(() => {
  if (!channelData.value) return []
  return channelData.value.map((channel) => ({
    label: channel.name,
    value: channel.username,
  }))
})

const { data: templateDetail } = TemplatesService.useGetTemplateDetail(
  computed(() => recordData.value?.consentFormId),
  { enabled: computed(() => !!recordData.value?.consentFormId) },
)
const getSectionDepth = ConsentSubmissionService.useGetSectionDepth(
  computed(() => templateDetail.value?.sections || []),
)
const getChannelLabel = (channelValue) => {
  const channel = channelList.value.find((c) => c.value === channelValue)
  return channel?.label || channelValue
}
const getDecisionValue = (consentSectionId) => {
  if (!recordData.value?.decisions) return null
  const decision = recordData.value.decisions.find((d) => d.consentSectionId === consentSectionId)
  return decision?.accepted || null
}
const goBack = () => router.push({ name: 'consent-records', query: route.query })
const editRecord = () =>
  router.push({ name: 'consent-records-edit', params: { id: recordId.value }, query: route.query })
</script>

<style scoped>
.v-table > .v-table__wrapper > table > tbody > tr > td {
  padding: 12px 16px;
}
</style>
