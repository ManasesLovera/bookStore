import { Request, Response } from "express"
import { userData } from "../database/userData"

let app = [...userData]

export const createUser = (req: Request, res: Response) => {
   const {user:newUser} = req.body
   try {
    if(!newUser || Object.keys(newUser).length === 0) {
     return res.status(404).json({message: "user not found"})
    }
    app = newUser

    res.json(newUser)
   } catch (error) {
    return res.status(500).json({message: error})
   }
}

export const getAll = (req: Request, res: Response) => {
  try {
   if(!app || app.length === 0) {
    return res.status(404).json({message: "user not found"})
   }
   res.json(app)
  } catch (error) {
   return res.status(500).json({message: error})
  }
}