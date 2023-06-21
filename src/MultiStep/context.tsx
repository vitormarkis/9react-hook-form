import { createContext, useContext, useState } from "react";

export interface CMultiStepContext {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const MultiStepContext = createContext({} as CMultiStepContext)

export function MultiStepProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<CMultiStepContext["step"]>(0);
  
  return <MultiStepContext.Provider children={children} value={{ step, setStep }}  />
}

export const useMultistepForm = () => useContext(MultiStepContext)