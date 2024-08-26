import pkg from "pg"
import dotenv from "dotenv"
const { Pool } = pkg
dotenv.config()



const config = {
  user: process.env.POSTGRES_USER,
  host: 'db', 
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432, 
}

const pool = new Pool(config)

export { pool }