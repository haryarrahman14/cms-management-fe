<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'CONTENT', to: '/consent', active: true },
        { text: 'TEMPLATE CMS', to: '/consent', active: true },
        { text: 'BUAT TEMPLATE', active: false },
      ]"
    />

    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4">Detail Template</h1>
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <BaseInput v-model="form.title" label="Judul Template" />
          </v-col>
          <v-col cols="12">
            <BaseInput v-model="form.description" label="Deskripsi" />
          </v-col>
          <v-col cols="12">
            <BaseInput v-model="form.version" label="Version" type="number" step="0.1" />
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-space-between align-center mb-8">
              <h2 class="text-h6 font-weight-bold">Klausa</h2>
              <BaseButton @click="addClause">+ Tambah Klausa</BaseButton>
            </div>

            <v-card v-for="(clause, index) in form.clauses" :key="clause.id" class="mb-4">
              <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-subtitle-1 font-weight-bold"> Klausa {{ index + 1 }} </span>
                <div>
                  <BaseButton icon @click="moveUp(index)" :disabled="index === 0">
                    &uarr;
                  </BaseButton>
                  <BaseButton
                    icon
                    @click="moveDown(index)"
                    :disabled="index === form.clauses.length - 1"
                  >
                    &darr;
                  </BaseButton>
                  <BaseButton icon color="error" @click="removeClause(index)"> &times; </BaseButton>
                </div>
              </v-card-title>
              <v-card-text>
                <BaseToggle v-model="clause.required" label="Wajib Diisi" />
                <BaseInput v-model="clause.header" label="Judul Klausa" />
                <BaseInput v-model="clause.shortName" label="Short Name" />
                <BaseRichEditor v-model="clause.description" :key="clause.id" label="Isi Klausa" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-4">
          <v-col cols="12" class="d-flex justify-end">
            <BaseButton @click="submitForm">Submit</BaseButton>
            <BaseButton class="ml-2" color="primary" @click="cancelForm">Cancel</BaseButton>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseToggle from '@/components/BaseToggle.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import BaseRichEditor from '@/components/BaseRichEditor.vue'
import {
  CreateTemplateRequest,
  CreateTemplateClause,
} from '@/structs/networks/request/CreateTemplateRequest'
import TemplatesService from '@/usecases/TemplatesService'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

const router = useRouter()
const snackbar = useSnackbarStore()

const generateUUID = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36)

const isLoading = ref(false)
const form = ref(new CreateTemplateRequest())

const addClause = () => {
  form.value.clauses.push({
    id: generateUUID(),
    ...new CreateTemplateClause(),
  })
}

const removeClause = (index) => {
  form.value.clauses.splice(index, 1)
}

const moveUp = (index) => {
  if (index > 0) {
    const temp = form.value.clauses[index - 1]
    form.value.clauses[index - 1] = form.value.clauses[index]
    form.value.clauses[index] = temp
  }
}

const moveDown = (index) => {
  if (index < form.value.clauses.length - 1) {
    const temp = form.value.clauses[index + 1]
    form.value.clauses[index + 1] = form.value.clauses[index]
    form.value.clauses[index] = temp
  }
}

const submitForm = async () => {
  isLoading.value = true
  const response = await TemplatesService.createTemplate(form.value)
  isLoading.value = false
  if (response.code === 200) {
    snackbar.open('Template berhasil dibuat')
    form.value = new CreateTemplateRequest()
    router.push({ name: 'consent' })
  } else {
    snackbar.open(`Error: ${response.message}`, { color: 'error' })
  }
}

const cancelForm = () => {
  router.push({
    name: 'about',
  })
}
</script>
