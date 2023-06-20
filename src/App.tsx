import React from "react"

export function App() {
  return (
    <div className="bg-slate-900 min-h-screen grid place-items-center text-white">
      <div className="flex gap-8 max-w-7xl w-full p-4">
        <form
          // onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col  gap-4 p-6 flex-1 rounded-lg shadow-md shadow-slate-800 bg-slate-950 [&_input]:bg-slate-800"
        >
          <input
            // {...register("cep")}
            type="text"
            maxLength={9}
            className="form-element-style"
            placeholder="00000-000"
          />
        </form>
      </div>
    </div>
  )
}
