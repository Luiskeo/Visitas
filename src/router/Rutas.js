import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import home from '../pages/Home.vue';
const routes = [
  {
    path: '/',
    name: 'admin',
    redirect: { name: 'login' }, // Redirige a 'login' cuando se accede a '/'
  },
  {
    path: '/login',
    name: 'login',
    component: Login, // Define la ruta para el componente de login
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  }
];

const router = createRouter({
  history: createWebHistory(), // Usa una cadena vacía aquí
  routes,
});

export default router;
