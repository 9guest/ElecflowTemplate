# ElecflowTemplate

[English](./README.md) | [<u>**中文**</u>](#)

---

## 简介
ElecflowTemplate 是一个用于快速启动 Electron 桌面应用的模板，适用于使用 JavaScript 构建跨平台桌面程序。

## 前置条件
- [Node.js](https://nodejs.org/)（建议 v14 及以上）
- [Yarn](https://yarnpkg.com/)（v1.x 或 v3.x）

## 快速开始
1. **安装依赖**
   ```sh
   yarn
   ```
2. **开发模式运行应用**
   ```sh
   yarn start
   ```

## 打包应用
如需打包应用以便分发（需 electron-packager 或类似工具）：
```sh
yarn build
```
（如使用其他打包工具或脚本，请相应调整命令。）

## 项目结构
- `src/` – 主要源文件（HTML、JS、CSS）
- `main.js` – Electron 主进程入口
- `package.json` – 项目信息与脚本
- `build/` – 图标、安装器脚本和资源

## 个性化定制
- 编辑 `src/index.html`、`src/renderer.js` 和 `src/styles.css` 以更改界面。
- 修改 `main.js` 以调整主进程逻辑。
