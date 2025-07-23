<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'Home', to: '/', active: true },
        { text: 'Users', to: '/users', active: true },
        { text: 'Buat User', active: false },
      ]"
    />
    <v-card>
      <v-card-title>
        <h1 class="text-h5 font-weight-bold mb-4 pt-3">Buat User</h1>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <BaseInput v-model="form.username" label="Username" />
          </v-col>
          <v-col cols="12">
            <BaseInput v-model="form.name" label="Nama Lengkap" />
          </v-col>
          <v-col cols="12">
            <base-select
              v-model="form.role"
              :items="roles"
              item-title="roleName"
              item-value="roleId"
              label="Role"
            />
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="d-flex justify-end">
            <BaseButton :loading="isSubmitting" @click="submitUser">Submit</BaseButton>
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
import BaseSelect from '@/components/BaseSelect.vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import CreateUserRequest from '@/structs/networks/request/CreateUserRequest'
import UsersService from '@/usecases/UsersService'
import RolesService from '@/usecases/RolesService'

const router = useRouter()
const snackbar = useSnackbarStore()
const form = reactive(new CreateUserRequest())

const { mutate: createUser, isPending: isCreating } = UsersService.useCreateUser({
  onSuccess: () => {
    snackbar.open('User berhasil dibuat')
    Object.assign(form, new CreateUserRequest())
  },
  onError: (error) => {
    snackbar.open(`Error: ${error.message}`, { color: 'error' })
  },
})
const { data: rolesData } = RolesService.useGetRoles()
const roles = computed(() => {
  return rolesData.value || []
})

const isSubmitting = computed(() => isCreating.value)

const submitUser = () => {
  createUser({
    ...form,
    role: roles.value.find((role) => role.id === form.role)?.roleId,
  })
}

const cancelForm = () => {
  router.push({
    name: 'AdminUsers',
  })
}
</script>
