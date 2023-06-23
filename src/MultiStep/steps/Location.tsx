import { useFormContext, Controller } from "react-hook-form"
import { IFormValues } from "../App"
import { PatternFormat } from "react-number-format"

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
          <PatternFormat
            className="form-element-style"
            defaultValue={field.value}
            valueIsNumericString
            format="#####-###"
            placeholder="00000-000"
            onChange={e => {
              const newEvent = e.target.value.replace(/\D/g, "")
              field.onChange({ ...e, target: { ...e.target, value: newEvent } })
            }}
            onBlur={field.onBlur}
            tabIndex={20}
          />
        )}
      />
      {errors.zipCode?.message ? <p>{errors.zipCode.message}</p> : null}

      {/* <input
        {...register("zipCode")}
        type="text"
        className="form-element-style"
        placeholder="00.000-000"
        autoComplete="off"
        autoFocus
      />
      {errors.zipCode?.message ? <p>{errors.zipCode.message}</p> : null} */}
      <input
        {...register("state")}
        type="text"
        className="form-element-style"
        placeholder="Estado"
        autoComplete="off"
        tabIndex={20}
      />
      {errors.state?.message ? <p>{errors.state.message}</p> : null}
      <input
        {...register("city")}
        type="text"
        className="form-element-style"
        placeholder="Cidade"
        autoComplete="off"
        tabIndex={20}
      />
      {errors.city?.message ? <p>{errors.city.message}</p> : null}
      <input
        {...register("street")}
        type="text"
        className="form-element-style"
        placeholder="Rua"
        autoComplete="off"
        tabIndex={20}
      />
      {errors.street?.message ? <p>{errors.street.message}</p> : null}
    </>
  )
}
