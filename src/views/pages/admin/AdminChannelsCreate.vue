<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'Home', to: '/', active: true },
        { text: 'Channels', to: '/admin/channel', active: true },
        { text: 'Buat Channel', active: false },
      ]"
    />
    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4 pt-3">Buat Channel</h1>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <BaseInput v-model="form.username" label="Username Channel" />
          </v-col>
          <v-col cols="12">
            <BaseInput v-model="form.name" label="Nama Channel" />
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="d-flex justify-end">
            <BaseButton :loading="isSubmitting" @click="submitAgent">Submit</BaseButton>
            <BaseButton class="ml-2" color="primary" @click="cancelForm">Cancel</BaseButton>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import CreateAgentRequest from '@/structs/networks/request/CreateAgentRequest'
import UsersService from '@/usecases/UsersService'

const router = useRouter()
const snackbar = useSnackbarStore()
const form = reactive(new CreateAgentRequest())

const { mutate: createAgent, isPending: isCreating } = UsersService.useCreateChannel({
  onSuccess: () => {
    snackbar.open('Channel berhasil dibuat')
    Object.assign(form, new CreateAgentRequest())
  },
  onError: (error) => {
    snackbar.open(`Error: ${error.message}`, { color: 'error' })
  },
})

const isSubmitting = computed(() => isCreating.value)

const submitAgent = () => {
  createAgent(form)
}

const cancelForm = () => {
  router.push({
    name: 'AdminChannels',
  })
}
</script>
