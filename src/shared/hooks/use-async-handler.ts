import { useCallback } from 'react'
import { useToast } from '@/shared/components/toast'

export function useAsyncHandler() {
  const { showToast } = useToast()

  const handleError = useCallback(
    (error?: string | null, fallback = 'Something went wrong') => {
      showToast(error || fallback)
    },
    [showToast],
  )

  const handleSuccess = useCallback(
    (message: string) => {
      showToast(message, 'success')
    },
    [showToast],
  )

  return { handleError, handleSuccess }
}
