import { useFormContext, Controller } from "react-hook-form"
import { IFormValues } from "../App"
import { PatternFormat } from "react-number-format"
import { Input } from "../components/Input"

export function Location() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IFormValues>()

  return (
    <>
      <Controller
        name="zipCode"
        control={control}
        render={({ field }) => (
          <Input
            asChild
            label="CEP:"
            errorMessage={errors.zipCode?.message}
            placeholder="00000-000"
            defaultValue={field.value}
            onChange={e => {
              const newEvent = e.target.value.replace(/\D/g, "")
              field.onChange(newEvent)
            }}
            onBlur={field.onBlur}
            autoFocus
          >
            <PatternFormat
              valueIsNumericString
              format="#####-###"
            />
          </Input>
        )}
      />

      <Input
        {...register("state")}
        placeholder="Estado"
        label="Estado:"
        errorMessage={errors.state?.message}
      />
      <Input
        {...register("city")}
        placeholder="Cidade"
        label="Cidade:"
        errorMessage={errors.city?.message}
      />
      <Input
        {...register("street")}
        placeholder="Rua"
        label="Rua:"
        errorMessage={errors.street?.message}
      />
    </>
  )
}
