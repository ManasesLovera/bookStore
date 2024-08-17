import Express, {  Request, Response } from "express";


const app = Express()

const PORT = process.env.PORT ?? 5000

app.use("/", (req: Request, res: Response) => {
 res.send("Hello")
})

app.listen(PORT, () => {
 console.log(`server is running on port http://localhost:${PORT}`);
 
})