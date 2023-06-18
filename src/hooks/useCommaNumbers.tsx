import { useState } from "react"

export function useCommaNumbers(): [
  value: string,
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
] {
  const [value, setValue] = useState("0")

  function formatPrice(price: string) {
    if (price.length < 3) return price
    let priceArray = price.toString().split("")
    priceArray.splice(-2, 0, ",")
    return priceArray.join("")
  }

  function filterOnlyNumbers(price: string) {
    const numberRegex = /^[0-9\b]+$/
    let priceArray = price.toString().split("")
    const onlyNumbers = priceArray.filter(v => numberRegex.test(v)).join("")
    return onlyNumbers
  }

  function setInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    const filteredValue = filterOnlyNumbers(value)
    setValue(filteredValue)
  }

  const inputValue = formatPrice(value)

  return [inputValue, setInputValue]
}
