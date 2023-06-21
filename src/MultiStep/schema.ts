import { z } from "zod";

export const multiStepFormSchema = z.object({
  name: z.string().nonempty(),
  linkedin: z.string().url(),
  skills: z.array(z.string())
})