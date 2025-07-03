<template>
  <v-card :color="color" class="pa-4 text-white" height="120" rounded="lg" elevation="2">
    <v-card-text class="d-flex flex-column justify-space-between h-100">
      <div class="d-flex justify-space-between align-center">
        <span class="text-h4 font-weight-bold">{{ title }}</span>
        <v-icon>mdi-chevron-right</v-icon>
      </div>
      <div class="text-subtitle-2 mt-2">{{ subtitle }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  color: {
    type: String,
    default: 'primary',
  },
})
</script>
