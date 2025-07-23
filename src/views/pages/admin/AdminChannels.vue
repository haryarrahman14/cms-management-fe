<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'Home', to: '/', active: true },
        { text: 'Channels', active: false },
      ]"
    />
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-start">
        <BaseButton @click="submitForm">Buat Channel</BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable :headers="tableHeaders" :items="users" :loading="isLoading" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import UsersService from '@/usecases/UsersService'

const router = useRouter()

const tableHeaders = [
  { text: 'No', value: 'no' },
  { text: 'Nama', value: 'name' },
  { text: 'Dibuat oleh', value: 'createdBy' },
  { text: 'Tanggal Dibuat', value: 'createdDate' },
  { text: 'Status', value: 'status' },
]

const { data: channel, isLoading } = UsersService.useGetUsers('CHANNEL')
const users = computed(() => {
  return channel.value || []
})

const submitForm = () => {
  router.push({
    name: 'AdminChannelsCreate',
  })
}
</script>
