import React, { InputHTMLAttributes, useId } from "react"
import { Slot } from "@radix-ui/react-slot"

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage: string | undefined
  asChild?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({ asChild, type = "text", errorMessage, label, className, ...rest }, ref) => {
    const inputId = useId()
    const _cn = className ? ` ${className}` : ""
    const Component = asChild ? Slot : "input"

    return (
      <div className="flex flex-col outline-none">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 text-sm text-neutral-400"
          >
            {label}
          </label>
        )}
        <Component
          id={inputId}
          type={type}
          autoComplete="off"
          tabIndex={20}
          className={
            "my-1 px-3 min-h-[3rem] rounded-lg text-neutral-300 outline-none focus:outline-1 focus:outline-neutral-500 focus:outline-offset-2" +
            _cn
          }
          ref={ref}
          {...rest}
        />
        {errorMessage && <p className="mt-1 text-sm text-red-400">{errorMessage}</p>}
      </div>
    )
  }
)
