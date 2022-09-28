import { useFormErrors } from '@/shared/hooks'
import { Children, cloneElement, FormHTMLAttributes, isValidElement, ReactNode, useState } from 'react'
import {
  ArrayPath,
  FieldErrors,
  FormProvider,
  useFieldArray,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema, AnySchema } from 'yup'
import merge from 'lodash.merge'

type FormChildren<T> =
  | ReactNode
  | ReactNode[]
  | ((methods: UseFormReturn<T> & UseFieldArrayReturn<T, ArrayPath<T>, 'id'> & { isLoading: boolean }) => ReactNode)

export interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError' | 'children'> {
  children?: FormChildren<T>
  validationSchema?: ObjectSchema<Record<keyof T, AnySchema>, object>
  formParams?: UseFormProps<T>
  fieldArrayParams?: UseFieldArrayProps<T, ArrayPath<T>, 'id'>
  className?: string
  onSubmit: (data: T, methods?: UseFormReturn<T>) => Promise<unknown> | void
  onError?: (errors?: FieldErrors<T>, methods?: UseFormReturn<T>) => Promise<unknown> | void
}

export const Form = <TFormValues extends Record<string, unknown> = Record<string, unknown>>({
  children,
  validationSchema,
  formParams = {},
  fieldArrayParams = { name: '' as ArrayPath<TFormValues> },
  className = '',
  onSubmit,
  onError,
  ...rest
}: FormProps<TFormValues>) => {
  const methods = useForm({
    ...formParams,
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  })

  const arrayFieldsMethods = useFieldArray({ ...fieldArrayParams, control: methods.control })

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods

  const { getErrorByName } = useFormErrors(errors)
  const [isLoading, setIsLoading] = useState(false)

  const onFormSubmit = async (data: TFormValues) => {
    try {
      setIsLoading(true)
      await onSubmit(data, methods)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }
  const normalizeChildren = (childs?: ReactNode | ReactNode[]): ReactNode | ReactNode[] | undefined => {
    return Children.map(childs, child => {
      if (isValidElement(child)) {
        const name = child.props.name

        if (!name) {
          return cloneElement(child, child.props, normalizeChildren(child.props.children))
        }

        return cloneElement(child, {
          ...child.props,
          ...getErrorByName(name),
          ...(!child.props.control && { ...register(name) }),
          key: name,
        })
      }
      return child
    })
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          data => onFormSubmit(data),
          data => onError?.(data, methods)
        )}
        className={className}
        {...rest}
        noValidate
      >
        {normalizeChildren(
          typeof children === 'function' ? children(merge(methods, arrayFieldsMethods, { isLoading })) : children
        )}
      </form>
    </FormProvider>
  )
}
