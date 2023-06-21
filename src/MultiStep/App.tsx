import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import { Select } from "../components"
import { useState } from "react"

export type IFormValues = {
  firstName: string
  skills: string[]
}

export function App() {
  const [skills, setSkills] = useState([] as string[])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      firstName: "",
      skills: [],
    },
  })

  if (Object.keys(errors).length) console.log("errors", errors)

  const submitHandler = (formData: any) => console.log(formData)

  return (
    <div className="bg-slate-900 min-h-screen grid place-items-center text-white overflow-y-scroll">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col  gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800"
        >
          <input
            {...register("firstName")}
            type="text"
            className="form-element-style"
            placeholder="First Name"
            autoComplete="off"
          />
          <Controller
            name="skills"
            control={control}
            render={(props) => {
              console.log("fieldState", props.fieldState)
              console.log("formState", props.formState)
              return (
                <Select
                  options={[
                    "QA",
                    "Devops",
                    "Front-End",
                    "UI/UX Design",
                    "Full-Stack",
                    "Product Design",
                    "Back-End",
                  ]}
                  state={[skills, setSkills]}
                  {...props.field}
                />
              )
            }}
          />

          <div className="flex [&>*]:flex-1 gap-6">
            <button
              type="submit"
              className="form-element-style button-style bg-emerald-500 disabled:bg-emerald-700"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
