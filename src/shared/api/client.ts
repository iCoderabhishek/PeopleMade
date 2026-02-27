import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: response error normalization (still simple)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Request failed';

    return Promise.reject(new Error(message));
  }
);