import {
  FormProvider,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form"
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
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react"
import { APICep } from "../types/cep"

export type IFormValues = z.infer<typeof multiStepFormSchema>
export type TValidationPerStep = Record<number, (keyof IFormValues)[]>

const validationPerStep: TValidationPerStep = {
  0: ["name", "surName"],
  1: ["linkedin"],
  2: ["state", "city", "street", "zipCode"],
  3: ["skills"],
}

export function App() {
  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: zodResolver(multiStepFormSchema),
    mode: "all",
  })
  const { step, setStep } = useMultistepForm()
  const { errors } = methods.formState

  const hasErrors = Object.keys(errors).length
  if (hasErrors) console.log("Errors", errors)

  const zipCode = methods.watch("zipCode") ?? ""
  const isMentor = methods.watch("isMentor") ?? ""
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
          methods.setValue("city", data.localidade, { shouldValidate: true })
          methods.setValue("street", data.logradouro, { shouldValidate: true })
          methods.setValue("state", data.uf, { shouldValidate: true })
        })
        .catch(console.log)
    }
  }, [zipCode])

  return (
    <div className="bg-neutral-900 min-h-screen grid place-items-center text-white overflow-y-scroll">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submitHandler)}
            className="relative flex flex-col gap-4 p-6 pt-10 flex-1 rounded-lg shadow-md shadow-neutral-800 bg-neutral-950 [&_input]:bg-neutral-800"
          >
            {step === 0 ? <Personal /> : null}
            {step === 1 ? <Professional /> : null}
            {step === 2 ? <Location /> : null}
            {step === 3 ? <Experience /> : null}
            <div className="absolute flex items-center right-0 top-0 shadow-md -translate-y-1/2 text-xs">
              <p className="leading-none whitespace-nowrap p-1 rounded-l-full bg-neutral-800 border-neutral-700 text-neutral-300 border pl-4 pr-16 translate-x-14 z-[-1]">
                Você deseja ser
              </p>
              <Controller
                name="isMentor"
                control={methods.control}
                render={({ field }) => (
                  <SwitchMentor
                    tabIndex={10}
                    isMentor={isMentor}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex [&>*]:flex-1 gap-6">
              {isInFirstStep ? null : (
                <button
                  type="button"
                  className="form-element-style button-style bg-amber-500 disabled:bg-amber-700"
                  onClick={handleGoBackButton}
                  tabIndex={30}
                >
                  Voltar
                </button>
              )}
              <button
                type={isInLastStep ? "submit" : "button"}
                // type="submit"
                className="form-element-style button-style bg-emerald-500 disabled:bg-emerald-700"
                onClick={handleActionButton}
                onClickCapture={() => console.log("Capturou")}
                onAuxClick={() => console.log("Capturou")}
                disabled={!shouldGoForward}
                tabIndex={25}
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

import React from "react"

interface ISwitchMentor
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "onBlur" | "name" | "value">,
    ControllerRenderProps {
  isMentor: boolean
}

export const SwitchMentor: React.FC<ISwitchMentor> = ({
  onBlur,
  onChange,
  ref,
  isMentor = false,
  className,
  ...rest
}) => {
  const _cn = className ? ` ${className}` : ""
  const { setValue } = useFormContext<IFormValues>()

  const [width, setWidth] = useState(0)
  const mentorRef = useRef<HTMLSpanElement>(null)
  const mentoradoRef = useRef<HTMLSpanElement>(null)
  const transform = `translateX(${isMentor ? "0" : (width ?? 1) / 1.25}px)`

  useEffect(() => {
    if (mentorRef.current) isMentor && setWidth(mentorRef.current.offsetWidth)
    if (mentoradoRef.current) !isMentor && setWidth(mentoradoRef.current.offsetWidth)
  }, [isMentor])

  return (
    <button
      type="button"
      className={"relative flex bg-neutral-700 p-0.5 rounded-full group" + _cn}
      ref={ref}
      onBlur={onBlur}
      onKeyUp={e => {
        if (!["Enter", " "].includes(e.key)) return
        setValue("isMentor", !isMentor)
      }}
      {...rest}
    >
      <div
        className={`bg-neutral-800 rounded-full absolute top-0.5 bottom-0.5 left-0.5 transition-all duration-150 ease-in-out`}
        style={{ width, transform }}
      />
      <span
        ref={mentorRef}
        className="block leading-none py-1.5 z-10 px-5 rounded-full"
        onClick={() => onChange(true)}
      >
        Mentor
      </span>
      <span
        ref={mentoradoRef}
        className="block leading-none py-1.5 z-10 px-5 rounded-full"
        onClick={() => onChange(false)}
      >
        Mentorado
      </span>
    </button>
  )
}
