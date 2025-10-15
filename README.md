# ElecflowTemplate

[<u>**English**</u>](#) | [中文](./README.zh.md)

---

## Introduction
ElecflowTemplate is a quick start Electron template for building cross-platform desktop applications with JavaScript.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Yarn](https://yarnpkg.com/) (v1.x or v3.x)

## Getting Started
1. **Install dependencies**
   ```sh
   yarn
   ```
2. **Run the app in development mode**
   ```sh
   yarn start
   ```

## Packaging the App
To build the app for distribution (requires electron-packager or similar):
```sh
yarn build
```
(Adjust this command if you use a different packager or script.)

## Project Structure
- `src/` – Main source files (HTML, JS, CSS)
- `main.js` – Electron main process entry
- `package.json` – Project metadata and scripts
- `build/` – Icons, installer scripts, and assets

## Customization
- Edit `src/index.html`, `src/renderer.js`, and `src/styles.css` to change the UI.
- Modify `main.js` for main process logic.
