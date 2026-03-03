# LearV3 - Vue 3 + TypeScript 企业级项目模板

一个基于 Vue 3、TypeScript 和 Ant Design Vue 构建的现代化前端项目模板，具备完整的工程化配置。

## 🚀 技术栈

- **框架**: Vue 3 + Composition API
- **语言**: TypeScript
- **UI 组件库**: Ant Design Vue (按需引入)
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **构建工具**: Vite
- **包管理**: npm

## 📦 项目特性

### 核心功能
- ✅ 用户认证系统（登录/注册）
- ✅ 路由守卫和权限控制
- ✅ 响应式布局设计
- ✅ 国际化支持（预留）
- ✅ 主题切换（预留）

### 开发体验
- ✅ TypeScript 完整支持
- ✅ 组件自动导入
- ✅ 热重载开发
- ✅ 代码规范检查
- ✅ 自动格式化

## 🛠️ 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
src/
├── api/           # API 接口管理
├── assets/        # 静态资源
├── components/    # 公共组件
├── composables/   # 组合式函数
├── layouts/       # 布局组件
├── router/        # 路由配置
├── stores/        # 状态管理
├── types/         # 类型定义
├── utils/         # 工具函数
├── views/         # 页面组件
└── main.ts        # 应用入口
```

## 🔧 开发配置

### 代码规范
项目使用 ESLint 和 Prettier 进行代码规范检查：

```bash
# 检查代码规范
npm run lint

# 自动修复代码规范问题
npm run lint:fix

# 格式化代码
npm run format
```

### Git Hooks
项目配置了 Git Hooks，在提交代码前会自动进行代码检查和格式化。

### 环境变量
复制 `.env.example` 文件为 `.env` 并配置相应环境变量：

```bash
# 应用配置
VITE_APP_TITLE=LearV3
VITE_APP_VERSION=1.0.0

# API 配置
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# 功能开关
VITE_ENABLE_MOCK=true
```

## 🎯 功能模块

### 用户认证
- 登录/注册弹框
- 路由权限控制
- Token 自动管理
- 记住登录状态

### 状态管理
使用 Pinia 进行状态管理，包含：
- 用户认证状态
- 应用配置
- 页面状态

### 路由系统
- 动态路由配置
- 路由守卫
- 页面懒加载

## 🎨 UI 组件

项目使用 Ant Design Vue 组件库，支持：
- 按需引入，减小打包体积
- 主题定制
- 响应式设计

## 📊 构建优化

### 代码分割
- 路由级别的代码分割
- 第三方库单独打包
- 按需加载优化

### 性能优化
- Tree Shaking
- Gzip 压缩
- 图片压缩优化

## 🔒 安全考虑

- XSS 防护
- CSRF 防护
- API 请求安全
- 敏感信息保护

## 🧪 测试

项目支持单元测试和组件测试：

```bash
# 运行测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## 📈 部署

### 开发环境部署
```bash
npm run build:dev
```

### 生产环境部署
```bash
npm run build:prod
```

### Docker 部署
项目支持 Docker 容器化部署，具体配置参考 `Dockerfile`。

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：
- [Vue.js](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design Vue](https://www.antdv.com/)
- [Vite](https://vitejs.dev/)

---

**开发团队** © 2024 LearV3 Project