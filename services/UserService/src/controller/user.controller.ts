import { Request, Response } from "express"
import { pool } from "../database/postgres"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const JWT_SECRET = process.env.SECRET_KEY || "7238ad21dcd7802a527bdb1701b12f89"
let hashEncrypt = 12

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

export const Login = async (req: Request, res: Response) => {
 const { email, password} = req.body 
  try {
    const result = await pool.query("SELECT * FROM  users WHERE email = $1", [email])
     
    const user =  result.rows[0];

    if(result.rows.length === 0) {
     return res.status(401).json({message: "Invalid credential"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(401).json({message: "Invalid credencials"})
    }
   
    const token  = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "24hr"})

    res.json({token})
  } catch (error) {
   return res.status(500).json({message: "Internal Erorr Database"})
  }
}


export const Register = async (req: Request, res:Response) => {
 const {name, email, password} = req.body
   
 if(!name || !email || !password) {
  return res.status(401).json({message: "Name, email, and password are required"})
 }

  try {
   const user = await pool.query("SELECT * FROM users WHERE email  = $1", [email])
   if(user.rows.length > 0) {
    res.status(400).json({message: "Email is al ready registered"})
   }

   const hashPassword =  await bcrypt.hash(password, hashEncrypt) 
    
   const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, hashPassword]
   )

   const newUser = result.rows[0];
   
   const token = jwt.sign({id: newUser.id}, JWT_SECRET, {expiresIn: "24hr"})
   
   res.status(201).json(({user: {id: newUser.id, name: newUser.name, email: newUser.email}, token}))
  } catch (error) {
   return res.status(500).json({message: "Internal Erorr Database"})
  }
}