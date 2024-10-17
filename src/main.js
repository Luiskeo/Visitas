import { createApp } from 'vue';
import App from './App.vue'; 
import router from './router/Rutas'; 
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 
import 'bootstrap'
import '@fontsource/montserrat'; 
import '@fontsource/montserrat/700.css'; 

const app = createApp(App); 

const options = {
  position: 'top-center',
  timeout: 3000,
  pauseOnHover: false
};

app.use(Toast, options);
app.use(router);
app.mount('#app');

