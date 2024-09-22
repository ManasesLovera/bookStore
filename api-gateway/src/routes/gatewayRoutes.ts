import axios from "axios";
import express, { RequestHandler, Router, Request, Response } from "express";

import { serviceMap, ServicesMapType } from "../ServiceMap";

const router = Router();
router.use(express.json());



router.all("/:apiname/:route/", async (req: Request, res: Response) => {
  const { apiname, route } = req.params;
  console.log("API NAME:::", apiname);
  console.log("ROUTE RECEIVED:::", route);
  if (apiname && apiname in serviceMap) {
    const serviceUrl: string = serviceMap[apiname as keyof ServicesMapType];

    if (!serviceUrl) {
      return res.status(404).send("Service not Found");
    }

    try {
      const url = `${serviceUrl}${req.originalUrl.replace(
        `/api/${apiname}`,
        ""
      )}`;

      console.log("*******api-gateway*******");
      console.log("Crrent build url: ", url);
      console.log("current method called: ", req.method);
      console.log("current DATA:", req.body);
      console.log("*******api-gateway*******");

      const response = await axios.post(url, req.body);

      res.send(response.data);
    } catch (err) {
      console.log("ERROR: ", err);
      res.status(500).json({errorMessage:`Server-error:${err}`})
    }
  } else {
    console.log("error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
