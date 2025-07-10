// src/stores/useSnackbarStore.js
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    show: false,
    text: '',
    color: 'success',
    timeout: 3000,
  }),
  actions: {
    open(message, options = { color: 'success' }) {
      this.text = message
      this.color = options.color || 'success'
      this.timeout = options.timeout || 3000
      this.show = true
    },
    close() {
      this.show = false
    },
  },
})
