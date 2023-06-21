import { z } from "zod";

export const multiStepFormSchema = z.object({
  name: z.string().trim().nonempty().min(6).max(20),
  surName: z.string().trim().nonempty().min(6).max(20),
  linkedin: z.string().trim().url(),
  skills: z.array(z.string()).min(1)
})