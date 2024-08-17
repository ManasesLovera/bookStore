import { z } from 'zod';

import { Request } from 'express';

interface BaseHttpRequest {
    headers: {
        authorization: string;
    };
    payload: any;
    queryParameters: any;
    multiParts: any;
  }
  
  export interface TypedRequest<T extends BaseHttpRequest> extends Request {
    
    body: T['payload'];
    headers: T['headers'];
    query: T['queryParameters'];
  }

  const HttpAuthentication = z.object({
    headers: z.object({
      authorization: z.string().nonempty("Authorization header is required"),
    }).strict(),
    method: z.literal("GET"),
    payload: z.object({
      user: z.any().optional(),  
    }).strict(),
    route: z.literal("/getAllItems"),
    queryParameters: z.object({}).strict(),
    multiParts: z.object({}).strict(),
  }).strict();

export type HttpAuthenticationRequest = z.infer<typeof HttpAuthentication>;