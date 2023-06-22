import { z } from "zod"

export const multiStepFormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Este campo é obrigatório.")
    .min(6, "Este campo precisa de pelo menos 6 caracteres.")
    .max(20, "Este campo não pode passar de 20 caracteres."),
  surName: z
    .string()
    .trim()
    .nonempty("Este campo é obrigatório.")
    .min(6, "Este campo precisa de pelo menos 6 caracteres.")
    .max(20, "Este campo não pode passar de 20 caracteres."),
  zipCode: z
    .string()
    .trim()
    .nonempty("Este campo é obrigatório.")
    .transform(zipCode => zipCode.replace(/\D/g, "")),
  state: z.string().trim().nonempty("Este campo é obrigatório."),
  city: z.string().trim().nonempty("Este campo é obrigatório."),
  street: z.string().trim().nonempty("Este campo é obrigatório."),
  linkedin: z.string().trim().url("Insira uma URL válida."),
  skills: z.array(z.string()).min(1, "Escolha pelo menos 1 especialização."),
})
