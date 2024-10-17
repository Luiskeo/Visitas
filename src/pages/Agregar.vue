<template>
  <div class="container">
    <form
      @submit.prevent="submitForm"
      class="form-horizontal"
      autocomplete="off"
    >
      <h1>INGRESA VISITANTE</h1>
      <section class="form-login row">
        <div class="col-md-4 form-group">
          <label for="cedula" class="control-label"><b>DOCUMENTO</b></label>
          <input
            v-model="formData.cedula"
            type="number"
            class="form-control"
            id="cedula"
            required
            placeholder="Digite el número de documento"
            @input="checkCedula"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="nombre" class="control-label">NOMBRE</label>
          <input
            v-model="formData.nombre"
            type="text"
            class="form-control"
            id="nombre"
            required
            placeholder="Digite el nombre"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="apellido" class="control-label">APELLIDO</label>
          <input
            v-model="formData.apellido"
            type="text"
            required
            class="form-control"
            id="apellido"
            placeholder="Digite el apellido"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="entidad" class="control-label">ENTIDAD</label>
          <input
            v-model="formData.entidad"
            type="text"
            class="form-control"
            id="entidad"
            placeholder="Digite la entidad de la que proviene"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="celular" class="control-label">CELULAR</label>
          <input
            v-model="formData.celular"
            type="number"
            class="form-control"
            id="celular"
            placeholder="Digite el celular"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="eps" class="control-label">EPS</label>
          <input
            v-model="formData.eps"
            type="text"
            class="form-control"
            id="eps"
            placeholder="Digite la EPS"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="area" class="control-label">ÁREA A VISITAR</label>
          <input
            v-model="formData.area"
            type="text"
            class="form-control"
            id="area"
            required
            placeholder="Digite el área que va a visitar"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="motivo_visita" class="control-label"
            >MOTIVO DE VISITA</label
          >
          <input
            v-model="formData.motivo_visita"
            type="text"
            class="form-control"
            id="motivo_visita"
            required
            placeholder="Digite el motivo de la visita"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="dispositivo" class="control-label"
            >DISPOSITIVO A INGRESAR</label
          >
          <input
            v-model="formData.dispositivo"
            type="text"
            class="form-control"
            id="dispositivo"
            placeholder="Digite el dispositivo que ingresa"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="serial" class="control-label">NÚMERO DE SERIAL</label>
          <input
            v-model="formData.serial"
            type="number"
            class="form-control"
            id="serial"
            placeholder="Digite el serial"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="fecha_ingreso" class="control-label"
            >FECHA DE INGRESO</label
          >
          <input
            v-model="formData.fecha_ingreso"
            type="datetime-local"
            class="form-control"
            id="fecha_ingreso"
            required
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="observaciones" class="control-label">OBSERVACIÓN</label>
          <textarea
            v-model="formData.observaciones"
            id="observaciones"
            class="form-control-observacion"
            max="254"
            placeholder="Digite la observación"
          ></textarea>
        </div>
        <div class="col-md-12 text-center">
          <button type="button" class="btn btn-outline-dark" @click="goBack">
            <i class="bi bi-reply-all-fill"></i> Cancelar
          </button>
          <button type="submit" class="btn btn-outline-primary">
            <i class="bi bi-person-check-fill"></i>Guardar
          </button>
        </div>
      </section>
    </form>
    <br />
    <hr />
    <footer class="bg-primary text-center text-black d-inline">
      <p>Copyright © C&C SERVICES 2024 All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../router/Rutas";
import { useToast } from "vue-toastification";

const toast = useToast()

const formData = ref({
  cedula: "",
  nombre: "",
  apellido: "",
  entidad: "",
  celular: "",
  eps: "",
  area: "",
  motivo_visita: "",
  dispositivo: "",
  serial: "",
  fecha_ingreso: "",
  observaciones: "",
});

// Método para manejar el envío del formulario
const submitForm = async () => {
  try {
    const response = await fetch("http://172.16.0.115:3000/api/visitantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });
    if (!response.ok) {
      toast.error('Error interno del servidor')
      throw new Error("Error en el envío de datos");
    }
    const result = await response.json();
    toast.success('Datos guardados con exito')
    console.log("Datos guardados con éxito:", result);
    resetForm();
  } catch (error) {
    toast.error('Error interno del servidor')
    console.error("Error al guardar los datos:", error);
  }
};

const resetForm = () => {
  formData.value = {
    cedula: "",
    nombre: "",
    apellido: "",
    entidad: "",
    celular: "",
    eps: "",
    area: "",
    motivo_visita: "",
    dispositivo: "",
    serial: "",
    fecha_ingreso: "",
    observaciones: "",
  };
};



//Funcion para autocompletar agregando por cedula
const checkCedula = async () => {
  if (formData.value.cedula) {
    try {
      const response = await fetch(`http://172.16.0.115:3000/api/visitantes/cedula/${formData.value.cedula}`);
      const visitor = await response.json();
      if (visitor) {
        formData.value.nombre = visitor.nombre;
        formData.value.apellido = visitor.apellido;
        formData.value.entidad = visitor.entidad;
        formData.value.celular = visitor.celular;
        formData.value.eps = visitor.eps;
        formData.value.area = visitor.area;
      } else{
        resetForm();
      }
    } catch (error) {
      console.error("Error al buscar el visitante:", error);
    }
  } else {
    resetForm(); // Resetea el formulario si la cédula está vacía
  }
};

const goBack = () => {
  router.go(-1);
};
</script>
<style scoped>

/* contenido responsivo */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Estilos generales */
html, body {
  display: flex;
  justify-content: center;
  align-items: center; /* Centrar verticalmente */
  min-height: 100vh; /* Altura mínima igual a la altura de la ventana */
  margin: 0;
  background-color: #2d7ce4 !important; /* Fondo global */
}

.container {
  max-width: 1200px;
  width: 100%; /* Ocupar todo el ancho disponible */
  padding: 20px;
  background-color: #d8d9da;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 50px 0px 50px 120px; /* Centrará el contenedor horizontal y verticalmente */
}



/* Formulario de login */
.form-login {
  margin-top: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.control-label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
.form-control {
  width: 100%;
  padding: 12px;
  border: 2px solid #afbdca;
  border-radius: 8px;
  background-color: #f8fafa;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.form-control:focus {
  border-color: #90b3d8;
  box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
  background-color: #e9f5ff;
}
.form-control-observacion {
  width: 100%;
  border: 2px solid #aac7e5;
  border-radius: 8px;
  padding: 12px;
  background-color: #f8f9fa;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.form-control-observacion:focus {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
  background-color: #e9f5ff;
}
.btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}
.btn-outline-dark {
  border: 2px solid #343a40;
  color: #343a40;
  background-color: transparent;
}
.btn-outline-dark:hover {
  background-color: #343a40;
  color: white;
}
.btn-outline-primary {
  border: 2px solid #007bff;
  color: #007bff;
  background-color: transparent;
}
.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}
footer p {
  margin: 0;
  font-size: 14px;
}

/* Eliminar el padding */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Media Queries para hacerlo más responsive */
@media (max-width: 768px) {
  .container {
    padding: 15px;
    max-width: 90%; /* Ocupará el 90% del ancho de la pantalla */
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
    max-width: 100%; /* Ocupará el ancho completo en pantallas muy pequeñas */
  }
}

</style>

