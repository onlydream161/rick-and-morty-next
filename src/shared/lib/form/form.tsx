import { useFormErrors } from '@/shared/hooks'
import { merge } from 'lodash'
import { Children, cloneElement, FormHTMLAttributes, isValidElement, ReactNode, useState } from 'react'
import { FieldErrors, FormProvider, UnpackNestedValue, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'

type FormChildren<T> = ReactNode | ReactNode[] | ((methods: UseFormReturn<T> & { isLoading: boolean }) => ReactNode)

export interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError' | 'children'> {
  children?: FormChildren<T>
  params?: UseFormProps<T>
  className?: string
  onSubmit: (data: UnpackNestedValue<T>, methods?: UseFormReturn<T>) => Promise<unknown> | void
  onError?: (errors?: FieldErrors<T>, methods?: UseFormReturn<T>) => Promise<unknown> | void
}

export const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
  children,
  params = {},
  className = '',
  onSubmit,
  onError,
  ...rest
}: FormProps<TFormValues>) => {
  const methods = useForm(params)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods
  const { getErrorByName } = useFormErrors(errors)
  const [isLoading, setIsLoading] = useState(false)

  const onFormSubmit = async (data: UnpackNestedValue<TFormValues>) => {
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

        const rules = child.props.rules || { required: false }

        return cloneElement(child, {
          ...child.props,
          ...getErrorByName(name),
          ...(!child.props.control && { ...register(name, rules) }),
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
        {normalizeChildren(typeof children === 'function' ? children(merge(methods, { isLoading })) : children)}
      </form>
    </FormProvider>
  )
}
