<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <logo />
      </div>
      <v-spacer />
      <v-btn icon class="mr-5" @click="onLogout">
        <v-icon> mdi mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view :key="$route.path" />
        <v-row v-if="$route.name !== 'ErrorEndOfDay'">
          <v-col md="12" class="text-center">
            <base-button-link-success
              :value="$t('back_to_previous_page').toString()"
              @on:click="onClicked"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import AuthService from '@/usecases/AuthService'
  import BaseButtonLinkSuccess from '@/components/BaseButtonLinkSuccess'
  import Logo from '@/components/Logo'

  export default {
    name: 'EmptyPage',
    components: {
      BaseButtonLinkSuccess,
      Logo,
    },
    mounted() {
      /**
       * TODO - no action for now. Please don't remove this mounted.
       */
    },
    methods: {
      onClicked() {
        this.$router.go(-1)
      },
      onLogout() {
        let logoutUrl = this.logoutUrl
        AuthService.logout()

        if (typeof logoutUrl !== 'undefined') {
          window.location.href = logoutUrl
        } else {
          window.location.reload()
        }
      },
    },
  }
</script>
