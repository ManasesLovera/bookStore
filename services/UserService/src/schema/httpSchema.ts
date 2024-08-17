import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "name is required").max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const getUserSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
});

export const httpGetAllUsersSchema = z.object({
  headers: z.object({
    authorization: z.string(),
  }).strict(),
  method: z.literal("GET"),
  route: z.literal("/users"),
  queryParameters: z.object({}).strict(),
}).strict();