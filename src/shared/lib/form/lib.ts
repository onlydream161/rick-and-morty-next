export const FORM_CREATE_MODE = 'create'
export const FORM_UPDATE_MODE = 'update'
export const FORM_READ_MODE = 'read'

export type FormMode = 'create' | 'update' | 'read'

// parentName должен иметь в кноце . , так сделано,
// чтобы можно было использовать вложенные блоки формы без вложенности
export const getNestedFieldName = (parentName: string, fieldName: string) => `${parentName}${fieldName}`

export const getNestedArrayFieldName = (parentName: string, index: number, fieldName: string) =>
  `${parentName}${index}.${fieldName}`
