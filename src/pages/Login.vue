<template>
  <div class="login-container">
    <div class="video-container">
      <video autoplay muted id="video-background">
        <source
          src="../../public/videos/Rosado Amarillo Neón Estilo ilustración 3D Capacitación Emprendimiento Video(1).mp4"
          type="video/mp4"
        />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
    <form class="login-form" @submit.prevent="submit">
      <div class="inner__brand"></div>
      <h1 class="font-semibold text-4xl mb-4">Iniciar Sesión</h1>
      <div class="mb-4">
        <label for="usuario" class="label">Usuario</label>
        <div class="input-wrapper">
          <input
            id="usuario"
            type="text"
            v-model="formData.usuario"
            required
            placeholder="Digita usuario"
            class="input"
          />
          <i class="fas fa-user icon"></i>
        </div>
      </div>
      <div class="mb-4">
        <label for="clave" class="label">Contraseña</label>
        <div class="input-wrapper">
          <input
            id="clave"
            type="password"
            v-model="formData.clave"
            required
            placeholder="Digita contraseña"
            class="input"
          />
          <i class="fas fa-lock icon"></i>
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <button type="submit" class="button">Iniciar sesión</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const formData = reactive({
  usuario: "",
  clave: "",
});
const toast = useToast();
const router = useRouter();

onMounted(() => {
  const video = document.getElementById("video-background") as HTMLVideoElement;
  if (video) {
    video.addEventListener("ended", function () {
      video.pause();
    });
  }
});

const submit = async () => {
  try {
    const response = await fetch("http://172.16.0.108:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("nombre", data.nombre);
      toast.success(`Bienvenid@, ${data.nombre}`, {icon: 'fa-solid fa-user-check'});
      router.push({ name: "home" });
    } else {
      toast.error("Usuario o contraseña incorrectos", {icon: 'fa-solid fa-user-times'});
      console.error("Error al iniciar sesión:", data.message);
    }
  } catch (error) {
    toast.error("Error interno del servidor");
    console.error("Error al iniciar sesión:", error);
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold;
  color: #333;
  height: 100%;
  margin: 0;
}

#video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}


.video-container {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  position: relative;
}

.login-form {
  position: absolute;
  top: 40vh;
  right: 12vw;
  z-index: 1;
  max-width: 400px;
  width: 90%;
  margin: auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 10px 10px 10px 30px; 
  margin-bottom: 16px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 1rem;
}

.input:focus {
  border-color: #4a90e2;
  outline: none;
}

.icon {
  position: absolute;
  left: 10px;
  transform: translateY(-50%);
  color: gray;
}

/* Botón de iniciar sesión */
.button {
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.button:hover {
  background-color: #357abd;
}

/* Ajustes para pantallas más pequeñas */
@media (max-width: 768px) {
  .login-form {
    top: 30vh;
    right: 4vw;
    max-width: 350px;
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .input {
    padding: 8px 10px 8px 30px; 
    font-size: 0.9rem;
  }

  .button {
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  .login-form {
    top: 25vh;
    right: 2vw;
    max-width: 300px;
  }

  h1 {
    font-size: 1.25rem;
  }

  .input {
    padding: 6px 10px 6px 30px; 
    font-size: 0.85rem;
  }

  .button {
    padding: 6px 12px;
  }
}
</style>
