import {z} from "zod";

export const validationSchema = z
    .object({
        emailInput: z.string().min(1, { message: "Email er obligatorisk" }).email({
            message: "Må være en gyldig email",
        }),
        passwordInput: z.string().min(6, { message: "Må innheolde minst 6 tegn"}),
    });

export type ValidationSchema = z.infer<typeof validationSchema>;