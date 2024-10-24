import express from 'express';
import pool from '../connect.js'; // Ajusta la ruta según la ubicación de tu conexión
import { exportToExcel } from '../services/export.js';

const router = express.Router();

//Obtener todos los visitantes
router.get('/visitantes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM visitante');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

//Ingresar visitante
router.post('/visitantes', async (req, res) => {
  const { cedula, nombre, apellido, entidad, celular, eps, area, motivo_visita, dispositivo, serial, fecha_ingreso, observaciones } = req.body; 
  try {
    const [result] = await pool.query(
      'INSERT INTO visitante (cedula, nombre, apellido, entidad, celular, eps, area, motivo_visita, dispositivo, serial, fecha_ingreso, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [cedula, nombre, apellido, entidad, celular, eps, area, motivo_visita, dispositivo, serial, fecha_ingreso, observaciones]
    );
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
})

//Buscar visitantes por nombre o cédula
router.get('/visitantes/search', async (req, res) => {
  const query = req.query.query

  if (!query){
    return res.status(400).json({error: 'Datos de busqueda requeridos'})
  }
  try{
    const [rows] = await pool.query(
      'SELECT * FROM visitante WHERE nombre LIKE ? OR cedula LIKE ? OR apellido LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.json(rows)
  } catch (error){
    console.log(error)
    res.status(500).send('Error en la consulta')
  }
});

//Obtener visitantes por cedula para autorrellenar
router.get('/visitantes/cedula/:cedula', async (req, res) => {
  const { cedula } = req.params;
  
  try {
    const [rows] = await pool.query(
      'SELECT * FROM visitante WHERE cedula = ?',
      [cedula]
    );
    
    if (rows.length > 0) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.json(rows[0]); // Retorna el primer registro encontrado
    } else {
      res.status(404).send('Visitante no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

router.get("/visitantes/download", async (req, res) => {
  try {
      const buffer = await exportToExcel();  // Llama a la función que genera el Excel
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="Reporte_Visitas.xlsx"');
      res.send(buffer);  // Enviar el archivo al cliente
  } catch (error) {
      res.status(500).send('Error en la exportación: ' + error.message);
  }
});

export default router;
