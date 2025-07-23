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
            <BaseButton :loading="isSubmitting" @click="submitRole">Submit</BaseButton>
            <BaseButton class="ml-2" color="primary" @click="cancelForm">Cancel</BaseButton>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
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
const form = reactive(new CreateRoleRequest())

const { mutate: createRole, isPending: isCreating } = RolesService.useCreateRole({
  onSuccess: () => {
    snackbar.open('Role berhasil dibuat')
    Object.assign(form, new CreateRoleRequest())
  },
  onError: (error) => {
    snackbar.open(`Error: ${error.message}`, { color: 'error' })
  },
})

const { mutate: updateRole, isPending: isUpdating } = RolesService.useUpdateRole(
  computed(() => route.params.id),
  {
    onSuccess: () => {
      snackbar.open('Role berhasil diubah')
    },
    onError: (error) => {
      snackbar.open(`Error: ${error.message}`, { color: 'error' })
    },
  },
)

const { data: roleData } = RolesService.useGetRoleById(
  computed(() => route.params.id),
  {
    enabled: computed(() => isEdit.value && !!route.params.id),
  },
)

watch(
  () => roleData.value,
  (role) => {
    if (role && isEdit.value) {
      form.roleName = role.roleName || ''
      form.createdBy = role.createdBy || ''
    }
  },
)

const isSubmitting = computed(() => isCreating.value || isUpdating.value)

const submitRole = () => {
  if (isEdit.value) {
    updateRole(form)
  } else {
    createRole(form)
  }
}

const cancelForm = () => {
  router.push({
    name: 'AdminRoles',
  })
}
</script>
