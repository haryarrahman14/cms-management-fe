<template>
  <v-card>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="text-white font-weight-bold"
            style="background-color: #004d4d"
          >
            {{ header.text }}
          </th>
          <th
            v-if="editAction"
            class="text-white font-weight-bold"
            style="background-color: #004d4d"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td :colspan="headers.length" class="text-center">Data tidak ditemukan</td>
        </tr>
        <tr v-else v-for="(item, rowIndex) in items" :key="rowIndex">
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            {{ item[header.value] }}
          </td>
          <td v-if="editAction">
            <v-icon class="cursor-pointer" color="primary" @click="goToEdit(item.id)">
              mdi-pencil
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  editAction: {
    type: Boolean,
    default: false,
  },
  editRoute: {
    type: String,
    default: '',
  },
})

const router = useRouter()

const goToEdit = (id) => {
  if (props.editRoute && id !== undefined) {
    router.push({ name: props.editRoute, params: { id } })
  }
}
</script>
