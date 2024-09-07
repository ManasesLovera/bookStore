import {Request, Response} from 'express';
import axios from 'axios';


export const proxyRequest = async (req: Request, res: Response)=>{

    try{
        const {method, originalUrl, body} = req;
        const serviceURL = `http://bookstore-services${originalUrl}`;

        const response = await axios({
            method,
            url:serviceURL,
            data:body,
        });

        res
            .status(200)
            .json(response.data);
    }
    catch(error:any){
        console.error('Ha pasado algo.... revisa que fuiste un loco e hiciste algo mal XD: ', error);
        res
            .status(error.response?.status || 500)
            .json({error:'Internal Server Error'});
    }
}