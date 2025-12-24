# Fake Mock API

一个基于 **React** + **Vite** + **JSON Server** 的全栈开发演示项目，展示了如何使用 Mock API 进行前端开发和测试。

## ✨ 项目简介

包含增删改查（CRUD）等基础功能。使用 JSON Server 作为模拟后端 API，只可作为模拟使用，不具备真实数据的变更。
**如果想模拟真实的增删改查，可以使用[mockapi](https://mockapi.io/)。**

### 主要特性

- 🚀 **快速开发**：使用 Vite 构建工具，提供极速的开发体验
- 🔧 **Mock API**：基于 JSON Server 的完整 RESTful API 模拟
- 🎨 **自定义组件库**：包含 Table、Modal、Button、Input 等常用组件
- 📊 **完整 CRUD**：实现了数据的增删改查功能

## 🔨 项目结构

```
fake-mock-api/
├── public/                # 静态资源
├── src/
│   ├── api/              # API 接口定义
│   │   ├── config.js     # API 配置
│   │   ├── mockapi.js    # Mock API 接口
│   │   └── service.js    # Axios 封装
│   ├── assets/           # 资源文件
│   ├── components/       # 自定义组件
│   │   ├── Button/       # 按钮组件
│   │   ├── Input/        # 输入框组件
│   │   ├── Loading/      # 加载组件
│   │   ├── Message/      # 消息提示组件
│   │   ├── Modal/        # 模态框组件
│   │   ├── Popconfirm/   # 确认弹窗组件
│   │   └── Table/        # 表格组件
│   ├── hooks/            # 自定义 Hooks
│   │   ├── useApi.js     # API 请求 Hook
│   │   └── useForm.js    # 表单管理 Hook
│   ├── pages/            # 页面组件
│   │   └── game-list/    # 游戏列表页面
│   ├── App.jsx           # 应用主组件
│   └── main.jsx          # 应用入口
├── db.json               # JSON Server 数据库
├── package.json          # 项目配置
└── vite.config.js        # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

#### 方式一：同时启动前端和 Mock API（推荐）

```bash
npm run dev:all
```

该命令会同时启动：
- 前端开发服务器（默认端口：5173）
- JSON Server Mock API（默认端口：3000）

#### 方式二：分别启动

```bash
# 终端 1：启动前端开发服务器
npm run dev

# 终端 2：启动 Mock API 服务器
npm run mock
```

### 访问应用

- 前端应用：http://localhost:5173/fake-mock-api/
- Mock API：http://localhost:3000

## 📚 可用脚本

```bash
# 启动开发服务器
npm run dev

# 启动 Mock API 服务器
npm run mock

# 同时启动前端和 Mock API
npm run dev:all

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 🔌 API 接口

项目使用 JSON Server 提供以下 RESTful API 接口：

### 游戏列表接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/games` | 获取所有游戏 |
| GET | `/games?q=关键词` | 搜索游戏 |
| GET | `/games/:id` | 获取单个游戏详情 |
| POST | `/games` | 创建新游戏 |
| PUT | `/games/:id` | 更新游戏信息 |
| DELETE | `/games/:id` | 删除游戏 |

### 请求示例

```javascript
// 获取所有游戏
GET http://localhost:3000/games

// 搜索游戏
GET http://localhost:3000/games?q=CSGO

// 获取游戏详情
GET http://localhost:3000/games/1

// 创建游戏
POST http://localhost:3000/games
Content-Type: application/json

{
  "title": "新游戏",
  "views": 100
}

// 更新游戏
PUT http://localhost:3000/games/1
Content-Type: application/json

{
  "title": "更新的游戏",
  "views": 200
}

// 删除游戏
DELETE http://localhost:3000/games/1
```

## 🎯 核心功能

### 1. 游戏列表展示
- 表格形式展示所有游戏数据
- 包含 ID、名称、热度等信息

### 2. 添加游戏
- 点击"添加"按钮打开弹窗
- 填写游戏名称和热度
- 提交后自动刷新列表

### 3. 编辑游戏
- 点击"编辑"按钮
- 弹窗自动回显当前数据
- 修改后保存

### 4. 查看详情
- 点击"详情"按钮
- 以只读模式查看游戏信息

### 5. 删除游戏
- 点击"删除"按钮
- 二次确认后执行删除
- 提示删除结果

### 6. 搜索功能
- 右上角搜索框
- 实时搜索游戏名称
- 支持清空搜索

## 🧩 自定义组件

项目包含以下可复用的自定义组件：

- **Table**：数据表格组件，支持自定义列、加载状态、滚动等
- **Modal**：模态框组件，支持确认、取消操作
- **Button**：按钮组件，支持多种类型和危险状态
- **Input**：输入框组件，支持清空、禁用等功能
- **Message**：消息提示组件，支持成功、警告、错误提示
- **Popconfirm**：气泡确认框，用于危险操作的二次确认
- **Loading**：加载动画组件

## 🎨 自定义 Hooks

- **useApi**：用于处理 API 请求、加载状态和错误处理
- **useForm**：用于管理表单状态和数据

## 📝 数据结构

### 游戏对象

```json
{
  "id": 1,
  "title": "游戏名称",
  "views": 1000
}
```

## 🔧 配置说明

### 环境变量

项目支持多环境配置：

- `.env.development`：开发环境配置
- `.env.production`：生产环境配置

### API 配置

在 `src/api/config.js` 中可以配置 API 基础地址：

```javascript
const API_BASE_URL = 'http://localhost:3000';
```

## 📖 学习资源

本项目适合以下场景的学习和使用：

- 学习 React Hooks 的使用
- 理解前后端分离开发模式
- 掌握 RESTful API 的设计
- 学习自定义组件的封装
- 了解 Mock API 的使用场景

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🎓 相关文档

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [JSON Server 文档](https://github.com/typicode/json-server)
- [Axios 文档](https://axios-http.com/)

---

**Happy Coding! 🎉**