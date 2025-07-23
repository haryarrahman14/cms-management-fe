<template>
  <v-row no-gutters>
    <v-col :md="size">
      <strong v-if="isLabelBold" :id="'label-' + id">{{ label }}</strong>
      <span v-else :id="'label-' + id">{{ label }}</span>
    </v-col>
    <v-col :md="size">
      <span>:&nbsp;{{ value }}</span>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  size: {
    type: Number,
    default: 3,
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  isLabelBold: {
    type: Boolean,
    default: true,
  },
})
</script>
