import VitesseDark from 'theme-vitesse/themes/vitesse-dark.json'
import VitesseLight from 'theme-vitesse/themes/vitesse-light.json'
import { defineConfig } from './src/types'

export default defineConfig({
  firebase: {
    enabled: true,
    recaptcahV3Key: '6Ldgs3ofAAAAABsIdCGGzUfTNy8k8wIejRe2X5wl',
    options: {
      apiKey: 'AIzaSyA1yn7BKau98jHu8dUJJDX-UHsbFzXwGMg',
      authDomain: 'vueuse-playground.firebaseapp.com',
      databaseURL: 'https://vueuse-playground-default-rtdb.firebaseio.com',
      projectId: 'vueuse-playground',
      storageBucket: 'vueuse-playground.appspot.com',
      messagingSenderId: '401675707884',
      appId: '1:401675707884:web:b26ace090bad27a2dc8cc9',
    },
  },

  packages: {
    cdn: 'https://unpkg.com/',
    defaultPackages: {
      '@vueuse/core': 'latest',
      '@vueuse/components': 'latest',
    },
  },

  editor: {
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    folding: false,
    fontFamily: 'JetBrains Mono',
    fontLigatures: true,
    fontSize: 14,
    insertSpaces: true,
    minimap: {
      enabled: false,
    },
    theme: {
      light: VitesseLight,
      dark: VitesseDark,
    },
  },

  terminal: {
    fontFamily: 'JetBrains Mono',
    fontSize: 13,

    // Theme based on Vitesse
    theme: {
      dark: {
        background: '#181818',
        foreground: '#dbd7caee',
        black: '#111',
        white: '#fff',
        green: '#4d9375',
        cyan: '#5eaab5',
        blue: '#6394bf',
        red: '#cb7676',
        yellow: '#e6cc77',
        magenta: '#db889a',
      },
      light: {
        background: '#f5f5f5',
        foreground: '#393a34',
        black: '#111',
        white: '#fff',
        green: '#1c6b48',
        cyan: '#2993a3',
        blue: '#296aa3',
        red: '#ab5959',
        yellow: '#bda437',
        magenta: '#b05a78',
      },
    },
  },
})
