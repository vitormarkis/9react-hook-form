import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"

export function Personal() {
  const { register, formState: { errors } } = useFormContext<IFormValues>()
  
  return (
    <>
      <input
        {...register("name")}
        type="text"
        className="form-element-style"
        placeholder="First Name"
        autoComplete="off"
      />
      {errors.name?.message ? <p>{errors.name.message}</p> : null}
      <input
        {...register("surName")}
        type="text"
        className="form-element-style"
        placeholder="Last Name"
        autoComplete="off"
      />
      {errors.surName?.message ? <p>{errors.surName.message}</p> : null}
    </>
  )
}