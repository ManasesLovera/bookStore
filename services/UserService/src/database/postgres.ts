import pkg from "pg"

const { Pool } = pkg

const config = {
  user: 'postgres',
  host: 'localhost', 
  password: 'watercubzdev17',
  database: 'postgres',
  port: 5432, 
}

const pool = new Pool(config)

export { pool }