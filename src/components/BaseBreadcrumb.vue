<template>
  <v-container
    class="py-2"
    style="background-color: #e3f1f2; border-radius: 8px; margin-top: 12px; margin-bottom: 24px"
  >
    <v-breadcrumbs :items="items">
      <template #divider>
        <v-icon color="grey darken-1" size="18">mdi-chevron-right</v-icon>
      </template>

      <template #title="{ item }">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="text-caption font-weight-medium"
          :style="{ color: item.active ? '#0a5c63' : '#90a4ae' }"
        >
          {{ item.text }}
        </RouterLink>
        <span
          v-else
          class="text-caption font-weight-medium"
          :style="{ color: item.active ? '#0a5c63' : '#90a4ae' }"
        >
          {{ item.text }}
        </span>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
