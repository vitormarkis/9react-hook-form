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

export type IFormValues = z.infer<typeof multiStepFormSchema>

export function App() {
  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: zodResolver(multiStepFormSchema)
  })
  const { step, setStep } = useMultistepForm()
  const isInLastStep = step === 2
  const isInFirstStep = step === 0

  if (Object.keys(methods.formState.errors).length) console.log("errors", methods.formState.errors)

  const submitHandler: SubmitHandler<IFormValues> = (formData) => console.log(formData)

  const handleActionButton = () => {
    if(isInLastStep) return
    setStep(s => ++s)
  }

  const handleGoBackButton = () => {
    if(isInFirstStep) return
    setStep(s => --s)
  }

  console.log("step", step)

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
          {step === 2 ? <Experience /> : null}
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
