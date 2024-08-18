import Express, {  Request, Response } from "express";
import users from "../src/router/user.routes"
import { valideMiddleware } from "./middleware/cors";
import dotenv from "dotenv"
import morgan from "morgan"

dotenv.config()

const app = Express()
app.use(Express.json())
app.use(valideMiddleware())
app.use(morgan("combined"))


app.use("/api/v1", users)

app.use("/", (req: Request, res: Response) => {
  res.json(
    { 
      "name": "HELLO PEOPLE"
    }
  )
 })

 const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
 console.log(`server is running on port http://localhost:${PORT}`);
 
})