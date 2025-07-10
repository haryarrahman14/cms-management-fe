<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'Home', to: '/', active: true },
        { text: 'Agents', to: '/admin/agents', active: true },
        { text: 'Buat Agent', active: false },
      ]"
    />
    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4 pt-3">Buat Agent</h1>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <BaseInput v-model="form.username" label="Username Agent" />
          </v-col>
          <v-col cols="12">
            <BaseInput v-model="form.name" label="Nama Agent" />
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="d-flex justify-end">
            <BaseButton :loading="isLoading" @click="createAgent">Submit</BaseButton>
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
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import CreateAgentRequest from '@/structs/networks/request/CreateAgentRequest'
import UsersService from '@/usecases/UsersService'

const router = useRouter()
const snackbar = useSnackbarStore()
const isLoading = ref(false)
const form = ref(new CreateAgentRequest())

const createAgent = async () => {
  isLoading.value = true
  const response = await UsersService.createAgent(form.value)
  isLoading.value = false
  if (response.code === 200) {
    snackbar.open('Agent berhasil dibuat')
    form.value = new CreateAgentRequest()
  } else {
    snackbar.open(`Error: ${response.message}`, { color: 'error' })
  }
}

const cancelForm = () => {
  router.push({
    name: 'AdminAgents',
  })
}
</script>
