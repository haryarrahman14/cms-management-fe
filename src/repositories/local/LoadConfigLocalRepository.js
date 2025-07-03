import { defineStore } from 'pinia'

export const LoadConfigLocalRepository = defineStore('config', {
  state: () => ({
    formData: null,
  }),
  actions: {
    async store(data) {
      this.formData = data
    },
    async get() {
      return this.formData
    },
    async remove() {
      this.formData = null
    },
  },
  persist: true,
})

export default LoadConfigLocalRepository
