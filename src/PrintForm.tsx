import React from "react"

interface IPrintForm extends React.ComponentProps<"div"> {
  data?: object
}

export function PrintForm({ data, className, ...rest }: IPrintForm) {
  const _cn = ` ${className ?? ""}`

  return (
    <div
      className={
        "flex flex-col flex-1 gap-4 p-6 rounded-lg shadow-md shadow-slate-800 bg-slate-950" +
        _cn
      }
      {...rest}
    >
      <pre className="p-4 text-xs rounded-lg bg-slate-800 text-white">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
