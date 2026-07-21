import { z } from 'zod';

export let signupSchema = z.object({
    name: z
        .string({ required_error: "Name is required"})
        .trim()
        .min(3, { message: "Name should be at least 3 characters long" }),
    email: z
        .email({ message: "Enter a valid email id" })
        .trim()
        .transform(email=>email.toLowerCase()),
    password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
});

export let loginSchema = z.object({
    email: z
        .email({ message: "Enter a valid email id" })
        .trim()
        .transform(email=>email.toLowerCase()),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Password is required" })
})