import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { PrintForm } from "./PrintForm"
import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createUserFormSchema } from "./formValidation"

const formCleaned: FormProps = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  techs: [{ description: "", name: "" }],
}

type FormProps = z.infer<typeof createUserFormSchema>

export function Banana() {
  const [data, setData] = React.useState({})
  const { register, handleSubmit, formState, reset, control, setFocus } =
    useForm<FormProps>({
      defaultValues: async () => {
        const response = await fetch("https://api.github.com/users/vitormarkis")
        const data = await response.json()
        return {
          name: data.name as string,
          surname: "rodrigues da silva",
          email: "vitormarkis@mentorcycle.com",
          password: "",
          confirmPassword: "vitor123",
          techs: [
            {
              description: "desc",
              name: "",
            },
          ],
        }
      },
      mode: "onSubmit",
      resolver: zodResolver(createUserFormSchema),
    })

  useEffect(() => {
    console.log("Focando no password")
    setFocus("password", {
      shouldSelect: true,
    })
  }, [setFocus])

  const {
    errors,
    isLoading: isLoadingDefaultFieldValues,
    isSubmitting: isSubmittingForm,
    isDirty: isFormValuesModified,
  } = formState

  const { append, fields, remove } = useFieldArray({
    control,
    name: "techs",
  })

  const submitHandler: SubmitHandler<FormProps> = async formData => {
    try {
      await new Promise(res => setTimeout(res, 200))

      setData(formData)
      setFocus("password", {
        shouldSelect: true,
      })
      reset({
        ...formCleaned,
        email: "@mentorcycle.com",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const dirtyFields = formState.dirtyFields
  /**
   * => dirtyFields (Object) <=
   * Ele compara os valores dos inputs com os do 'defaultValues'
   * ObjectRetorna um objeto com os inputs modificados
   * A chave são os campos que foram modificados
   * O valor é true para os campos modificados
   */

  const isDirty = formState.isDirty
  /**
   * => isDirty (Boolean) <=
   * False se os campos estão iguais ao 'defaultValues'
   * True se pelo um campo foi alterado
   */

  const submitCount = formState.submitCount
  /**
   * => submitCount (Number) <=
   * Começa com zero
   * Retorna o número de vezes que foram dados submits
   */

  console.log("errors", errors)

  return (
    <div className="bg-slate-900 min-h-screen grid place-items-center text-white">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        {isLoadingDefaultFieldValues ? (
          <div className="min-w-[24rem] grid place-items-center gap-4 p-6 rounded-lg shadow-md shadow-slate-800 bg-slate-950">
            Loading
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col  gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800"
            >
              <input
                {...register("name")}
                type="text"
                className="form-element-style"
                placeholder="Nome"
              />
              {errors.name ? <p>{errors.name.message}</p> : null}
              <input
                {...register("surname")}
                type="text"
                className="form-element-style"
                placeholder="Sobrenome"
              />
              {errors.surname ? <p>{errors.surname.message}</p> : null}
              <input
                {...register("email")}
                type="text"
                className="form-element-style"
                placeholder="seunome@mail.com"
              />
              {errors.email ? <p>{errors.email.message}</p> : null}
              <input
                {...register("password")}
                type="password"
                className="form-element-style"
                placeholder="Sua senha"
              />
              {errors.password ? <p>{errors.password.message}</p> : null}
              <input
                {...register("confirmPassword")}
                type="password"
                className="form-element-style"
                placeholder="Confirme sua senha"
              />
              {errors.confirmPassword ? (
                <p>{errors.confirmPassword.message}</p>
              ) : null}
              <div className="flex [&>*]:flex-1 gap-6">
                <button
                  type="submit"
                  className="form-element-style button-style bg-emerald-500 disabled:bg-emerald-700"
                  disabled={isSubmittingForm}
                >
                  Enviar
                </button>
                <button
                  type="button"
                  className="form-element-style button-style bg-amber-500 disabled:bg-amber-600"
                  disabled={!isFormValuesModified}
                  onClick={() => reset(formCleaned)}
                >
                  Limpar
                </button>
              </div>
            </form>
            <div className="flex flex-col w-full gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800">
              {fields.length === 0 ? (
                <button
                  className="flex-1 h-9 rounded-lg bg-emerald-100 text-emerald-600"
                  onClick={() => append({ description: "", name: "" })}
                >
                  Adicionar
                </button>
              ) : (
                fields.map((techField, index) => (
                  <div
                    key={techField.id}
                    className="flex flex-col w-full gap-4 flex-1 rounded-lg shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800"
                  >
                    <input
                      {...register(`techs.${index}.name`)}
                      type="text"
                      className="w-full h-6 text-sm"
                      placeholder="Nome da tecnologia"
                    />
                    {errors.techs?.[index] ? (
                      <p>{errors.techs[index]?.name?.message}</p>
                    ) : null}
                    <textarea
                      {...register(`techs.${index}.description`)}
                      className="bg-slate-800 p-2 w-full min-h-[100px] text-sm"
                      placeholder="Descrição da tecnologia"
                    />
                    <div className="flex gap-4">
                      <button
                        className="flex-1 h-9 rounded-lg bg-emerald-100 text-emerald-600"
                        onClick={() => append({ description: "", name: "" })}
                      >
                        Adicionar
                      </button>
                      <button
                        className="flex-1 h-9 rounded-lg bg-red-100 text-red-600"
                        onClick={() => remove(index)}
                      >
                        Remover
                      </button>
                    </div>

                    {errors.techs?.[index] ? (
                      <p>{errors.techs[index]?.description?.message}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <PrintForm data={data} />
    </div>
  )
}
