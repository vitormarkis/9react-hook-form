import { APICep } from "../types/cep"

export function createFetch() {
  async function fetchAddressViaCEP(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = (await response.json()) as APICep
    return data
  }

  return {
    fetchAddressViaCEP,
  }
}
