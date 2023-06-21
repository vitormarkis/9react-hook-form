import { Controller, useFormContext } from "react-hook-form"
import { Select } from "../../components"
import { IFormValues } from "../App"

export function Experience() {
  const { control } = useFormContext<IFormValues>()
  
  return (
    <>
      <Controller
        name="skills"
        control={control}
        render={(props) => {
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
              {...props.field}
            />
          )
        }}
      />
    </>
  )
}