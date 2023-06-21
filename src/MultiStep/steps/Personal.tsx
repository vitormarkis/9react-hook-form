import { useFormContext } from "react-hook-form"
import { IFormValues } from "../App"

export function Personal() {
  const { register } = useFormContext<IFormValues>()
  
  return (
    <>
      <input
        {...register("name")}
        type="text"
        className="form-element-style"
        placeholder="First Name"
        autoComplete="off"
      />
    </>
  )
}