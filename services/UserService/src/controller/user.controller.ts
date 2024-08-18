import { Request, Response } from "express";
import { pool } from "../database/postgres";
import { loginSchema, userSchema } from "../schema/httpSchema";
import jwt from "jsonwebtoken";
import { httpGetAllUsersSchema } from "../schema/httpSchema";
import bcrypt from "bcrypt";
import { body } from "zod-endpoints";

const JWT_SECRET = process.env.SECRET_KEY || "";
let hashEncrypt = 12;

export const getAllUser = async (req: Request, res: Response) => {
     const Limit = req.query.limit

     const queryLimit = typeof Limit === "string" ? parseInt(Limit, 10) : 10

     if(isNaN(queryLimit)) {
      return res.status(400).json({ error: 'Invalid limit parameter' });
     }

  // const parserResult = httpGetAllUsersSchema.safeParse({
  //   headers: req.headers,
  //   method: req.method,
  //   payload: req.body,
  //   route: req.route?.path,
  //   queryParameters: req.query
  // })

  // if(!parserResult.success) {
  // return res.status(400).json({
  //   message: "Invalidd request data",
  //   errors: parserResult.error.errors
  // })
  // }
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");

    res.status(200).json({
      message: "",
      users: result.rows
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error Database" });
  }
};


export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }
  try {
     
    const hashPassword = await bcrypt.hash(password, hashEncrypt);

    const response = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1,$2,$3)",
      [username, email, hashPassword]
    );
    console.log(response.rows[0]);
    res.json({
      message: "User created successfully",
      body: {
        user: { username, email },
      },
    });
  } catch (error) {

    console.error("Error creating user:", error);

    return res.status(500).json({ message: "Internal Erorr Database" });
  }
};



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
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(401)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email  = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      res.status(400).json({ message: "Email is al ready registered" });
    }

    const hashPassword = await bcrypt.hash(password, hashEncrypt);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *",
      [username, email, hashPassword]
    );

    const newUser = result.rows[0];

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
      expiresIn: "24hr",
    });

    res
      .status(201)
      .json({
        user: { id: newUser.id, username: newUser.username, email: newUser.email },
        token,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Erorr Database" });
  }
};

