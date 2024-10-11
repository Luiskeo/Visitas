import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import home from '../pages/Home.vue';
import agregar from '../pages/Agregar.vue';
import dashboard from '../components/dashboard.vue'
import Exportar from '../pages/Exportar.vue';


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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: agregar,
  },
  {
    path: '/exportar',
    name: 'exportar',
    component: Exportar,
  },
];

const router = createRouter({
  history: createWebHistory(), // Usa una cadena vacía aquí
  routes,
});

export default router;
