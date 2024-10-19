    export interface ServicesMapType 
    {
        userservices:string;
        bookcatalogservice:string;
        orderservice:string; 
        paymentservice:string; 
        notificationservice:string;
    }


    //enviroment PORT
    const userServicesPort= process.env.USERSERVICES_PORT || 3031;
    const bookCatalogServicePORT = process.env.ORDERCATALOG_PORT || 3032;
    const orderservicePORT = process.env.ORDERSERVICE_PORT || 3033;
    const notificationServicePORT = process.env.NOTIFICATIONSERVICE_PORT || 3033;
    const paymentServicePORT = process.env.PAYMENTSERVICE_PORT || 3034

    export const serviceMap:ServicesMapType = {
        'userservices':`http://user-service:${userServicesPort}`,
        'bookcatalogservice':`http://localhost:${bookCatalogServicePORT}`,
        'orderservice':`http://order-service:${orderservicePORT}`,
        'notificationservice':`http://localhost${notificationServicePORT}`,
        'paymentservice':`http://localhost${paymentServicePORT}`,
    }