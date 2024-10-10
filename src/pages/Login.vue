<template>
  <div class="login-containe">
    <form class="login-form" @submit.prevent="submit">
      <div class="inner__brand">
      <div class="brand__text">
        <span>
          <h3>C&C Services</h3>
        </span>
      </div>
    </div>
      <h1 class="font-semibold text-4xl mb-4">Iniciar Sesion</h1>
      <div class="mb-4">
        <label for="usuario" class="label">Usuario</label>
        <input 
          id="usuario" 
          type="text" 
          v-model="formData.usuario" 
          required 
          class="input" 
        />
      </div>
      <div class="mb-4">
        <label for="clave" class="label">Contraseña</label>
        <input 
          id="clave" 
          type="password" 
          v-model="formData.clave" 
          required 
          class="input" 
        />
      </div>
      <div class="flex justify-center mt-4">
        <button type="submit" class="button">Iniciar sesión</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const formData = reactive({
  usuario: '',
  clave: '',
})

const router = useRouter()
const toast = useToast()

const submit = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('nombre', data.usuario)
      console.log(`Biengenido ${data.usuario}`)
      toast.success(`Bienvenido ${data.usuario}`)
      await router.push({ name: 'home' })
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    toast.error('Error interno del servidor')
  }
}
</script>


<style >

.login-container {
    background-color: #092431; /* Color de fondo deseado */
    height: 100vh; /* Asegúrate de que ocupe toda la altura de la ventana */
    display: flex; /* Para centrar el contenido */
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente */
}

.brand__text h3 {
  font-size: 2.5rem;
  color: #4A90E2; /* Color del texto */
}

.login-form {
  max-width: 400px; /* Ancho máximo del formulario */
  margin: auto; /* Centramos el formulario */
  padding: 20px;
  border: 1px solid #E0E0E0; /* Bordes del formulario */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
  background-color: #FFFFFF; /* Fondo blanco */
}

.label {
  display: block; /* Ocupa todo el ancho */
  margin-bottom: 8px; /* Espacio debajo de la etiqueta */
  font-weight: bold; /* Negrita */
  color: #333; /* Color de texto */
}

.input {
  width: 90%; /* Ancho completo */
  padding: 10px; /* Espaciado interno */
  margin-bottom: 16px; /* Espacio entre inputs */
  border: 1px solid #D0D0D0; /* Bordes de los inputs */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 1rem; /* Tamaño de fuente */
}

.input:focus {
  border-color: #4A90E2; /* Color del borde al enfocar */
  outline: none; /* Sin contorno */
}

.button {
  padding: 10px 20px; /* Espaciado interno del botón */
  background-color: #4A90E2; /* Color de fondo del botón */
  color: white; /* Color del texto */
  border: none; /* Sin bordes */
  border-radius: 4px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar */
  transition: background-color 0.3s; /* Transición suave */
}

.button:hover {
  background-color: #357ABD; /* Color de fondo al pasar */
}
</style>
