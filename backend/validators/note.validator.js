import { z } from "zod";

export let noteSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(5, { message: "Title should be at least 5 characters" })
        .max(500, { message: "Title should not exceed 500 characters" }),
    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .min(10, { message: "Description should be at least 5 characters" })
        .max(500, { message: "Description should not exceed 500 characters" }),
})