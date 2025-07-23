<template>
  <v-card>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :id="header.value"
            :key="index"
            :class="header.class || 'text-white font-weight-bold'"
            :style="header.style || 'background-color: #004d4d'"
          >
            {{ header.text }}
          </th>
          <th
            v-if="hasActions"
            id="actions"
            class="text-white font-weight-bold text-center"
            style="background-color: #004d4d; min-width: 120px"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="headers.length + (hasActions ? 1 : 0)" class="text-center">
            <v-progress-circular indeterminate color="primary" size="24" class="mr-2" />
            Loading...
          </td>
        </tr>
        <tr v-else-if="items.length === 0">
          <td :colspan="headers.length + (hasActions ? 1 : 0)" class="text-center">
            Data tidak ditemukan
          </td>
        </tr>
        <tr v-else v-for="(item, rowIndex) in items" :key="rowIndex">
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            {{ item[header.value] }}
          </td>
          <td v-if="hasActions">
            <div class="d-flex gap-1 justify-space-evenly">
              <v-icon
                v-if="showDetail"
                class="cursor-pointer"
                color="primary"
                size="small"
                @click="$emit('detail', item)"
              >
                mdi-eye
              </v-icon>
              <v-icon
                v-if="showEdit"
                class="cursor-pointer"
                color="info"
                size="small"
                @click="$emit('edit', item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                v-if="showDelete"
                class="cursor-pointer"
                color="error"
                size="small"
                @click="$emit('delete', item)"
              >
                mdi-delete
              </v-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  editRoute: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showDetail: {
    type: Boolean,
    default: false,
  },
  showEdit: {
    type: Boolean,
    default: false,
  },
  showDelete: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['detail', 'edit', 'delete'])

const hasActions = computed(() => props.showDetail || props.showEdit || props.showDelete)
</script>
