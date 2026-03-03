import http from '../request'
import type { ApiResponse, User } from '@/types'

// 用户列表查询参数
export interface UserListParams {
  page?: number
  pageSize?: number
  username?: string
  email?: string
}

// 用户列表响应
export interface UserListResponse {
  list: User[]
  total: number
  page: number
  pageSize: number
}

export const userApi = {
  // 获取用户列表
  async getUserList(params: UserListParams = {}): Promise<UserListResponse> {
    const response = await http.get<UserListResponse>('/user/list', { params })
    return response.data.data
  },

  // 获取用户详情
  async getUserDetail(id: number): Promise<User> {
    const response = await http.get<User>(`/user/${id}`)
    return response.data.data
  },

  // 创建用户
  async createUser(data: Partial<User>): Promise<User> {
    const response = await http.post<User>('/user', data)
    return response.data.data
  },

  // 更新用户
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const response = await http.put<User>(`/user/${id}`, data)
    return response.data.data
  },

  // 删除用户
  async deleteUser(id: number): Promise<void> {
    await http.delete(`/user/${id}`)
  }
}
