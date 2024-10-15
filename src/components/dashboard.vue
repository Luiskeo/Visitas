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
          <div class="nav-bar d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <RouterLink :to="{ name: 'agregar' }" class="btn btn-outline-success p-2">
                Agregar
              </RouterLink>
              <div>
                <button class="btn btn-outline-info p-2" @click="downloadReport">
                  Descargar Reporte
                </button>
              </div>
            </div>
            <form class="d-flex" @submit.prevent>
              <input
                v-model="query"
                class="form-control me-2"
                type="search"
                placeholder="Buscar Visitante"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="button" @click="search">
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
                <tr v-for="visitor in filteredVisitors" :key="visitor.idvisitante">
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

// Función para descargar el reporte en CSV
const downloadReport = async () => {
  const response = await fetch ('http://localhost:3000/api/visitantes/download')
  if (!response.ok) throw new Error('Error al descargar el reporte');
  const data = await response.blob();
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'REPORTE_VISITAS_C&C.xlsx';
  link.click();
  URL.revokeObjectURL(url);
  console.log('Reporte descargado');
};

// Método de búsqueda
const search = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/visitantes/search?query=${encodeURIComponent(query.value)}');
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
/* General */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #007bff;
}

.header-logo {
  width: 150px;
  height: auto;
}

.header-title {
  flex: 1;
  text-align: center;
  margin: 0;
  color: #343a40;
}

.header-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header-button:hover {
  background-color: #0056b3;
}

/* Botones */
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
  border: 2px solid #2874a7;
  background: #2386ad;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-info:hover {
  background-color: #0cc5f3;
  color: white;
}


/* Tabla */
.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.table th {
  position: sticky;
  color: white;
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #4c6a8a;
  box-shadow: 0 2px 2px rgba(243, 240, 240, 0.1); /* Añadir una sombra para mayor claridad */
}


.table td, .table th {
  padding: 0px;
  border: 1px solid #dee2e6;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}


/* Formulario de búsqueda */
.form-control {
  border-radius: 20px;
  border: 1px solid #007bff;
  transition: box-shadow 0.3s, border-color 0.3s;
}

.form-control:focus {
  border-color: #90b3d8;
  box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
  background-color: #e9f5ff;
}

.form-control.me-2{
  text-align: center;
  background: rgb(219, 218, 218);
  
}

</style>
