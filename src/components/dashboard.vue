<template>
  <div>
    <div class="header">
      <img src="../../public/logotipo_hR.png" alt="Logo" class="header-logo" />
      <h1 class="header-title">PERSONAL INGRESADO A LA COMPAÑIA</h1>
      <button @click="logout" class="header-button">Cerrar sesión</button>
    </div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid"></div>
    </nav>
    <div class="container-table">
      <div class="row my-40">
        <div class="col-12">
          <div
            class="nav-bar d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <RouterLink
                :to="{ name: 'agregar' }"
                class="btn btn-outline-success p-2"
              >
                Agregar
              </RouterLink>
              <RouterLink
                :to="{ name: 'exportar' }"
                class="btn btn-outline-info p-2"
              >
                Exportar
              </RouterLink>
            </div>
            <form class="d-flex" @submit.prevent>
              <input
                v-model="query"
                class="form-control me-2"
                type="search"
                placeholder="Buscar Visitante"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success"
                type="button"
                @click="search"
              >
                Buscar
              </button>
            </form>
          </div>

          <br />
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">CÉDULA</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">APELLIDO</th>
                  <th scope="col">ENTIDAD</th>
                  <th scope="col">NÚM CEL</th>
                  <th scope="col">EPS</th>
                  <th scope="col">NÚM FICHA</th>
                  <th scope="col">ÁREA</th>
                  <th scope="col">MOTIVO VISITA</th>
                  <th scope="col">DISPOSITIVOS</th>
                  <th scope="col">NÚM PLACA DISPOSITIVO</th>
                  <th scope="col">SERIAL</th>
                  <th scope="col">FECHA INGRESO</th>
                  <th scope="col">OBSERVACIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="visitor in filteredVisitors"
                  :key="visitor.idvisitante"
                >
                  <td>{{ visitor.idvisitante }}</td>
                  <td>{{ visitor.cedula }}</td>
                  <td>{{ visitor.nombre }}</td>
                  <td>{{ visitor.apellido }}</td>
                  <td>{{ visitor.entidad }}</td>
                  <td>{{ visitor.celular }}</td>
                  <td>{{ visitor.eps }}</td>
                  <td>{{ visitor.numero_ficha }}</td>
                  <td>{{ visitor.area }}</td>
                  <td>{{ visitor.motivo_visita }}</td>
                  <td>{{ visitor.dispositivo }}</td>
                  <td>{{ visitor.num_placa_dispositivo }}</td>
                  <td>{{ visitor.serial }}</td>
                  <td>{{ visitor.fecha_ingreso }}</td>
                  <td>{{ visitor.observaciones }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer class="bg-primary text-center text-black d-inline">
            <p>Copyright © C&C SERVICES 2024 All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const token = ref('');
const visitors = ref([]);
const query = ref('');
const filteredVisitors = ref([]);

// Función para obtener los datos del usuario
const fetchUserData = async () => {
  token.value = localStorage.getItem('token') || '';
  if (!token.value) {
    router.push({ name: 'login' });
    toast.error('Debe iniciar sesión');
  }
};
// Función para obtener los visitantes
const fetchVisitors = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/visitantes');
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();
    if (Array.isArray(data)) {
      visitors.value = data;
      filteredVisitors.value = data; // Inicializa lo
    } else {
      console.error('Los datos no son un array:', data);
    }
  } catch (error) {
    console.error('Error en fetchVisitors:', error);
  }
};

// Método de búsqueda
const search = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/visitantes/search?query=${encodeURIComponent(query.value)}`);
    if (!response.ok) throw new Error('Error en la búsqueda');
    const data = await response.json();
    if (Array.isArray(data)) {
      filteredVisitors.value = data;
    } else {
      console.error('Los datos no son un array:', data);
    }
  } catch (error) {
    console.error('Error en search:', error);
  }
};

// Función de logout
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nombre');
  router.push({ name: 'login' });
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchUserData();
  fetchVisitors();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.header {
  display: flex;
  align-items: center; /* Centra verticalmente */
  justify-content: space-between; /* Espaciado entre los elementos */
  padding: 20px;
  background-color: #f8f9fa; /* Color de fondo */
  border-bottom: 2px solid #007bff; /* Línea inferior */
}

.header-logo {
  width: 200px; 
  height: auto; 
}

.header-title {
  flex: 1; /* Permite que el título tome el espacio disponible */
  text-align: center; /* Centra el texto horizontalmente */
  margin: 0; /* Elimina margen por defecto */
  color: #343a40; /* Color del texto */
}

.header-button {
  background-color: #007bff; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  border: none; /* Sin borde */
  padding: 10px 15px; /* Relleno */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Efecto de transición */
}

.header-button:hover {
  background-color: #0056b3; /* Color al pasar el ratón */
}

hr {
  border: 2px solid #017bab;
}

h1 {
  width: 850px;
  height: 85px;
  border-radius: 50%;
  margin: 0;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 10px;
  font-size: xx-large;
}

.container_img {
  width: 250px;
  height: 85px;
  border-radius: 50%;
  margin: 3%;
  border: 2px solid #fff;
  display: inline-block;
  position: relative;
  top: -30px;
  right: 3vh;
}

.container_imgclaro {
  width: 150px;
  height: 10px;
  border-radius: 50%;
  margin: 3%;
  border: 2px solid #fff;
  display: inline-table;
  position: relative;
  top: -30px;
  left: 130vh;
}

.form-login {
  width: 1000px;
  height: auto; /* Cambiado a auto para adaptarse al contenido */
  background: #f6f7f8;
  margin: auto;
  margin-top: 2px;
  box-shadow: 7px 13px 37px rgb(0, 0, 0);
  padding: 20px 30px;
}

.form-control,
.form-select,
.form-control-observacion {
  width: 100%;
  border: 2px solid #017bab;
  margin-bottom: 15px;
  padding: 11px;
  background: #99999980;
  font-size: 14px;
  font-weight: bold;
  color: rgba(12, 2, 2, 0.747);
  text-align: center;
}

.form-login label {
  text-align: center;
  width: 100%;
  font-size: 15px;
  color: rgba(12, 2, 2, 0.726);
}

.container-table {
  width: 100%;
  border: 2px solid #0278a7;
  padding: 1em;
  margin-bottom: 15px;
  background: #fffafa;
  font-size: 12px;
  font-weight: bold;
  color: rgba(12, 2, 2, 0.747);
  text-align: justify;
}

.table-responsive {
  max-width: 100%; /* Limita el ancho del contenedor */
  max-height: 550px; /* Altura máxima para el desplazamiento vertical */
  overflow-x: auto; /* Permite el desplazamiento horizontal */
  overflow-y: auto; /* Permite el desplazamiento vertical */
}

.table {
  width: 100%;
  table-layout: auto; /* Permite que las columnas se ajusten automáticamente */
  border-collapse: collapse; /* Para que no haya espacios entre celdas */
}

.table th,
.table td {
  border: 2px solid #a7b4b9; /* Borde para filas y columnas */
  padding: 10px;
  text-align: justify; /* Justifica el texto en las celdas */
}

.table th {
  position: sticky; /* Fijar la cabecera */
  top: 0; /* Para que se quede en la parte superior */
  background-color: #7a96b3; /* Color de fondo para la cabecera */
  z-index: 10; /* Asegura que esté por encima de otras filas */
}

.navbar {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #5782a7;
  border: none;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.form-control {
  margin: 0 auto;
  border-radius: 20px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn-outline-success {
  border-radius: 15px;
  border: 2px solid #28a745;
  background: #23ad58;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-success:hover {
  background-color: #14441f;
  color: white;
}

.btn-outline-info {
  border-radius: 15px;
  border: 2px solid #288ea7;
  background: #2386ad;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-info:hover {
  background-color: #141744;
  color: white;
}

</style>
