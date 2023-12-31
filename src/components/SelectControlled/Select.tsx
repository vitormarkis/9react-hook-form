import React, { Dispatch, HTMLAttributes, SetStateAction } from "react"
import { useClickOutside } from "./hooks/useClickOutside"
import { IconX } from "./icons/IconX"
import { IconTrash } from "./icons/IconTrash"
import { ModalSelectOptions } from "./ModalSelectOptions"
import { ModalTextAllOptionsSelected } from "./ModalTextAllOptionsSelected"
import { ModalOption } from "./ModalOption"
import { ButtonClearAllOptions } from "./ButtonClearAllOptions"
import { SelectedOption } from "./SelectedOption"
import { ButtonRemoveSelectedOption } from "./ButtonRemoveSelectedOption"
import { SelectInput } from "./SelectInput"
import { TextPlaceholderSelect } from "./TextPlaceholderSelect"
import { ControllerRenderProps } from "react-hook-form"

interface ISelect
  extends Omit<HTMLAttributes<HTMLDivElement>, "onBlur" | "onChange">,
    ControllerRenderProps {
  options: string[]
  textAllOptionsSelected?: string
  clearAllOptionButton?: boolean
  value: string[]
}

export const Select = ({
  options,
  textAllOptionsSelected,
  clearAllOptionButton,
  name,
  onBlur,
  onChange,
  ref,
  value,
  className,
  ...rest
}: ISelect) => {
  const _cn = className ? ` ${className}` : ""

  const [isShowingOptionsModal, setIsShowingOptionsModal] = React.useState(false)
  const SelectRef = React.useRef<HTMLDivElement>(null)
  const showingOptions = options.filter(opt => !value.includes(opt))

  const handleClickSelect = () => setIsShowingOptionsModal(isOpen => !isOpen)

  const handleChooseOption = (option: string) => () => {
    value.includes(option)
      ? onChange(value.filter(tag => tag !== option))
      : onChange([...value, option])
  }

  const handleRemoveTag = (tag: string) => () => {
    onChange(value.filter(option => option !== tag))
    setIsShowingOptionsModal(isOpen => !isOpen)
  }

  const handleClearAllOptions = () => {
    onChange([])
    if (!isShowingOptionsModal) setIsShowingOptionsModal(isOpen => !isOpen)
  }

  useClickOutside(SelectRef, () => setIsShowingOptionsModal(false))

  return (
    <div
      className="relative font-normal text-neutral-400"
      ref={SelectRef}
      tabIndex={0}
    >
      <SelectInput
        className={"form-element-style py-3 bg-neutral-800 " + _cn}
        onClick={handleClickSelect}
        ref={ref}
        {...rest}
      >
        {value.length ? (
          value.map(selectedOption => (
            <SelectedOption
              key={selectedOption}
              className="py-1 px-4 bg-neutral-600 text-xs"
            >
              <span className="select-none">{selectedOption}</span>
              <ButtonRemoveSelectedOption
                onClick={handleRemoveTag(selectedOption)}
                className="hover:bg-neutral-700"
              >
                <IconX
                  size={12}
                  className="text-neutral-01"
                />
              </ButtonRemoveSelectedOption>
            </SelectedOption>
          ))
        ) : (
          <TextPlaceholderSelect className="py-1 text-neutral-400">
            Selecione uma especialização
          </TextPlaceholderSelect>
        )}
        <ButtonClearAllOptions
          onClick={handleClearAllOptions}
          className="hover:bg-neutral-700"
        >
          <IconTrash
            size={18}
            className="text-neutral-01"
          />
        </ButtonClearAllOptions>
      </SelectInput>
      {isShowingOptionsModal ? (
        <ModalSelectOptions className="p-4 bg-neutral-800 border border-neutral-950">
          {showingOptions.length === 0 ? (
            <ModalTextAllOptionsSelected className="px-2 text-neutral-01">
              {textAllOptionsSelected ?? "Todas opções foram selecionadas."}
            </ModalTextAllOptionsSelected>
          ) : (
            showingOptions.map(option => (
              <ModalOption
                key={option}
                onClick={handleChooseOption(option)}
                className="py-2 px-4 hover:bg-neutral-700 rounded-lg"
              >
                <span className="select-none">{option}</span>
              </ModalOption>
            ))
          )}
        </ModalSelectOptions>
      ) : null}
    </div>
  )
}
