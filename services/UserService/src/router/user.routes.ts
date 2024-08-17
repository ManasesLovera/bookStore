import { Router } from "express";
import { getAllUser, createUser, Login, register} from "../controller/user.controller";

const router = Router()

router.get("/users", getAllUser)
router.post("/users", createUser)
router.post("/register", register)
router.post("/login", Login)


export default router