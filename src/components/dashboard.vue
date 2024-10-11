<template>
  <div>
    <h1 class="text-center text-black-10">PERSONAL INGRESADO A LA COMPAÑIA</h1>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid"></div>
    </nav>
    <div class="container-table">
      <div class="row my-40">
        <div class="col-12">
          <!-- Aquí van los botones y la barra de búsqueda -->
          <div
            class="nav-bar d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <a href="/agregar" class="btn btn-outline-success me-2">
                <i class="bi bi-person-plus-fill"></i> Agregar
              </a>
              <a href="/export" class="btn btn-outline-info">
                <i class="bi bi-download"></i> Exportar
              </a>
            </div>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
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
                <tr v-for="visitor in visitors" :key="visitor.idvisitante">
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
            <p>Copyright © C&C SERVICES 2022 All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = ref('');
const visitors = ref([]);

const fetchUserData = async () => {
  token.value = localStorage.getItem('token') || '';
  if (!token.value) {
    router.push({ name: 'login' });
  }
};

const fetchVisitors = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/visitantes');
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();
    if (Array.isArray(data)) {
      visitors.value = data;
    } else {
      console.error('Los datos no son un array:', data);
    }
  } catch (error) {
    console.error('Error en fetchVisitors:', error);
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nombre');
  router.push({ name: 'login' }); // Redirigir al usuario a la página de inicio de sesión
};

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

hr {
  border: 2px solid #017bab;
}

h1 {
  width: 850px;
  height: 85px;
  border-radius: 50%;
  margin: 0;
  border: 2px solid #fff;
  display: inline-block;
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
  border: 2px solid #017bab;
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
  background-color: #6c757d;
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
  border: 2px solid #28a745;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-success:hover {
  background-color: #28a745;
  color: white;
}
</style>
