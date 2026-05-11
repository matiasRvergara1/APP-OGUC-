const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 640,
    title: 'OGUC App — Ordenanza General de Urbanismo y Construcciones',
    backgroundColor: '#f6f6f6',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));
  win.once('ready-to-show', () => win.show());

  // Abrir links externos en el navegador predeterminado
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  win.on('closed', () => { win = null; });
}

const menu = Menu.buildFromTemplate([
  {
    label: 'Archivo',
    submenu: [{ label: 'Salir', accelerator: 'Alt+F4', role: 'quit' }]
  },
  {
    label: 'Ver',
    submenu: [
      { label: 'Pantalla completa', accelerator: 'F11', role: 'togglefullscreen' },
      { type: 'separator' },
      { label: 'Acercar', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
      { label: 'Alejar', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
      { label: 'Tamaño original', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
    ]
  },
  {
    label: 'Recursos',
    submenu: [
      { label: 'DDU — MINVU', click: () => shell.openExternal('https://www.minvu.gob.cl/elementos-tecnicos/circulares-division-de-desarrollo-urbano-ddu/') },
      { label: 'Texto OGUC — BCN', click: () => shell.openExternal('https://www.bcn.cl/leychile/navegar?idNorma=21568') },
    ]
  }
]);

app.whenReady().then(() => {
  Menu.setApplicationMenu(menu);
  createWindow();
});

app.on('window-all-closed', () => app.quit());
