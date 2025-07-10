import { inject } from 'vue'
import { defineStore } from 'pinia'

const keycloak = inject('keycloak')

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    username: '',
  }),
  actions: {
    loadUser() {
      this.token = keycloak.token
      this.username = keycloak.tokenParsed?.preferred_username || 'Anonymous'
    },
    logout() {
      keycloak.logout()
    },
  },
})
