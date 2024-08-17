import { Router } from "express";
import { createUser, getAllUser, Login } from "../controller/user.controller";

const router = Router()

router.post("/login", Login)
router.post("/users", createUser)
router.get("/users", getAllUser)


export default router