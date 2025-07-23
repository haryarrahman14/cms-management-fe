<template>
  <v-select
    v-bind="$attrs"
    :items="items"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :item-title="itemTitle"
    :item-value="itemValue"
    variant="outlined"
    density="comfortable"
    :disabled="disabled"
    :readonly="readonly"
  />
</template>

<script setup>
defineProps({
  modelValue: [String, Number, Object, Boolean],
  items: Array,
  itemTitle: {
    type: String,
    default: 'label',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
