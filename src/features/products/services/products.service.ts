import { apiClient } from '@/shared/api/client'
import { Product } from '@/features/products/types/products-types'
import { PRODUCT_API_URL } from '@env'

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(
    `${PRODUCT_API_URL}/products`,
  )
  return data
}
