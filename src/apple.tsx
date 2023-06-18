// import { useForm } from "react-hook-form"

// export function App() {
//   const { register, handleSubmit } = useForm()

//   const submitHandler = (formData: any) => {
//     console.log(formData)
//   }

//   return (
//     <div className="h-screen bg-emerald-500 grid place-items-center text-zinc-900">
//       <form
//         onSubmit={handleSubmit(submitHandler)}
//         className="flex flex-col gap-4 p-4 shadow-md"
//       >
//         <input
//           type="text"
//           {...register("name")}
//           placeholder="Seu nome aqui..."
//           className="appearance-none w-full border border-black h-9 rounded-lg px-4"
//         />
//         <input
//           type="password"
//           {...register("password")}
//           placeholder="Digite sua senha..."
//           className="appearance-none w-full border border-black h-9 rounded-lg px-4"
//         />
//         <label
//           htmlFor="brazillian"
//           className="flex items-center leading-none text-sm"
//         >
//           <input type="checkbox" {...register("isBrazillian")} />
//           <span>Brasileiro</span>
//         </label>
//         <select
//           {...register("fruits")}
//           className="w-full border border-black h-9 rounded-lg px-4"
//         >
//           <option value="apple">Apple</option>
//           <option value="banana">Banana</option>
//           <option value="cherry">Cherry</option>
//         </select>
//         <label
//           htmlFor="technology"
//           className="flex items-center leading-none text-sm"
//         >
//           <input
//             type="radio"
//             value="front-end"
//             {...register("technology")}
//             className="border border-black rounded-lg px-4"
//           />
//           <span>Front-end</span>
//         </label>
//         <label
//           htmlFor="technology"
//           className="flex items-center leading-none text-sm"
//         >
//           <input
//             type="radio"
//             value="back-end"
//             {...register("technology")}
//             className="border border-black rounded-lg px-4"
//           />
//           <span>Back-end</span>
//         </label>
//         <label
//           htmlFor="writtingHand"
//           className="flex items-center leading-none text-sm"
//         >
//           <input
//             type="radio"
//             value="right-hand"
//             {...register("writtingHand")}
//             className="border border-black rounded-lg px-4"
//           />
//           <span>Mão direita</span>
//         </label>
//         <label
//           htmlFor="writtingHand"
//           className="flex items-center leading-none text-sm"
//         >
//           <input
//             type="radio"
//             value="left-hand"
//             {...register("writtingHand")}
//             className="border border-black rounded-lg px-4"
//           />
//           <span>Mão esquerda</span>
//         </label>
//         <button
//           type="submit"
//           className="h-11 rounded-lg bg-green-500 text-white"
//         >
//           Enviar
//         </button>
//       </form>
//     </div>
//   )
// }
