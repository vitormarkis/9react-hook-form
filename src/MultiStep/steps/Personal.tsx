import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"
import { PatternFormat } from "react-number-format"

export function Personal() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>()

  return (
    <>
      <input
        {...register("name")}
        type="text"
        className="form-element-style"
        placeholder="Meu nome"
        autoFocus
        autoComplete="off"
        tabIndex={20}
      />
      {errors.name?.message ? <p>{errors.name.message}</p> : null}
      <input
        {...register("surName")}
        type="text"
        className="form-element-style"
        placeholder="Meu sobrenome"
        autoComplete="off"
        tabIndex={20}
      />
      {errors.surName?.message ? <p>{errors.surName.message}</p> : null}
    </>
  )
}
