import { FormProvider, SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { useMultistepForm } from "./context"
import { zodResolver } from "@hookform/resolvers/zod"
import { multiStepFormSchema } from "./schema"
import { z } from "zod"
import { defaultValues } from "./constants"
import { Personal } from "./steps/Personal"
import { Experience } from "./steps/Experience"
import { Professional } from "./steps/Professional"
import { Location } from "./steps/Location"
import { useEffect } from "react"
import { APICep } from "../types/cep"

export type IFormValues = z.infer<typeof multiStepFormSchema>
export type TValidationPerStep = Record<number, (keyof IFormValues)[]>

const validationPerStep: TValidationPerStep = {
  0: ["name", "surName"],
  1: ["linkedin"],
  2: ["state", "city", "street"],
  3: ["skills"],
}

export function App() {
  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: zodResolver(multiStepFormSchema),
    mode: "onTouched",
  })
  const { step, setStep } = useMultistepForm()
  const { errors } = methods.formState

  const zipCode = methods.watch("zipCode") ?? ""
  const isInLastStep = step === 3
  const isInFirstStep = step === 0
  const shouldGoForward = !validationPerStep[step].some(field => field in errors)

  const submitHandler: SubmitHandler<IFormValues> = formData => {
    console.log("submitHandler", formData)
  }

  const handleActionButton = async () => {
    if (isInLastStep) return
    const allValidations = validationPerStep[step].map(field => methods.trigger(field))
    const allFieldsValidated = await Promise.all(allValidations)
    const allValidationPassed = allFieldsValidated.every(Boolean)
    if (allValidationPassed) return setStep(s => ++s)
  }

  const handleGoBackButton = () => {
    if (isInFirstStep) return
    setStep(s => --s)
  }

  useEffect(() => {
    const validZipCode = zipCode.length === 8
    if (validZipCode) {
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(response => response.json())
        .then((data: APICep) => {
          if ("erro" in data)
            return methods.setError("zipCode", {
              message: "Não foi possível encontrar nenhuma informação com o CEP fornecido.",
            })
          methods.setValue("city", data.localidade)
          methods.setValue("street", data.logradouro)
          methods.setValue("state", data.uf)
        })
        .catch(console.log)
    }
  }, [zipCode])

  return (
    <div className="bg-slate-900 min-h-screen grid place-items-center text-white overflow-y-scroll">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submitHandler)}
            className="flex flex-col  gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800"
          >
            {step === 0 ? <Personal /> : null}
            {step === 1 ? <Professional /> : null}
            {step === 2 ? <Location /> : null}
            {step === 3 ? <Experience /> : null}
            <div className="flex [&>*]:flex-1 gap-6">
              {isInFirstStep ? null : (
                <button
                  type="button"
                  className="form-element-style button-style bg-amber-500 disabled:bg-amber-700"
                  onClick={handleGoBackButton}
                >
                  Voltar
                </button>
              )}
              <button
                type={isInLastStep ? "submit" : "button"}
                className="form-element-style button-style bg-emerald-500 disabled:bg-emerald-700"
                onClick={handleActionButton}
                disabled={!shouldGoForward}
              >
                {isInLastStep ? "Enviar" : "Prosseguir"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
