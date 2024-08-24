import axios from 'axios';
import { RequestHandler, Router, Request, Response } from 'express';
import { proxyRequest } from '../controllers/gatewayController';
import { authenticate } from '../middleware/authMIddleware';
import {serviceMap, ServicesMapType} from '../ServiceMap';

const router = Router();


router.get('/hola', (req: Request, res: Response) => {
    console.log('hello was called');
    res.send({ message: 'test' });
});

router.all('/:apiname/:route', async (req:Request, res:Response)=>{
    const {apiname}  = req.params;
    
    if(apiname && apiname in serviceMap){
       
        const serviceUrl:string = serviceMap[apiname as keyof ServicesMapType]
        
            if(!serviceUrl){
                return res.status(404).send('Service not Found');
            }

            try{
                
                const url = `${serviceUrl}${req.originalUrl.replace(`/api/${apiname}`, '')}`;
                       

            
                
                       const response = await axios({
                        method:req.method,
                        url,
                        data:req.body,
                        headers:req.headers,
                    });
                    

                    res.send(response.data);
            }catch(err){console.log('ERROR: ',err)}
    }else{
        res.status(500).json({error:'Internal Server Error'});
    }
    
})
export default router;
