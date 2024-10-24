<template>
  <div>
    <Dashboard />
  </div>
</template>

<script setup lang="ts">
import Dashboard from '../components/dashboard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();


</script>

<style scoped>

body{
  font-family: 'Montserrat', sans-serif !important;
}
.logout-button {
  padding: 10px 20px;
  background-color: #4A90E2; /* Color del botón */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar */
  transition: background-color 0.3s; /* Transición suave */
}

.logout-button:hover {
  background-color: #357ABD; /* Color del botón al pasar el ratón */
}
</style>
