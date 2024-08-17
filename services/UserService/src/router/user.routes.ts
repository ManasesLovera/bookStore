import { Router } from "express";
import { createUser, getAll } from "../controller/user.controller";

const router = Router()

router.post("/users", createUser)
router.get("/users", getAll)


export default router