import { createApp } from 'vue';
import App from './App.vue'; // Renombrar aquí
import router from './router/Rutas'; // Asegúrate de que la ruta sea correcta
import 'bootstrap'
const app = createApp(App); // Usa el nombre correcto aquí

app.use(router);
app.mount('#app');

