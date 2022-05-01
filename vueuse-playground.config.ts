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

  preview: {
    resolutions: {
      'Default': [0, 0],
      'Moto 4G': [360, 640],
      'Galaxy S5': [360, 640],
      'Pixel 2': [411, 731],
      'Pixel 2 XL': [411, 823],
      'iPhone 5/SE': [320, 568],
      'iPhone 6/7/8': [375, 667],
      'iPhone 6/7/8 Plus': [414, 736],
      'iPhone X': [375, 812],
      'iPad': [768, 1024],
      'iPad Pro': [1024, 1366],
      'Surface Duo': [540, 720],
      'Galaxy Fold': [280, 653],
    },
  },

  project: {
    packages: {
      cdn: 'https://unpkg.com/',
      redirects: {
        axios: 'axios-esm',
      },
    },
  },

  editor: {
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    folding: false,
    fontFamily: 'JetBrains Mono, Consolas, \'Courier New\', monospace',
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
