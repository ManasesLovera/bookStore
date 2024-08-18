import { Router } from "express";
import { getAllUser, createUser, Login, register, getUserProfile} from "../controller/user.controller";

const router = Router()

router.get("/users", getAllUser)
router.post("/users/:username", getUserProfile)
router.post("/users", createUser)
router.post("/register", register)
router.post("/login", Login)


export default router