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
app.get('/pruebaservicio', (req:Request, res:Response)=>{
  res.send('servicio de usuario....');
});

app.use("/", (req: Request, res: Response) => {
  res.json(
    { 
      "name": "HELLO PEOPLE"
    }
  )
 })

 const PORT = process.env.USERSERVICES_PORT ?? 3031

app.listen(PORT, () => {
 console.log(`server is running on port http://localhost:${PORT}`);
 
})