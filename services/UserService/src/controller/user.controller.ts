import express, { Request, Response } from "express";
import { pool } from "../database/postgres";

import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

import bcrypt from "bcrypt";

const JWT_SECRET = process.env.SECRET_KEY || "";
let hashEncrypt = 12;

export const getAllUser = async (req: Request, res: Response) => {
    
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");

    res.status(200).json({
      message: "users",
      users: result.rows
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error Database" });
  }  
};


// export const createUser = async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;

//   if(!username || !email || !password) {
//     return res.status(400).json({ 
//         error: "Missing Required Fields",
//         message: "Both 'username' and 'email' are required fields."
//     });
//   }
//   try {
     
//     const hashPassword = await bcrypt.hash(password, hashEncrypt);

//     const response = await pool.query(
//       "INSERT INTO users (username, email, password_hash) VALUES ($1,$2,$3)",
//       [username, email, hashPassword]
//     );
//     console.log(response.rows[0]);
//     res.json({
//       message: "User created successfully",
//       body: {
//         user: { username, email },
//       },
//     });
//   } catch (error) {

//     console.error("Error creating user:", error);

//     return res.status(500).json({ message: "Internal Erorr Database" });
//   }
// };



export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credencials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24hr" });

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Erorr Database" });
  }
};


export const register = async (req: Request, res: Response) => {
  const { username, email, password, firstname, lastname } = req.body;
  
  console.log("req.body>>>>>", req.body)
  if (!username || !email || !password || !firstname || !lastname) {
    return res
      .status(401)
      .json({ message: "Missing some information, please check" });
  }

  try {
          console.log('starting postgress process')
          // res.send({message:'good'});
          const userEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

          const userUserName = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if ((userEmail.rows.length > 0) || (userUserName.rows.length > 0)) {
      res.status(400).json({ message: "Current user information already exist." });
    }

    const hashPassword = await bcrypt.hash(password, hashEncrypt);
    console.log('Trying to insert data:::');
    const result = await pool.query(
      "INSERT INTO users (username, firstname, lastname, email, password_hash) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [username, firstname, lastname, email, hashPassword]
    );

    const newUser = result.rows[0];

    // const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
    //   expiresIn: "24hr",
    // });
    console.log('USER WAS REGISTER SUCCESFULLY: ', newUser);
    res
      .status(201)
      .json({
        user: {  username: newUser.username, email: newUser.email }
      });
  } catch (error) {
    console.log("**********error*********")
    console.log(error);
    console.log("**********error*********")
    res.status(500).json({ message: "Internal Server Error" });
  }
};