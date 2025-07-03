<template>
  <v-navigation-drawer app permanent color="primary" dark>
    <v-list dense nav>
      <v-list-item class="text-h6 text-white font-weight-bold">
        <v-list-item-content>
          <v-list-item-title>CONSENT MANAGEMENT SYSTEM</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-item to="/" router exact>
        <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Beranda</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-list-group v-model="contentGroupOpen" no-action>
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-icon><v-icon>mdi-file-document-plus</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Content</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item to="/consent" router>
          <v-list-item-content><v-list-item-title>Consent</v-list-item-title></v-list-item-content>
        </v-list-item>
        <!-- ... -->
      </v-list-group>

      <v-list-group v-model="adminGroupOpen" no-action>
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-icon><v-icon>mdi-account-edit</v-icon></v-list-item-icon>
            <v-list-item-content><v-list-item-title>Admin</v-list-item-title></v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item to="/admin" router>
          <v-list-item-content><v-list-item-title>Roles</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/users" router>
          <v-list-item-content><v-list-item-title>User</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-spacer />

      <v-list-item @click="logout">
        <v-list-item-icon><v-icon color="red">mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-content
          ><v-list-item-title class="text-red">Logout</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, inject } from 'vue'

const keycloak = inject('keycloak')

const contentGroupOpen = ref(false)
const adminGroupOpen = ref(false)

function logout() {
  keycloak.logout({
    redirectUri: window.location.origin,
  })
}
</script>
