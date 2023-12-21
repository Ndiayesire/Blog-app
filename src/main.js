import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'remixicon/fonts/remixicon.css'

import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast);

app.mount('#app')
