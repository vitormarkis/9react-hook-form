import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"

export function Professional() {
  const { register, formState: { errors } } = useFormContext<IFormValues>()
  
  return (
    <>
      <input
        {...register("linkedin")}
        type="text"
        className="form-element-style"
        placeholder="Linkedin"
        autoComplete="off"
      />
      {errors.linkedin?.message ? <p>{errors.linkedin.message}</p> : null}
    </>
  )
}