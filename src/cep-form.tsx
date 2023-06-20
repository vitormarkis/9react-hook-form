import { ICepFormInput, cepSchema, defaultValues } from "./schemas/cepSchema"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect } from "react"
import { APICep } from "./types/cep"

export function App() {
  const {
    handleSubmit,
    register,
    formState,
    reset,
    watch,
    setValue,
    clearErrors,
    setError,
  } = useForm<ICepFormInput>({
    defaultValues,
    resolver: zodResolver(cepSchema),
    criteriaMode: "firstError",
    mode: "onSubmit",
  })

  const {
    errors,
    isDirty: isFormValuesModified,
    isSubmitting: isSubmittingForm,
  } = formState

  const cep = watch("cep")

  console.log("errors", errors)

  const fetchAddress = useCallback(
    (cep: string): Promise<APICep> =>
      new Promise((resolve, reject) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => {
            if (!response.ok) reject(response)
            response.json().then(data => resolve(data as APICep))
          })
          .catch(error => reject(error))
      }),
    []
  )

  useEffect(() => {
    if (cep.length === 8) {
      fetchAddress(cep)
        .then(data => {
          if ("erro" in data) {
            return setError("cep", {
              message: "Não foi encontrado nenhuma informação com este CEP",
            })
          }
          console.log("Encontro CEP", data)
          clearErrors("cep")
          setValue("address", data.logradouro, { shouldValidate: true })
          setValue("city", data.localidade, { shouldValidate: true })
          setValue("district", data.bairro, { shouldValidate: true })
          setValue("state", data.uf, { shouldValidate: true })
        })
        .catch(error => {
          console.log("Nao encontrou CEP", error)
        })
    }
  }, [cep, fetchAddress])

  const submitHandler: SubmitHandler<ICepFormInput> = async formData => {
    console.log("formData")
    console.log(formData)
  }

  return (
    <div className="bg-slate-900 min-h-screen grid place-items-center text-white">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col  gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800"
        >
          <input
            {...register("cep")}
            type="text"
            maxLength={9}
            className="form-element-style"
            placeholder="00000-000"
          />
          {errors.cep ? <p>{errors.cep.message}</p> : null}
          <input
            {...register("city")}
            type="text"
            className="form-element-style"
            placeholder="Cidade"
          />
          {errors.city ? <p>{errors.city.message}</p> : null}
          <input
            {...register("district")}
            type="text"
            className="form-element-style"
            placeholder="Bairro"
          />
          {errors.district ? <p>{errors.district.message}</p> : null}
          <input
            {...register("address")}
            type="text"
            className="form-element-style"
            placeholder="Endereço"
          />
          {errors.address ? <p>{errors.address.message}</p> : null}
          <input
            {...register("number")}
            type="number"
            className="form-element-style"
            placeholder="Numero"
          />
          {errors.number ? <p>{errors.number.message}</p> : null}
          <input
            {...register("state")}
            type="text"
            className="form-element-style"
            placeholder="Estado"
          />
          {errors.state ? <p>{errors.state.message}</p> : null}
          <div className="flex [&>*]:flex-1 gap-6">
            <button
              type="submit"
              className="form-element-style button-style bg-emerald-500 disabled:bg-emerald-700"
              onClick={() => console.log("uhsdfusd")}
              disabled={isSubmittingForm}
            >
              Enviar
            </button>
            <button
              type="button"
              className="form-element-style button-style bg-amber-500 disabled:bg-amber-600"
              disabled={!isFormValuesModified}
              onClick={() => reset(defaultValues)}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
      {/* <PrintForm data={data} /> */}
      {/* <PrintForm data={errors} /> */}
    </div>
  )
}
