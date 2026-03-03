import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AuthModal from '@/components/AuthModal.vue'
import { message } from 'ant-design-vue'

describe('AuthModal.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(AuthModal, {
      props: {
        visible: true
      },
      global: {
        plugins: [createPinia()],
        stubs: {
          message
        }
      }
    })

    expect(wrapper.find('h2').text()).toBe('登录')
    expect(wrapper.findComponent({ name: 'AModal' }).exists()).toBe(true)
  })

  it('switches between login and register', async () => {
    const wrapper = mount(AuthModal, {
      props: {
        visible: true
      },
      global: {
        plugins: [createPinia()],
        stubs: {
          message
        }
      }
    })

    // 点击注册按钮
    await wrapper.find('.switch-btn').trigger('click')
    expect(wrapper.find('h2').text()).toBe('注册')

    // 切换回登录
    await wrapper.find('.switch-btn').trigger('click')
    expect(wrapper.find('h2').text()).toBe('登录')
  })
})
