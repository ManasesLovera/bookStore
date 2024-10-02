import express, { Router } from "express";
import { getAllUser,  Login, register} from "../controller/user.controller";

export const router = Router()

router.use(express.json())

router.get("/users", getAllUser)
// router.post("/users/:username", getUserProfile)
// router.post("/users", createUser)
router.post("/register", register)
router.post("/login", Login)


