<template>
  <v-btn
    :color="color"
    :elevation="elevation"
    :variant="variant"
    class="text-white text-button font-weight-bold"
    v-bind="$attrs"
  >
    <slot />
  </v-btn>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'orange',
  },
  elevation: {
    type: [Number, String],
    default: 2,
  },
  variant: {
    type: String,
    default: 'flat', // Use 'flat' to mimic custom styling
  },
})
</script>

<style scoped>
.text-button {
  text-transform: uppercase;
  font-size: 14px;
}
</style>
