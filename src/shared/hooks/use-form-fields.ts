import { useState, useCallback } from 'react'

export function useFormFields<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const setField = useCallback(
    (name: keyof T) => (text: string) => {
      setValues((prev) => ({ ...prev, [name]: text }))
      setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    },
    [],
  )

  const resetFields = useCallback(() => {
    setValues(initial)
    setErrors({})
  }, [initial])

  return { values, errors, setField, setErrors, resetFields }
}
