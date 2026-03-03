import http from './request'
import type { LoginForm, RegisterForm, LoginResponse, RegisterResponse, ApiResponse } from '@/types'

// 模拟 API 延迟
const API_DELAY = 1000

// 开发环境模拟接口
const isDev = import.meta.env.VITE_DEV_ENABLED === true || import.meta.env.MODE === 'development'

export const authApi = {
  // 登录
  async login(data: LoginForm): Promise<LoginResponse> {
    if (isDev) {
      // 开发环境模拟
      return mockLogin(data)
    }
    const response = await http.post<LoginResponse>('/auth/login', data)
    return response.data.data
  },

  // 注册
  async register(data: RegisterForm): Promise<RegisterResponse> {
    if (isDev) {
      return mockRegister(data)
    }
    const response = await http.post<RegisterResponse>('/auth/register', data)
    return response.data.data
  },

  // 登出
  async logout(): Promise<void> {
    if (isDev) {
      return mockLogout()
    }
    await http.post('/auth/logout')
  },

  // 刷新 Token
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    if (isDev) {
      return { token: 'mock-refreshed-token' }
    }
    const response = await http.post<{ token: string }>('/auth/refresh', { refreshToken })
    return response.data.data
  },

  // 获取当前用户信息
  async getCurrentUser(): Promise<LoginResponse['user']> {
    if (isDev) {
      return {
        id: 1,
        username: 'admin',
        email: 'admin@example.com'
      }
    }
    const response = await http.get<LoginResponse['user']>('/auth/currentUser')
    return response.data.data
  }
}

// 模拟登录
const mockLogin = (data: LoginForm): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'admin' && data.password === '123456') {
        resolve({
          user: {
            id: 1,
            username: data.username,
            email: `${data.username}@example.com`
          },
          token: 'mock-jwt-token'
        })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, API_DELAY)
  })
}

// 模拟注册
const mockRegister = (data: RegisterForm): Promise<RegisterResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username && data.email && data.password) {
        resolve({
          user: {
            id: Math.floor(Math.random() * 1000),
            username: data.username,
            email: data.email
          },
          token: 'mock-jwt-token'
        })
      } else {
        reject(new Error('注册失败，请检查输入信息'))
      }
    }, API_DELAY)
  })
}

// 模拟登出
const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, API_DELAY)
  })
}
