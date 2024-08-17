import pkg from "pg"

const { Pool } = pkg

const config = {
  user: 'watercubz',
  host: 'localhost', 
  password: 'sosadev17',
  database: 'bookStore',
  port: 5432, 
}
console.log(config);

const pool = new Pool(config)

export { pool }