import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

// import '@fortawesome/fontawesome-free/css/all.css'

/**
 * @description based on V-1.28.1
 * @updated 21/01/2025
 */

const customTheme = {
  dark: false,
  colors: {
    primary: '#024042',
    secondary: '#f7ae19',
    'secondary-darken-1': '#ff7c00',
    additional: '#cccccc',
    accent: '#151922',
    accentLight: '#e8e4e4',
    error: '#ef3636',
    warning: '#f4831f',
    warningLight: '#f4831f',
    info: '#45afec',
    success: '#027479',
    successLight: '#027479',
    dark: '#333333',
    light: '#e0eeef',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  defaultAssets: {
    font: {
      family: 'MarkOT',
    },
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})

export default vuetify
