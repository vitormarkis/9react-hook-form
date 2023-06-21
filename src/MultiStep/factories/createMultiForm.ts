import { UseFormTrigger } from "react-hook-form";
import { IFormValues } from "../App";
import { useCallback, useEffect, useState } from "react";

export function createMultiForm(methods: {
  trigger: UseFormTrigger<IFormValues>
  isDirty: boolean
}, step: number) {
  const { isDirty, trigger } = methods

  const getShouldGoForward = useCallback((callback: (shouldGoForward: boolean) => void) => {
    switch (step) {
      case 0: {
        console.log("Validando campos")
          Promise.all([
            trigger("name"),
            trigger("surName"),
          ]).then(stepValidation => {
            if(stepValidation.every(Boolean)) {
              callback(true)
            } else {
              callback(false)
            }
          })
      }
    }
  }, [step])
    
  return {
    getShouldGoForward
  }
}