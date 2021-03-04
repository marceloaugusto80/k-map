import { app, BrowserWindow } from "electron";

const isDev = process.env["NODE_ENV"] != "production";
console.log(isDev ? "## DEV MODE" : "## PROD MODE");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if(isDev) win.loadURL("http://localhost:9000");
    else win.loadFile("./renderer/index.html");
}


app.on("window-all-closed", ()=> {
    if(process.platform !== "darwin") {
        app.quit();
    }
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
})

app.whenReady().then(createWindow);