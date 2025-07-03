<template>
  <v-layout>
    <v-app-bar class="pl-4" app color="primary" dark>
      <div class="d-flex align-center">
        <logo />
      </div>
      <app-top-nav />
      <v-spacer />
      <div class="pr-2 text-right">
        {{ $t(getDay) }} <br />
        {{ getDate }}
      </div>
      <locale-switcher class="locale-switcher" />
      <v-btn icon>
        <v-avatar color="transparent" @click="drawer = !drawer">
          <v-icon size="large" icon="mdi-account-circle" />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="pa-5" fluid>
        <base-navigation-drawer v-model="drawer" />
        <v-row>
          <v-col>
            <app-dialog-loading :show-dialog="isLoading" />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="isShowLeftNav" md="2">
            <app-left-nav />
          </v-col>
          <v-col :md="isFullWidth">
            <router-view :key="$route.path" />
            <app-dual-control />
            <app-document-viewer v-if="documentViewer.isShow" />
          </v-col>
        </v-row>
        <v-snackbar v-model="getIsShow" :color="getColor">
          {{ getTranslate($store.state.notify.message) }}
          <template #actions>
            <v-btn color="white" text @click="hideSnack"> Close </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
  import moment from 'moment'
  import {defineAsyncComponent} from 'vue'
  import Format from '@/plugins/Format'
  import {DualControlStruct} from '@/components/struct/DualControlStruct'
  import AppDialogLoading from '@/components/AppDialogLoading'
  import AppDocumentViewer from '@/components/AppDocumentViewer'
  import BaseNavigationDrawer from '@/components/BaseNavigationDrawer'

  const AppDualControl = defineAsyncComponent(() =>
    import('@/components/AppDualControl'),
  )
  const AppLeftNav = defineAsyncComponent(() =>
    import('@/components/AppLeftNav'),
  )
  const AppTopNav = defineAsyncComponent(() => import('@/components/AppTopNav'))
  const Logo = defineAsyncComponent(() => import('@/components/Logo'))
  const LocaleSwitcher = defineAsyncComponent(() =>
    import('@/components/LocaleSwitcher'),
  )

  // const Logo = () => import(/* webpackChunkName: "Logo" */ '@/components/Logo')

  export default {
    name: 'AdminArea',
    components: {
      AppDualControl,
      BaseNavigationDrawer,
      AppDocumentViewer,
      AppDialogLoading,
      LocaleSwitcher,
      Logo,
      AppLeftNav,
      AppTopNav,
    },
    data() {
      return {
        drawer: false,
        group: null,
        isLeftNavShow: true,
        isUserValidate: false,
        dualControl: new DualControlStruct(),
        images: {
          logo: require('../../assets/images/logo.png'),
        },
      }
    },

    computed: {
      getDay() {
        return `weekdays_${moment().format('dddd').toString().toLowerCase()}`
      },
      documentViewer() {
        return this.$store.state.documentViewer.init
      },
      getDate() {
        return `${Format.dateLong(moment())}`
      },
      isLoading: {
        set() {
          this.$store.dispatch('loading/loadingStart')
        },
        get() {
          return this.$store.state.loading.isLoading
        },
      },
      getIsShow: {
        get() {
          return this.$store.state.notify.isShow || false
        },
        set() {
          return false
        },
      },
      getColor() {
        return this.$store.state.notify.color
      },
      isFullWidth() {
        if (this.isLeftNavShow) {
          return 10
        } else {
          return 12
        }
      },
      isShowLeftNav() {
        return this.isLeftNavShow
      },
    },
    watch: {
      async $route() {
        this.dualControl.isShow = false
        this.$store.dispatch('dualControl/set', this.dualControl).then(() => {
          /**
           * no action
           */
        })
        this.setShowHideLeftNav()
      },
    },
    mounted() {
      /**
       * need to optimize
       */
      if (window.location.href.indexOf('#') > 0) {
        history.pushState(
          '',
          document.title,
          window.location.pathname + window.location.search,
        )
      }
      this.setShowHideLeftNav()
    },
    methods: {
      getTranslate(message) {
        let messages = message.split('.')
        if (messages[0] === 'translate') {
          return this.$t(messages[1])
        } else {
          return message
        }
      },
      setShowHideLeftNav() {
        this.isLeftNavShow = this.$route.meta.leftNav || false
      },
      hideSnack() {
        this.$store.dispatch('notify/showNotify', {
          isShow: false,
          color: this.$store.state.notify.color,
          message: this.$store.state.notify.message,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .locale-switcher {
    max-width: 200px;
  }
</style>
