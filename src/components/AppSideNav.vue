<template>
  <v-navigation-drawer app permanent color="primary" dark :rail="rail" @click="rail = false">
    <v-list>
      <v-list-item>
        <v-list-item-content v-if="!rail">
          <v-list-item-title>CMS</v-list-item-title>
        </v-list-item-content>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-divider class="my-2" />

      <v-list-item
        to="/"
        router
        prepend-icon="mdi-home"
        title="Beranda"
        value="beranda"
      ></v-list-item>

      <v-list-group v-model="contentGroupOpen" no-action>
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-file-document-plus"
            title="Content"
            value="content"
          >
          </v-list-item>
        </template>
        <v-list-item to="/consent" router>
          <v-list-item-content><v-list-item-title>Consent</v-list-item-title></v-list-item-content>
        </v-list-item>
        <!-- ... -->
      </v-list-group>

      <v-list-group v-model="adminGroupOpen" no-action>
        <template #activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-edit" title="Admin" value="admin">
          </v-list-item>
        </template>
        <v-list-item to="/admin/roles" router>
          <v-list-item-content><v-list-item-title>Roles</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/users" router>
          <v-list-item-content><v-list-item-title>User</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/agents" router>
          <v-list-item-content><v-list-item-title>Agent</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item
        @click="logout"
        prepend-icon="mdi-logout"
        title="Logout"
        value="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, inject } from 'vue'

const keycloak = inject('keycloak')

const contentGroupOpen = ref(false)
const adminGroupOpen = ref(false)
const rail = ref(true)

function logout() {
  keycloak.logout({
    redirectUri: window.location.origin,
  })
}
</script>
