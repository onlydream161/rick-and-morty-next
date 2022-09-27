import { FieldErrorsImpl, DeepMap, DeepPartial, FieldError } from 'react-hook-form'
import get from 'lodash.get'

export const useFormErrors = (errors: FieldErrorsImpl<DeepMap<DeepPartial<Record<string, unknown>>, FieldError>>) => {
  const getErrorByName = (name: string) => {
    const error = get(errors, name)
    return {
      error: !!error,
      errorMessage: (error as FieldError)?.message,
    }
  }

  return { getErrorByName }
}
