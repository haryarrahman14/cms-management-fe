<template>
  <v-text-field
    v-bind="$attrs"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    variant="outlined"
    density="comfortable"
  />
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
})
</script>
