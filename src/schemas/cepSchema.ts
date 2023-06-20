import { DefaultValues, AsyncDefaultValues } from "react-hook-form"
import { z } from "zod"

const stringToNumber = (value: unknown) => {
  if (value === "") return value

  const onlyNumbers = String(value).replace(/\D/g, "")
  const parseValue = z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .safeParse(onlyNumbers)
  return parseValue.success ? parseValue.data : value
}

export const cepSchema = z.object({
  cep: z.string().min(2),
  state: z.string().trim().max(2),
  city: z.string().trim().min(2),
  district: z.string().trim().min(2),
  address: z.string().trim().min(2),
  number: z.string().min(2),
})

export type ICepFormInput = z.input<typeof cepSchema>
export type ICepFormOutput = z.output<typeof cepSchema>

/**
 * Constants
 */
export const defaultValues = {
  cep: "",
  state: "",
  city: "",
  district: "",
  address: "",
  number: "",
}
