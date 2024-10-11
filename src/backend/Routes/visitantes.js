import express from 'express';
import pool from '../connect.js'; // Ajusta la ruta según la ubicación de tu conexión

const router = express.Router();

// Ruta para obtener todos los visitantes
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

router.post('/visitantes', async (req, res) => {
  const { cedula, nombre, apellido, entidad, celular, eps, numero_ficha, area, motivo_visita, dispositivo, num_placa_dispositivo, serial, fecha_ingreso, observaciones } = req.body; 
  try {
    const [result] = await pool.query(
      'INSERT INTO visitante (cedula, nombre, apellido, entidad, celular, eps, numero_ficha, area, motivo_visita, dispositivo, num_placa_dispositivo, serial, fecha_ingreso, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [cedula, nombre, apellido, entidad, celular, eps, numero_ficha, area, motivo_visita, dispositivo, num_placa_dispositivo, serial, fecha_ingreso, observaciones]
    );
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
})

// Ruta para buscar visitantes por nombre o cédula
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

export default router;
