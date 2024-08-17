import pkg from "pg"

const { Pool } = pkg

const config = {
  user: "",
  host: "",
  password: "",
  database: ""
}

const pool = new Pool(config)

export { pool }