import { createApp } from 'vue';
import App from './App.vue'; 
import router from './router/Rutas'; 
import Toast, {TYPE} from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 
import 'bootstrap'
import '@fontsource/montserrat'; 
import '@fontsource/montserrat/700.css'; 

const app = createApp(App); 

const options = {
  toastDefaults: {
    [TYPE.WARNING]: {
      position: 'top-center',
      timeout: 3000,
      pauseOnHover: false,
      toastClassName: "custom-toast-warning",
      icon: 'fa-solid fa-question'
    },
    [TYPE.SUCCESS]: {
      position: 'top-center',
      timeout: 3000,
      pauseOnHover: false,
      toastClassName: "custom-toast-success",
      icon: 'fa-solid fa-check'
    },
    [TYPE.ERROR]: {
      position: 'top-center',
      timeout: 3000,
      pauseOnHover: false,
      toastClassName: "custom-toast-error",
      icon: 'fa-solid fa-xmark'
    },
    [TYPE.INFO]: {
      position: 'top-center',
      timeout: 3000,
      pauseOnHover: false,
      toastClassName: "custom-toast-info",
      icon: 'fa-solid fa-info'
    }
  }
};

app.use(Toast, options);
app.use(router);
app.mount('#app');

