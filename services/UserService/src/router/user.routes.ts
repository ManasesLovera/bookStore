import { Router } from "express";
import { createUser, getAllUser } from "../controller/user.controller";

const router = Router()

router.post("/users", createUser)
router.get("/users", getAllUser)


export default router