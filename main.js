// Modules to control application life and create native browser window
import { app, BrowserWindow, dialog, shell, Menu, Tray, nativeImage } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const indexDir = path.join(__dirname, 'src', 'index.html');
const preloadDir = path.join(__dirname, 'src', 'preload.js');
const iconPath = process.platform === 'win32'
  ? path.join(__dirname, 'build', 'icon.ico')
  : path.join(__dirname, 'build', 'icon.png');

let mainWindow = null;
let tray = null;
let isQuitting = false;

// Register the protocol handler
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('elecflow', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('elecflow')
}

function createTray() {
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open ElecflowTemplate',
      click: () => {
        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.show();
          mainWindow.focus();
        } else {
          createWindow();
        }
      }
    },
    {
      label: 'Hide to Tray',
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('ElecflowTemplate');
  tray.setContextMenu(contextMenu);

  // Left click on tray icon toggles the window
  tray.on('click', () => {
    if (!mainWindow) {
      createWindow();
      return;
    }
    if (mainWindow.isVisible()) {
      if (mainWindow.isFocused()) {
        mainWindow.hide();
      } else {
        mainWindow.focus();
      }
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Double click on tray icon restores the window
  tray.on('double-click', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

async function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      preload: preloadDir,
    }
  })

  // Intercept window close to hide to tray rather than exiting
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // and load the index.html of the app.
  await mainWindow.loadFile(indexDir)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Ensure single instance application with protocol handling
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }

    // the commandLine is array of strings in which last element is deep link url
    dialog.showErrorBox('Welcome Back', `You arrived from : ${commandLine.pop()}`)
  })

  app.whenReady().then(() => {
    // Set dock icon on macOS during development if needed
    if (process.platform === 'darwin' && app.dock) {
      app.dock.setIcon(iconPath);
    }

    createWindow();
    createTray();

    app.on('activate', function () {
      // On macOS, re-open or focus window when dock icon is clicked
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      } else if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    })
  })
}

app.on('before-quit', () => {
  isQuitting = true;
  if (tray) {
    tray.destroy();
  }
});

app.on('open-url', function (event, url) {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})

// Quit when all windows are closed, except on macOS. There, common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
