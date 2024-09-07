    import dotenv from 'dotenv';

    dotenv.config();
    //TODO: NO OLVIDES AGREGAR EL PORT EN LA VARIABLE DE ENTORNO
    //2TODO: DEBEMOS COORDINAR LO DEL JWT_SECRET, COLOCAR TAMBIEN LA VARIABLE DE ENTORNO EN EL ARHCIVO EXAMPLE.ENV
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined... please check enviroment vars');
    }else{}


    export const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    
    };
