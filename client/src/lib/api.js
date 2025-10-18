// client/src/lib/api.js
import axios from 'axios'
import { getToken, clearAuth } from './storage'
import { API_BASE_URL } from './url'

export const api = axios.create({ baseURL: API_BASE_URL })

// Attach token
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearAuth()
    }
    return Promise.reject(err)
  }
)

export default api
