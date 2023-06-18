export function createFormData<T extends object>() {
  function getOnlyModifiedFields(
    formData: T,
    dirtyFields: Partial<Record<keyof T, boolean>>
  ) {
    return Object.entries(formData).reduce((acc, [inputField, inputValue]) => {
      if (inputField in dirtyFields) acc[inputField as keyof T] = inputValue
      return acc
    }, {} as T)
  }

  function onDirty(isDirty: boolean, callback: (isDirty: boolean) => void) {
    if (isDirty) callback(isDirty)
  }

  return {
    getOnlyModifiedFields,
    onDirty,
  }
}
