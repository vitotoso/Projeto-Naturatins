const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,

        title: "Sistema Naturatins",

        icon: path.join(
            __dirname,
            "Imagens",
            "Logo-naturatins.ico"
        ),

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(
        path.join(
            __dirname,
            "frontend",
            "Pages",
            "formulario.html"
        )
    );

    Menu.setApplicationMenu(null);

    win.maximize();

    win.once("ready-to-show", () => {
        win.show();
    });
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});