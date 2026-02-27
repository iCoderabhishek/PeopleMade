import { apiClient } from '@/shared/api/client'
import { AuthResponse, LoginCredentials } from '@/features/auth/types/auth-types'
import { AUTH_API_URL } from '@env'

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    `${AUTH_API_URL}/auth/login`,
    { ...credentials, expiresInMins: 1440 },
  )
  return data
}
