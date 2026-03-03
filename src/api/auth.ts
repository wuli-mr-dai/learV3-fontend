import type { LoginForm, RegisterForm, LoginResponse, RegisterResponse } from '@/types'

const API_DELAY = 1000

export const authApi = {
  async login(data: LoginForm): Promise<LoginResponse> {
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
  },

  async register(data: RegisterForm): Promise<RegisterResponse> {
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
  },

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, API_DELAY)
    })
  }
}
