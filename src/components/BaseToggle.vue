<template>
  <v-switch
    v-bind="$attrs"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    color="primary"
    hide-details
  />
</template>

<script setup>
defineProps({
  modelValue: Boolean,
})
</script>
