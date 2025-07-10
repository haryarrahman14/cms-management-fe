<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'Home', to: '/', active: true },
        { text: 'Agents', active: false },
      ]"
    />
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-start">
        <BaseButton @click="submitForm">Buat Agent</BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable :headers="tableHeaders" :items="users" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseToggle from '@/components/BaseToggle.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import UsersService from '@/usecases/UsersService'

const router = useRouter()
const users = ref([])

const tableHeaders = [
  { text: 'No', value: 'no' },
  { text: 'Nama', value: 'name' },
  { text: 'Dibuat oleh', value: 'createdBy' },
  { text: 'Tanggal Dibuat', value: 'createdDate' },
  { text: 'Status', value: 'status' },
]

const showPopup = ref(false)

const form = ref({
  name: '',
  type: '',
  isRequired: false,
})

onMounted(() => {
  getUsers()
})

const getUsers = async () => {
  const response = await UsersService.getUsers('AGENT')
  if (response.code === 200) {
    users.value = response.data
  }
}

const submitForm = () => {
  showPopup.value = false
  router.push({
    name: 'AdminAgentsCreate',
  })
}
</script>
