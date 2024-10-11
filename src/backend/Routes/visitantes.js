import express from 'express';
import pool from '../connect.js'; // Ajusta la ruta según la ubicación de tu conexión

const router = express.Router();

// Ruta para obtener los visitantes
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

export default router;
