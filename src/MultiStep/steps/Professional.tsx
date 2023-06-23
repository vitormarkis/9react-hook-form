import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"
import { Input } from "../components/Input"

export function Professional() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormValues>()

  return (
    <>
      <Input
        {...register("linkedin")}
        type="text"
        placeholder="Linkedin"
        autoComplete="off"
        tabIndex={20}
        label="Linkedin:"
        autoFocus
        errorMessage={errors.linkedin?.message}
      />
    </>
  )
}
