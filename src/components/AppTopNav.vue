<template>
  <v-app-bar color="primary" dark elevate-on-scroll>
    <v-toolbar-title class="font-weight-bold text-uppercase"> CMS</v-toolbar-title>

    <v-spacer />

    <v-btn text to="/" router> Dashboard </v-btn>
    <v-btn text to="/consent" router> Content </v-btn>

    <v-divider vertical class="mx-2" />

    <v-btn text @click="logout" color="red-lighten-1"> Logout </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()
const keycloak = inject('keycloak')

function logout() {
  keycloak.logout({
    redirectUri: window.location.origin,
  })
}
</script>
