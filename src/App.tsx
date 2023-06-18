import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { PrintForm } from "./PrintForm"
import React from "react"
import { createFormData } from "./factories"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { capitalize } from "./helpers"

export const createUserFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(7, "Seu nome precisa ter mais do que 7 caracteres")
      .transform(capitalize),
    surname: z
      .string()
      .trim()
      .min(7, "Seu sobrenome precisa ter mais do que 7 caracteres")
      .transform(capitalize),
    email: z
      .string()
      .email("Formato de e-mail inválido")
      .nonempty("Este campo é obrigatório")
      .refine(
        email => email.endsWith("@mentorcycle.com"),
        "O email precisa ser da Mentor Cycle"
      ),
    password: z
      .string()
      .min(6, "Sua senha precisa ter pelo menos 6 caracteres")
      .max(20, "Sua senha não pode ter mais do que 20 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Sua senha precisa ter pelo menos 6 caracteres")
      .max(20, "Sua senha não pode ter mais do que 20 caracteres"),
    techs: z.array(
      z.object({
        name: z.string().nonempty("O nome da tecnologia é obrigatório"),
        description: z
          .string()
          .nonempty("A descrição da tecnologia é obrigatória"),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword)
      ctx.addIssue({
        code: "invalid_intersection_types",
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
      })
  })

const formCleaned = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
}

type FormProps = z.infer<typeof createUserFormSchema>

export function App() {
  const [data, setData] = React.useState({})
  const { register, handleSubmit, formState, reset, control } =
    useForm<FormProps>({
      defaultValues: async () => {
        const response = await fetch("https://api.github.com/users/vitormarkis")
        const data = await response.json()
        return {
          name: data.name as string,
          surname: "rodrigues da silva",
          email: "vitormarkis@mentorcycle.com",
          password: "vitor123",
          confirmPassword: "vitor123",
          techs: [],
        }
      },
      mode: "onSubmit",
      resolver: zodResolver(createUserFormSchema),
    })

  const {
    errors,
    isLoading: isLoadingDefaultFieldValues,
    isSubmitting: isSubmittingForm,
    isDirty: isFormValuesModified,
  } = formState

  console.log("isSubmittingForm", isSubmittingForm)

  const {} = useFieldArray({
    control,
    name: "techs",
  })

  const submitHandler: SubmitHandler<FormProps> = async formData => {
    try {
      await new Promise(res => setTimeout(res, 1500))

      setData(formData)
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

  return (
    <div className="bg-slate-900 h-screen grid place-items-center text-white">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        {isLoadingDefaultFieldValues ? (
          <div className="min-w-[24rem] grid place-items-center gap-4 p-6 rounded-lg shadow-md shadow-slate-800 bg-slate-950">
            Loading
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col  gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&>input]:bg-slate-800"
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
        )}
        <PrintForm data={data} />
      </div>
    </div>
  )
}
