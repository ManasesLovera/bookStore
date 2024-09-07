    import express, {Request, Response} from 'express';
   
    import cors from 'cors';
    import gatewayRoutes from './routes/gatewayRoutes';
    // import gatewayRoutes from './routes/gatewayRoutes';
    import { config } from './config/config';


    const app = express();
    // const port = config.PORT || 3000;

    //Following line is temporary, will remove once complete the env file.
    const PORT =  config.PORT || 3000 ;

    app.use(cors());
    app.use(express.json());

    //TODO: UNA VEZ COMPLETEMOS EL GATEWAYROUTES, TEST THIS ROUTE
    // app.use('/api', gatewayRoutes);



    //test basic server:
    app.get('/helloWorld', (req:Request, res:Response)=>{

        res
            .status(200)
            .json({message:'Hello world'})
    });


    //apigateway connecting to routes

    app.use('/api', gatewayRoutes);

    app.listen(PORT, () => {
    console.log(`API Gateway running on port http://localhost:${PORT}`);
    });
