import Express, {  Request, Response, json } from "express";
import users from "../src/router/user.routes"
import { valideMiddleware } from "./middleware/cors";

const app = Express()
app.use(Express.json())
valideMiddleware()

app.use("/api/v1", users)

// app.use("/", (req: Request, res: Response) => {
 //  res.send("Hewllo")
 // })

 const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
 console.log(`server is running on port http://localhost:${PORT}`);
 
})