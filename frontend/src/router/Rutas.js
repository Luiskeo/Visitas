import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import home from "../pages/Home.vue";
import agregar from "../pages/Agregar.vue";
import dashboard from "../components/dashboard.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const routes = [
  {
    path: "/",
    name: "admin",
    redirect: { name: "login" }, // Redirige a 'login' cuando se accede a '/'
  },
  {
    path: "/login",
    name: "login",
    component: Login, // Define la ruta para el componente de login
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/agregar",
    name: "agregar",
    component: agregar,
  },
];

const router = createRouter({
  history: createWebHistory(), // Usa una cadena vacía aquí
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem("token");
  const usuario = sessionStorage.getItem("usuario"); // Asegúrate de tener un valor válido aquí

  // Si la ruta requiere autenticación y no hay token, redirige al login
  if (to.meta.requiresAuth && !token) {
    toast.error("Debes iniciar sesión", { icon: "fa-solid fa-user-times" });
    return next({ name: "login" });
  }

  // Si hay token, intenta verificarlo con el backend
  if (token && usuario) {
    try {
      const response = await axios.post(
        "http://172.16.0.108:3000/api/verify-token",
        { token, usuario }
      );

      // Si la verificación es exitosa, permite la navegación
      if (response.data.success) {
        return next();
      } else {
        toast.error("Token inválido o expirado");
        return next({ name: "login" });
      }
    } catch (error) {
      toast.error(
        "Error de autenticación. Por favor, inicia sesión nuevamente."
      );
      return next({ name: "login" });
    }
  } else {
    return next(); // Si no es una ruta protegida, permite continuar
  }
});
export default router;
