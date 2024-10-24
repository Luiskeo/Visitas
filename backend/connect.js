import { createPool } from 'mysql2'

const pool = createPool({
  host: '172.16.0.6',
  user: 'root',
  password: '*4b0g4d0s4s*',
  database: 'visitas',
  waitForConnections: true,
  charset: 'utf8mb4',
  connectionLimit: 10,
  queueLimit: 0
})


export default pool.promise()
