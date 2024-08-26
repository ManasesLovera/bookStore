import Express, {  Request, Response } from "express";
// import users from "../src/router/user.routes"
import { valideMiddleware } from "./middleware/cors";
import dotenv from "dotenv"
import morgan from "morgan"
import { router } from "./router/user.routes";
import { register } from "./controller/user.controller";

dotenv.config()

const app = Express()
app.use(Express.json())
app.use(valideMiddleware())
app.use(morgan("combined"))




 app.post("/register", register);



 const PORT = process.env.USERSERVICES_PORT ?? 3031

app.listen(PORT, () => {
 console.log(`server is running on port http://localhost:${PORT}`);
 
})