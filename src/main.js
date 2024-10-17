import { createApp } from 'vue';
import App from './App.vue'; // Renombrar aquí
import router from './router/Rutas'; // Asegúrate de que la ruta sea correcta
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Importa los estilos de vue-toastification
import 'bootstrap'
import '@fontsource/montserrat'; // Fuente normal (400 por defecto)
import '@fontsource/montserrat/700.css'; // Importar peso 700

const app = createApp(App); // Usa el nombre correcto aquí

const options = {
  position: 'top-center',
  timeout: 3000,
  pauseOnHover: false
};

app.use(Toast, options);
app.use(router);
app.mount('#app');

