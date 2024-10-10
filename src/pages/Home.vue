<script setup lang="ts">
import Dashboard from '../components/dashboard.vue';
import { Router } from 



const logout = () => {
      localStorage.removeItem('nombreUsuario')
      localStorage.removeItem('usuarioUsuario')
      localStorage.removeItem('authToken') 
      localStorage.removeItem('idDirectora')
      router.push({ name: 'login' }) // Redirigir al usuario a la página de inicio de sesión
    }
</script>

<template>
  <Dashboard />
</template>