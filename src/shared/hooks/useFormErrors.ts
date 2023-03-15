import { FieldErrorsImpl, DeepMap, DeepPartial, FieldError } from 'react-hook-form'
import get from 'lodash.get'

export const useFormErrors = (errors: FieldErrorsImpl<DeepMap<DeepPartial<Record<string, unknown>>, FieldError>>) => {
  const getErrorByName = (name: string) => {
    return {
      error: get(errors, name),
    }
  }

  const fieldsHasError = (fields?: string[]) => {
    return fields?.some(field => !!get(errors, field))
  }

  return { getErrorByName, fieldsHasError }
}
