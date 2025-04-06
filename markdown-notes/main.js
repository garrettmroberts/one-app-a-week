const { app, BrowserWindow } = require('electron');
const isDev = require('path');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPrefereces: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:3000');
    } else {
        win.loadFile(path.join(__dirname, 'build', 'index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
