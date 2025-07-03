<template>
  <v-dialog v-model="internalValue" max-width="600">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold text-white" style="background-color: #004d4d">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:show', 'submit'])

const props = defineProps({
  show: Boolean,
  title: String,
})

const internalValue = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val),
})
</script>
