import {z} from "zod";

export const validationSchema = z
    .object({
        usernameInput: z.string().min(2, { message: "Brukernavn må ha minimum 2 tegn" }),

        emailInput: z.string().min(1, { message: "Email er obligatorisk" }).email({
            message: "Email must be valid",}),

        passwordInput: z.string().min(6, { message: "Må være minst 6 tegn"})
            .regex(new RegExp("[a-z]"), "Minst 1 liten tegn")
            .regex(new RegExp("[A-Z]"), "Minst 1 stor tegn")
            .regex(new RegExp("[0-9]"), "Minst 1 tall"),
    });

export type ValidationSchema = z.infer<typeof validationSchema>;

/*
 */