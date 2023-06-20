import { capitalize } from "./helpers"
import { z } from "zod"

export const createUserFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(7, "Seu nome precisa ter mais do que 7 caracteres")
      .transform(capitalize),
    surname: z
      .string()
      .trim()
      .min(7, "Seu sobrenome precisa ter mais do que 7 caracteres")
      .transform(capitalize),
    email: z
      .string()
      .email("Formato de e-mail inválido")
      .nonempty("Este campo é obrigatório")
      .refine(
        email => email.endsWith("@mentorcycle.com"),
        "O email precisa ser da Mentor Cycle"
      ),
    password: z
      .string()
      .min(6, "Sua senha precisa ter pelo menos 6 caracteres")
      .max(20, "Sua senha não pode ter mais do que 20 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Sua senha precisa ter pelo menos 6 caracteres")
      .max(20, "Sua senha não pode ter mais do que 20 caracteres"),
    techs: z.array(
      z.object({
        name: z.string().nonempty("O nome da tecnologia é obrigatório"),
        description: z
          .string()
          .nonempty("A descrição da tecnologia é obrigatória")
          .min(20, "Fale mais sobre essa tecnologia"),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword)
      ctx.addIssue({
        code: "invalid_intersection_types",
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
      })
  })
