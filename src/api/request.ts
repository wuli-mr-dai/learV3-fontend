import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { storage } from '@/utils'
import type { ApiResponse } from '@/types'

// 环境变量配置
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
const timeout = import.meta.env.VITE_API_TIMEOUT || 10000
const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY || 'learv3_token'

// 创建 axios 实例
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = storage.get<string>(tokenKey)
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // 显示请求中的 loading（可选，可以通过 config 禁用）
      if (config.headers['X-Show-Loading'] !== false) {
        // 可以在这里触发全局 loading
      }

      return config
    },
    (error) => {
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const { data } = response

      // 根据业务状态码处理
      if (data.code === 200 || data.code === 0) {
        return response
      }

      // 处理业务错误
      message.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    },
    async (error) => {
      // 处理 HTTP 错误
      const originalRequest = error.config

      // 401 错误 - Token 过期或未授权
      if (error.response?.status === 401) {
        // 如果是刷新 Token 的请求，直接跳转到登录页
        if (originalRequest.url?.includes('/auth/refresh')) {
          message.error('登录已过期，请重新登录')
          handleLogout()
          return Promise.reject(error)
        }

        // 尝试刷新 Token
        if (!originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = storage.get<string>('refresh_token')
            if (refreshToken) {
              const response = await axios.post(`${baseURL}/auth/refresh`, {
                refreshToken
              })

              const { token } = response.data.data
              storage.set(tokenKey, token)

              // 重试原始请求
              originalRequest.headers.Authorization = `Bearer ${token}`
              return instance(originalRequest)
            }
          } catch (refreshError) {
            message.error('登录已过期，请重新登录')
            handleLogout()
            return Promise.reject(refreshError)
          }
        }

        message.error('请重新登录')
        handleLogout()
        return Promise.reject(error)
      }

      // 403 错误 - 无权限
      if (error.response?.status === 403) {
        message.error('您没有权限执行此操作')
        return Promise.reject(error)
      }

      // 404 错误
      if (error.response?.status === 404) {
        message.error('请求的资源不存在')
        return Promise.reject(error)
      }

      // 500 错误
      if (error.response?.status >= 500) {
        message.error('服务器错误，请稍后重试')
        return Promise.reject(error)
      }

      // 网络错误
      if (!error.response) {
        message.error('网络连接失败，请检查网络')
        return Promise.reject(error)
      }

      // 其他错误
      const errorMsg = error.response?.data?.message || error.message || '请求失败'
      message.error(errorMsg)

      return Promise.reject(error)
    }
  )

  return instance
}

// 处理登出
const handleLogout = () => {
  storage.remove(tokenKey)
  storage.remove('user')
  storage.remove('refresh_token')

  // 跳转到登录页
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

// 创建请求实例
const request = createAxiosInstance()

// 扩展请求方法，支持显示/隐藏 loading
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

// 封装请求方法
const http = {
  get<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.get<ApiResponse<T>>(url, config as AxiosRequestConfig)
  },

  post<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.post<ApiResponse<T>>(url, data, config as AxiosRequestConfig)
  },

  put<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.put<ApiResponse<T>>(url, data, config as AxiosRequestConfig)
  },

  patch<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.patch<ApiResponse<T>>(url, data, config as AxiosRequestConfig)
  },

  delete<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.delete<ApiResponse<T>>(url, config as AxiosRequestConfig)
  }
}

export default http
