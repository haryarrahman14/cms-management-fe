<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'ADMIN', to: '/admin/roles', active: true },
        { text: 'ROLES', to: '/admin/roles', active: true },
        { text: 'BUAT ROLE', active: false },
      ]"
    />
    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4 pt-3">
          {{ isEdit ? 'Edit Role' : 'Buat Role' }}
        </h1>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <BaseInput v-model="form.roleName" label="Nama Role" />
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="d-flex justify-end">
            <BaseButton :loading="isLoading" @click="createRole">Submit</BaseButton>
            <BaseButton class="ml-2" color="primary" @click="cancelForm">Cancel</BaseButton>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import CreateRoleRequest from '@/structs/networks/request/CreateRoleRequest'
import RolesService from '@/usecases/RolesService'

const route = useRoute()
const router = useRouter()
const snackbar = useSnackbarStore()

const isEdit = computed(() => route.name === 'AdminRolesEdit')
const isLoading = ref(false)
const form = ref(new CreateRoleRequest())

const createRole = async () => {
  isLoading.value = true
  const response = isEdit.value
    ? await RolesService.updateRoles(route.params.id, form.value)
    : await RolesService.createRoles(form.value)

  isLoading.value = false
  if (response.code === 200) {
    snackbar.open(isEdit.value ? 'Role berhasil diubah' : 'Role berhasil dibuat')
    if (!isEdit.value) form.value = new CreateRoleRequest()
  } else {
    snackbar.open(`Error: ${response.message}`, { color: 'error' })
  }
}

const getRoleById = async (id) => {
  isLoading.value = true
  const response = await RolesService.getRoleById(id)
  isLoading.value = false
  if (response.code === 200 && response.data) {
    form.value.roleName = response.data.roleName || ''
    form.value.createdBy = response.data.createdBy || ''
  } else {
    snackbar.open(`Gagal mengambil data role`, { color: 'error' })
  }
}

const cancelForm = () => {
  router.push({
    name: 'AdminRoles',
  })
}

onMounted(() => {
  if (isEdit.value && route.params.id) {
    const id = route.params.id
    getRoleById(id)
  }
})
</script>
