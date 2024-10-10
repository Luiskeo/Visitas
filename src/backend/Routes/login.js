import { Router } from 'express';
import pool from '../connect.js';
import { generateToken } from '../services/token.js';

const loginRouter = Router();

loginRouter.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;
  
  try {
    const [rows] = await pool.query(
      'SELECT nombre, usuario, clave FROM usuarios WHERE usuario = ? AND clave = ?',
      [usuario, clave],
    )
    
    if (rows.length === 1) {
      const { nombre, usuario: dbUsuario, clave: dbClave } = rows[0];

      // Aquí deberías verificar la clave hasheada con bcrypt
      if (dbClave === clave) { // Para producción, usa bcrypt para comparar hashes
        const token = generateToken({ usuario: dbUsuario });
        return res.json({
          message: 'Inicio de sesión exitoso',
          nombre,
          usuario,
          token
        });
      }
    } else{
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default loginRouter;
