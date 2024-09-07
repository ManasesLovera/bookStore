    import { Request, Response, NextFunction } from 'express';
    import jwt from 'jsonwebtoken';
    import { HttpAuthenticationRequest, TypedRequest } from '../types/http-apigateway';
    import { config } from '../config/config';

    export const authenticate = (req: TypedRequest<HttpAuthenticationRequest>, res: Response, next: NextFunction) => {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authorization header is required' });
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token issues, check the token you sent' });
        }

        jwt.verify(token, config.JWT_SECRET!, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid Token' });
            }

            req.body.user = decoded;
            next();
        });
    };
