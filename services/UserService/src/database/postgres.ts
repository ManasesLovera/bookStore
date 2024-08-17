import pkg from "pg"

const { Pool } = pkg

const config = {
  user: 'watercubz',
  host: 'localhost', 
  password: 'mypassword',
  database: 'bookStore',
  port: 5432, 
}
console.log(config);

const pool = new Pool(config)

export { pool }