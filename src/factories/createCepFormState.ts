import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from "react-hook-form"
import { APICep } from "../types/cep"
import { ICepFormInput } from "../schemas/cepSchema"
import { createFetch } from "./createFetch"

export function createCepFormState<
  TFieldValues extends ICepFormInput = ICepFormInput,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(form: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  type K = FieldPath<TFieldValues>

  const dataMapping: any = {
    city: "localidade",
    district: "bairro",
    state: "uf",
    address: "logradouro",
    cep: "bairro",
    number: "ddd",
  }

  const { clearErrors, setValue, setError } = form

  async function setValues(errorCleaning: K, fields: K[], apiData: APICep) {
    clearErrors(errorCleaning)
    fields.forEach(f => {
      const apiKey = dataMapping[f] as keyof APICep
      setValue(f, apiData[apiKey] as PathValue<TFieldValues, K>, {
        shouldValidate: true,
      })
    })
  }

  async function addressFailedToFetch(errorSetting: K) {
    setError(errorSetting, {
      message: "Não foi possível encontrar informações para o CEP fornecido",
    })
  }

  async function useCep(
    cep: string,
    onSuccess?: (apiAddress: APICep) => void,
    onError?: () => void
  ) {
    try {
      const Fetch = createFetch()
      const data = await Fetch.fetchAddressViaCEP(cep)
      const fieldCause = "cep" as K
      const updatingValues = ["city", "district", "state", "address"] as K[]

      setValues(fieldCause, updatingValues, data)
      if (onSuccess) onSuccess(data)
    } catch (error) {
      addressFailedToFetch("cep" as K)
      if (onError) onError()
    }
  }

  return {
    useCep,
  }
}
