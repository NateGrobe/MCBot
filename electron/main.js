/*eslint no-undef: 0 */

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { channels } = require('../src/shared/constants')
const mcbot = require('../bot/mcbot')


let mainWindow

function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    proctol: 'file',
    slashes: true,
  })
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  mainWindow.loadURL(startUrl)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on(channels.START_BOT, (event, arg) => {
  mcbot.controlBot(arg.id, arg.status)
})

