import { createPool } from 'mysql2'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'visitas',
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0
})


export default pool.promise()
