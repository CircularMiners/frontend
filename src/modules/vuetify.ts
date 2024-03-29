import 'vuetify/styles/main.sass'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { type UserModule } from '~/types'

// Import Vuetify
export const install: UserModule = ({ app }) => {
  const vuetify = createVuetify({
    theme: {
      // defaultTheme: 'dark',
    },
  })

  app.use(vuetify)
}
