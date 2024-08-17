import cors from 'cors';

const ACCEPTED_ORIGINS = [
  "http://localhost:49302",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8080" 
];

export const valideMiddleware = (acceptedOrigins = ACCEPTED_ORIGINS) =>
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
      // Handle the case when origin is undefined
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error('Not allowed by CORS'), false); // Deny the origin
      }
    },
  });
