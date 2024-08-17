import { Request, Response } from "express"
import { userData } from "../database/userData"

let users = [...userData]

export const createUser = (req: Request, res: Response) => {
   const {user:newUser} = req.body
   try {
    if(!newUser || Object.keys(newUser).length === 0) {
     return res.status(404).json({message: "user not found"})
    }
    users = newUser

    res.json(newUser)
   } catch (error) {
    return res.status(500).json({message: error})
   }
}

export const getAllUser = (req: Request, res: Response) => {
  try {
   if(!users || users.length === 0) {
    return res.status(404).json({message: "user not found"})
   }
   res.json(users)
  } catch (error) {
   return res.status(500).json({message: error})
  }
}