
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>


<style>
body {
  font-family: 'Montserrat', sans-serif !important; /* Asegúrate de que el nombre sea correcto */
}
.custom-toast-warning{
  background-color: #f0aa14 !important;
}
.custom-toast-error{
  background-color: #e74c3c !important;
}
.custom-toast-succes{
  background-color: #27ae60 !important;
}
.custom-toast-info{
  background-color: #3498db !important;
}
</style>