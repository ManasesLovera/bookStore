import pkg from "pg"

const { Pool } = pkg

const config = {
  user: '',
  host: 'localhost', 
  password: '',
  database: '',
  port: 5432, 
}

const pool = new Pool(config)

export { pool }