import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"
import { Input } from "../components/Input"

export function Personal() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>()

  return (
    <>
      <Input
        {...register("name")}
        type="text"
        placeholder="Seu nome"
        autoFocus
        autoComplete="off"
        tabIndex={20}
        label="Nome:"
        errorMessage={errors.name?.message}
      />
      <Input
        {...register("surName")}
        type="text"
        placeholder="Seu sobre nome"
        autoComplete="off"
        tabIndex={20}
        label="Sobrenome:"
        errorMessage={errors.surName?.message}
      />
    </>
  )
}
