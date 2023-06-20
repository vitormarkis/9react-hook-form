import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ICepFormInput, cepSchema, defaultValues } from "../schemas/cepSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createCepFormState } from "../factories/createCepFormState"

export function useCep() {
  const cepForm = useForm<ICepFormInput>({
    defaultValues,
    resolver: zodResolver(cepSchema),
  })

  const { register, handleSubmit, formState, reset, watch } = cepForm

  const {
    errors,
    isSubmitting: isSubmittingForm,
    isDirty: isFormValuesModified,
  } = formState

  const cep = watch("cep")

  useEffect(() => {
    if (cep.length === 9) {
      const CepFormState = createCepFormState(cepForm)
      CepFormState.useCep(cep)
    }
  }, [cep])

  const submitHandler: SubmitHandler<ICepFormInput> = async formData => {
    console.log("formData")
    console.log(formData)
  }

  return {
    handleSubmit,
    submitHandler,
    isSubmittingForm,
    register,
    errors,
    isFormValuesModified,
    reset,
    defaultValues,
  }
}
