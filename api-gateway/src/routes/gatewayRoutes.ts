    import axios from 'axios';
    import express, { RequestHandler, Router, Request, Response } from 'express';
    // import { proxyRequest } from '../controllers/gatewayController';
    // import { authenticate } from '../middleware/authMIddleware';
    import {serviceMap, ServicesMapType} from '../ServiceMap';

    const router = Router();
    router.use(express.json());

    // router.get('/hola', (req: Request, res: Response) => {
    //     console.log('hello was called');
    //     res.send({ message: 'test' });
    // });

    router.all('/:apiname/:route/', async (req:Request, res:Response)=>{
        const {apiname}  = req.params;
        console.log('API NAME:::', apiname);
        if(apiname && apiname in serviceMap){
        
            const serviceUrl:string = serviceMap[apiname as keyof ServicesMapType]
            
                if(!serviceUrl){
                    return res.status(404).send('Service not Found');
                }

                try{
                    
                    const url = `${serviceUrl}${req.originalUrl.replace(`/api/${apiname}`, '')}`;
                        

                            console.log('*******api-gateway*******');
                            console.log('Crrent build url: ', url)
                            console.log('current method called: ', req.method);
                            console.log('current DATA:', req.body)
                             console.log('*******api-gateway*******');
                    
                        // const response = await axios({
                        //     method:req.method,
                        //     url,
                        //     data:req.body,
                        //     headers: {
                        //         'Content-Type': 'application/json', 
                        //         ...req.headers
                        //       },
                        //       timeout: 5000, 
                        // });
                        const response = await axios.post(url, req.body);

                        res.send(response.data);
                }catch(err){console.log('ERROR: ',err)}
        }else{
            console.log('error');
            res.status(500).json({error:'Internal Server Error'});
        }
        
    })
    // router.all('/:apiname/:route/:subroute', async (req:Request, res:Response)=>{
    //     const {apiname}  = req.params;
    //     console.log('API NAME:::', apiname);
    //     if(apiname && apiname in serviceMap){
        
    //         const serviceUrl:string = serviceMap[apiname as keyof ServicesMapType]
            
    //             if(!serviceUrl){
    //                 return res.status(404).send('Service not Found');
    //             }

    //             try{
                    
    //                 const url = `${serviceUrl}${req.originalUrl.replace(`/api/${apiname}`, '')}`;
                        
    //                         console.log('*******api-gatewa*******');
    //                         console.log('Crrent build url: ', url)
    //                         console.log('current method called: ', req.method);
    //                         console.log('current DATA:', req.body)
    //                         console.log('*******api-gatewa*******');
                        
    //                         const response = await axios({
    //                         method:req.method,
    //                         url,
    //                         data:req.body,
    //                         headers:req.headers,
    //                     });
                        

    //                     res.send(response.data);
    //             }catch(err){console.log('ERROR: ',err)}
    //     }else{
    //         console.log('error');
    //         res.status(500).json({error:'Internal Server Error'});
    //     }
        
    // })
    export default router;
