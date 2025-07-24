<template>
  <div>
    <v-row class="mt-4" v-if="template[clausesKey]?.length > 0">
      <v-col cols="12">
        <v-card>
          <v-table>
            <thead>
              <tr>
                <th
                  id="consent-section-no"
                  class="text-white font-weight-bold"
                  style="background-color: #004d4d"
                >
                  <span>No</span>
                </th>
                <th
                  id="consent-section-no"
                  class="text-white font-weight-bold"
                  style="background-color: #004d4d"
                >
                  <span>Judul</span>
                </th>
                <th
                  id="consent-section-header"
                  class="text-white font-weight-bold"
                  style="background-color: #004d4d"
                >
                  <span>Klausa</span>
                </th>
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
              <tr v-for="(section, index) in template[clausesKey]" :key="`section-${index}`">
                <td>{{ section.order }}</td>
                <td>{{ section.header }}</td>
                <td
                  :class="section.parentSectionId ? 'font-weight-bold' : 'font-weight-medium'"
                  :style="{ paddingLeft: `${section.parentSectionId ? '2' : '1'}rem` }"
                >
                  <div>
                    <div>
                      <span v-if="section.required" class="text-red">*&nbsp;</span
                      >{{ section.shortName }}
                    </div>
                    <div v-if="section.description" class="mt-1" v-html="section.description"></div>
                  </div>
                </td>
                <td class="w-full" style="width: 200px; min-width: 200px">
                  <div
                    v-if="records.length > 0"
                    class="d-flex justify-center align-center"
                    style="min-height: 40px"
                  >
                    <span class="w-full flex-grow-1 d-flex justify-center">
                      <v-icon
                        v-if="getIsAnswerAccepted(section.consentSectionId)"
                        color="success"
                        size="small"
                      >
                        mdi-check-circle
                      </v-icon>
                    </span>
                    <span class="w-full flex-grow-1 d-flex justify-center">
                      <v-icon
                        v-if="!getIsAnswerAccepted(section.consentSectionId)"
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
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  template: {
    type: Object,
    default: {},
  },
  records: {
    type: Array,
    default: [],
  },
  clausesKey: {
    type: String,
    default: 'sections',
  },
})

const getIsAnswerAccepted = (consentSectionId) => {
  const decision = props.records.find((record) => record.consentSectionId === consentSectionId)
  return decision?.accepted
}
</script>
