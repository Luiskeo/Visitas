<template>
  <div>
    <h1 class="text-center text-black-50">PERSONAL INGRESADO A LA COMPAÑIA</h1>
    <div class="container-table">
      <div class="row my-40">
        <div class="col-20">
          <a href="/agregar" class="btn btn-outline-success">
            <i class="bi bi-person-plus-fill"></i>
          </a>
          <a href="/export" class="btn btn-outline-info">
            <i class="bi bi-download"></i>
          </a>
          <br><br>

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
                <!-- Aquí puedes agregar botones para modificar y eliminar si es necesario -->
              </tr>
            </tbody>
          </table>
          
          <footer class="bg-primary text-center text-black d-inline">
            <p>Copyright © C&C SERVICES 2022 All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted} from 'vue';
import { useRouter} from 'vue-router';
import Toast from 'vue-toastification'


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
    console.log('Datos recibidos:', data); // Verifica los datos recibidos
    if (Array.isArray(data)) {
      visitors.value = data;
      if (data.length === 0) {
        console.warn('No se encontraron visitantes');
      }
    } else {
      console.error('Los datos no son un array:', data);
    }
  } catch (error) {
    console.error('Error en fetchVisitors:', error);
  }
};



const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nombre') 
  router.push({ name: 'login' }); // Redirigir al usuario a la página de inicio de sesión
}

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
hr{
  border: 2px solid #017bab;
}
h1{
  width: 850px;
  height: 85px;
  border-radius: 50%;
  margin: 3%;
  border:2px solid #fff;
  display:inline-block;
  position:relative;
  top: 10px;
  font-size:xx-large;
}
.container_img {
  width: 250px;
  height: 85px;
  border-radius: 50%;
  margin: 3%;
  border:2px solid #fff;
  display:inline-block;
  position:relative;
  top: -30px;
  right:3vh;
}
.container_imgclaro {
  width: 150px;
  height: 10px;
  border-radius: 50%;
  margin: 3%;
  border:2px solid #fff;
  display:inline-table;
  position:relative;
  top: -30px;
  left:130vh;
  
}

.form-login{
  width: 1000px;
  height: 1500px;
  background: #f6f7f8;
  margin: auto;
  margin-top: 2px;
  box-shadow: 7px 13px 37px rgb(0, 0, 0);
  padding: 20px 30px;
  
}

.form-control{
  width: 100%;
  border: 2px solid #017bab;
  margin-bottom: 15px;
  padding: 11px 160px;
  background:  #99999980;
  font-size: 14px;
  font-weight: bold;
  color: rgba(12, 2, 2, 0.747);
  text-align: center;
}

.form-control-observacion{
  width: 100%;
  height: 120px;
  border: 2px solid #017bab;
  margin-bottom: 15px;
  padding: 11px 160px;
  background:  #99999980;
  font-size: 14px;
  font-weight: bold;
  color: rgba(12, 2, 2, 0.747);
  text-align: center;
}

.form-select{
  width: 100%;
  border: 2px solid #017bab;
  margin-bottom: 15px;
  padding: 11px 160px;
  background:  #99999980;
  font-size: 14px;
  font-weight: bold;
  color: rgba(12, 2, 2, 0.747);
  text-align: center;

}
.form-login label{
  text-align: center;
  height: 10px;
  width: 100%;
  font-size: 15px;
  color: rgba(12, 2, 2, 0.726);
  
}
.container-table{
  max-width: 100%;
  max-height: 100%;
  border: 2px solid #017bab;
  padding: 1em;
  margin-bottom: 15px;
  background:  #fffafa;
  font-size: 12px;
  font-weight: bold;
  color: rgba(12, 2, 2, 0.747);
  text-align: center;
}

</style>
