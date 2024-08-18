import axios from 'axios';
import { RequestHandler, Router, Request, Response } from 'express';
import { proxyRequest } from '../controllers/gatewayController';
import { authenticate } from '../middleware/authMIddleware';
import {serviceMap, ServicesMapType} from '../ServiceMap';

const router = Router();

// router.post('/createUser', proxyRequest);

// router.get('/getAllItems', authenticate as unknown as RequestHandler, proxyRequest);

router.all('/:apiname', async (req:Request, res:Response)=>{
    const {apiname}  = req.params;
    console.log('Api requested: ', apiname);
    if(apiname && apiname in serviceMap){
        const serviceUrl:string = serviceMap[apiname as keyof ServicesMapType]
            if(!serviceUrl){
                return res.status(404).send('Service not Found');
            }

            try{
                const url = `${serviceUrl}${req.originalUrl.replace(`${apiname}`,'')}`

                    const response = await axios({
                        method:req.method,
                        url,
                        data:req.body,
                        headers:req.headers,
                    });

                    res.send(response.data);
            }catch(err){console.log('ERROR: ',err)}
    }
    
})
export default router;
