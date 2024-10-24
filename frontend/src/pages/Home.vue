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
  background-color: #4A90E2; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.logout-button:hover {
  background-color: #357ABD; 
}
</style>
