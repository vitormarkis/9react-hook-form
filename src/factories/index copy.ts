// interface ICreateFormData<T extends object> {
//   getOnlyModifiedFields(
//     dirtyFields: Partial<Record<keyof T, boolean>>
//   ): ICreateFormData<T>
//   addExtraString: () => ICreateFormData<T>
//   getValue: () => T
// }

// export function createFormData<T extends object>(
//   formData: T
// ): ICreateFormData<T> {
//   let newFormData = {} as T

//   function getOnlyModifiedFields(
//     this: ICreateFormData<T>,
//     dirtyFields: Partial<Record<keyof T, boolean>>
//   ) {
//     newFormData = Object.entries(formData).reduce(
//       (acc, [inputField, inputValue]) => {
//         if (inputField in dirtyFields) acc[inputField as keyof T] = inputValue
//         return acc
//       },
//       {} as T
//     )
//     return this
//   }

//   function addExtraString(this: ICreateFormData<T>) {
//     newFormData = {
//       ...newFormData,
//       extraString: "sjdfj",
//     }
//     return this
//   }

//   function getValue() {
//     return newFormData
//   }

//   return {
//     getOnlyModifiedFields,
//     getValue,
//     addExtraString,
//   }
// }
