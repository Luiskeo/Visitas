import { createPool } from 'mysql2'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'T3cn0l0g142023*',
  database: 'visitas',
  waitForConnections: true,
  charset: 'utf8mb4',
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0
})


export default pool.promise()
