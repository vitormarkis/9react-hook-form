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

interface ISelect extends HTMLAttributes<HTMLDivElement> {
  options: string[]
  state: [string[], Dispatch<SetStateAction<string[]>>]
  textAllOptionsSelected?: string
  clearAllOptionButton?: boolean
}

export const SelectX = React.forwardRef<HTMLDivElement, ISelect>(
  function SelectComponent(
    {
      options,
      state: stateTuple,
      textAllOptionsSelected,
      clearAllOptionButton,
      className,
      ...rest
    },
    ref
  ) {
    const _cn = className ? ` ${className}` : ""

    const [state, setState] = stateTuple
    const [isShowingOptionsModal, setIsShowingOptionsModal] =
      React.useState(false)
    const SelectRef = React.useRef<HTMLDivElement>(null)
    const showingOptions = options.filter(opt => !state.includes(opt))

    const handleClickSelect = () => setIsShowingOptionsModal(isOpen => !isOpen)

    const handleChooseOption = (option: string) => () => {
      state.includes(option)
        ? setState(prev => prev.filter(tag => tag !== option))
        : setState(prev => [...prev, option])
    }

    const handleRemoveTag = (tag: string) => () => {
      setState(prev => prev.filter(option => option !== tag))
      setIsShowingOptionsModal(isOpen => !isOpen)
    }

    const handleClearAllOptions = () => {
      setState([])
      if (!isShowingOptionsModal) setIsShowingOptionsModal(isOpen => !isOpen)
    }

    useClickOutside(SelectRef, () => setIsShowingOptionsModal(false))

    return (
      <div
        className="relative font-normal text-slate-400"
        ref={SelectRef}
        tabIndex={0}
      >
        <SelectInput
          className={"form-element-style bg-slate-800 " + _cn}
          onClick={handleClickSelect}
          ref={ref}
          {...rest}
        >
          {state.length ? (
            state.map(selectedOption => (
              <SelectedOption
                key={selectedOption}
                className="py-1 px-4 bg-slate-600 text-xs"
              >
                <span className="select-none">{selectedOption}</span>
                <ButtonRemoveSelectedOption
                  onClick={handleRemoveTag(selectedOption)}
                  className="hover:bg-slate-700"
                >
                  <IconX
                    size={12}
                    className="text-neutral-01"
                  />
                </ButtonRemoveSelectedOption>
              </SelectedOption>
            ))
          ) : (
            <TextPlaceholderSelect className="py-1 text-slate-400">
              Selecione uma especialização
            </TextPlaceholderSelect>
          )}
          <ButtonClearAllOptions
            onClick={handleClearAllOptions}
            className="hover:bg-slate-700"
          >
            <IconTrash
              size={18}
              className="text-neutral-01"
            />
          </ButtonClearAllOptions>
        </SelectInput>
        {isShowingOptionsModal ? (
          <ModalSelectOptions className="p-4 bg-slate-800 border border-slate-950">
            {showingOptions.length === 0 ? (
              <ModalTextAllOptionsSelected className="px-2 text-neutral-01">
                {textAllOptionsSelected ?? "Todas opções foram selecionadas."}
              </ModalTextAllOptionsSelected>
            ) : (
              showingOptions.map(option => (
                <ModalOption
                  key={option}
                  onClick={handleChooseOption(option)}
                  className="py-2 px-4 hover:bg-slate-700 rounded-lg"
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
)
