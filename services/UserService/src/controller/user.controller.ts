import { Request, Response } from "express"
import { pool } from "../database/postgres"

export const getAllUser = async (req: Request, res: Response) => {
 try {
  const client =  await pool.connect();
  const result =  await client.query("SELECT * FROM users")

  res.status(200).json(result.rows)
 } catch (error) {
  return res.status(500).json({message: "Internal Error Database"})
 }
}

export const createUser = async (req: Request, res: Response) => {
  const {name, email, password} = req.body
   try {
    const response = await pool.query(
     "INSER INTO users  (name, email, password) VALUES ($1,$2,$3)",
     [name, email, password]
    )
    console.log(response);
    res.json({
     message: "User created successfully",
     body: {
      user: {name, email, password}
     }
    }) 
   } catch (error) {
    return res.status(500).json({message: "Internal Erorr Database"})
   }
}

