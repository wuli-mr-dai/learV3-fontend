<template>
  <a-modal :open="visible" :title="modalTitle" :footer="null" :width="400" :centered="true" :maskClosable="false" @cancel="handleCancel" @update:open="(value) => $emit('update:visible', value)">
    <div class="auth-modal">
      <!-- 登录/注册切换 -->
      <div class="auth-tabs">
        <div :class="['auth-tab', { active: activeTab === 'login' }]" @click="activeTab = 'login'">
          登录
        </div>
        <div :class="['auth-tab', { active: activeTab === 'register' }]" @click="activeTab = 'register'">
          注册
        </div>
      </div>

      <!-- 登录表单 -->
      <div v-if="activeTab === 'login'" class="auth-form">
        <a-form :model="loginForm" name="login" autocomplete="off" @finish="onLogin">
          <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
            <a-input v-model:value="loginForm.username" size="large" placeholder="用户名或邮箱">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
            <a-input-password v-model:value="loginForm.password" size="large" placeholder="密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" size="large" :loading="loginLoading" :disabled="loginLoading" block>
              {{ loginLoading ? '登录中...' : '登录' }}
            </a-button>
          </a-form-item>
        </a-form>

        <div class="auth-options">
          <a-checkbox v-model:checked="rememberMe">记住我</a-checkbox>
          <a type="link" class="forgot-password">忘记密码？</a>
        </div>

        <a-alert v-if="loginError" :message="loginError" type="error" show-icon closable @close="loginError = ''" />
      </div>

      <!-- 注册表单 -->
      <div v-if="activeTab === 'register'" class="auth-form">
        <a-form :model="registerForm" name="register" autocomplete="off" @finish="onRegister">
          <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
            <a-input v-model:value="registerForm.username" size="large" placeholder="用户名">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="email" :rules="[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]">
            <a-input v-model:value="registerForm.email" size="large" placeholder="邮箱">
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
            <a-input-password v-model:value="registerForm.password" size="large" placeholder="密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="confirmPassword" :rules="[
              { required: true, message: '请确认密码!' },
              { validator: validateConfirmPassword }
            ]">
            <a-input-password v-model:value="registerForm.confirmPassword" size="large" placeholder="确认密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" size="large" :loading="registerLoading" :disabled="registerLoading" block>
              {{ registerLoading ? '注册中...' : '注册' }}
            </a-button>
          </a-form-item>
        </a-form>

        <a-alert v-if="registerError" :message="registerError" type="error" show-icon closable @close="registerError = ''" />
      </div>

      <!-- 第三方登录 -->
      <div class="social-login">
        <a-divider>或使用以下方式登录</a-divider>
        <div class="social-buttons">
          <a-button class="social-btn wechat" size="large">
            <WechatOutlined /> 微信
          </a-button>
          <a-button class="social-btn github" size="large">
            <GithubOutlined /> GitHub
          </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import type { LoginForm, RegisterForm } from '@/types';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'success'): void;
}>();

const authStore = useAuthStore();

const activeTab = ref<'login' | 'register'>('login');
const rememberMe = ref(false);
const loginLoading = ref(false);
const registerLoading = ref(false);
const loginError = ref('');
const registerError = ref('');

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
});

const registerForm = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const modalTitle = computed(() => {
  return activeTab.value === 'login' ? '登录' : '注册';
});

const handleCancel = () => {
  emit('update:visible', false);
  resetForms();
};

const resetForms = () => {
  loginForm.username = '';
  loginForm.password = '';
  registerForm.username = '';
  registerForm.email = '';
  registerForm.password = '';
  registerForm.confirmPassword = '';
  loginError.value = '';
  registerError.value = '';
};

const validateConfirmPassword = (_rule: any, value: string) => {
  if (value !== registerForm.password) {
    return Promise.reject('两次输入的密码不一致!');
  }
  return Promise.resolve();
};

const onLogin = async (values: LoginForm) => {
  loginLoading.value = true;
  loginError.value = '';

  try {
    await authStore.login(values);
    emit('success');
    emit('update:visible', false);
    resetForms();
  } catch (error) {
    loginError.value = error instanceof Error ? error.message : '登录失败';
  } finally {
    loginLoading.value = false;
  }
};

const onRegister = async (values: RegisterForm) => {
  registerLoading.value = true;
  registerError.value = '';

  try {
    await authStore.register(values);
    emit('success');
    emit('update:visible', false);
    resetForms();
  } catch (error) {
    registerError.value = error instanceof Error ? error.message : '注册失败';
  } finally {
    registerLoading.value = false;
  }
};
</script>

<style scoped>
.auth-modal {
  padding: 0 8px;
}

.auth-tabs {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.auth-tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  font-size: 16px;
  color: #8c8c8c;
  transition: all 0.3s;
  border-bottom: 2px solid transparent;
}

.auth-tab.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
  font-weight: 500;
}

.auth-form {
  margin-bottom: 24px;
}

.auth-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.forgot-password {
  font-size: 14px;
}

.social-login {
  margin-top: 24px;
}

.social-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.social-btn {
  flex: 1;
  border-radius: 6px;
}

.social-btn.wechat {
  background-color: #07c160;
  border-color: #07c160;
  color: white;
}

.social-btn.github {
  background-color: #333;
  border-color: #333;
  color: white;
}

:deep(.ant-divider) {
  margin: 16px 0;
  font-size: 12px;
  color: #8c8c8c;
}

:deep(.ant-modal-header) {
  border-bottom: none;
  padding-bottom: 0;
}

:deep(.ant-modal-body) {
  padding: 24px 16px;
}
</style>