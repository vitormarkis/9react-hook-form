import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"

export function Location() {
  const { register, formState: { errors } } = useFormContext<IFormValues>()
  
  return (
    <>
      <input
        {...register("zipCode")}
        type="text"
        className="form-element-style"
        placeholder="00.000-000"
        autoComplete="off"
        autoFocus
      />
      {errors.zipCode?.message ? <p>{errors.zipCode.message}</p> : null}
      <input
        {...register("state")}
        type="text"
        className="form-element-style"
        placeholder="Estado"
        autoComplete="off"
      />
      {errors.state?.message ? <p>{errors.state.message}</p> : null}
      <input
        {...register("city")}
        type="text"
        className="form-element-style"
        placeholder="Cidade"
        autoComplete="off"
      />
      {errors.city?.message ? <p>{errors.city.message}</p> : null}
      <input
        {...register("street")}
        type="text"
        className="form-element-style"
        placeholder="Rua"
        autoComplete="off"
      />
      {errors.street?.message ? <p>{errors.street.message}</p> : null}
    </>
  )
}