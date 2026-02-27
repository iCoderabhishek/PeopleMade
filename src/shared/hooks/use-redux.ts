import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/redux/store'

export function useAppSelector<T>(selector: (state: RootState) => T) {
  return useSelector(selector)
}

export function useAppDispatch() {
  return useDispatch<AppDispatch>()
}
