import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/sass/main.sass'
import './assets/sass/structure.sass'

const app = createApp(App)

app.use(router)

app.mount('#app')
