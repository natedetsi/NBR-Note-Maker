const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;


// listenm for app to be ready

app.on('ready', function(){
  //create new mainWindow

  mainWindow = new BrowserWindow({width:600, height: 1200, minWidth:520, icon: __dirname + "/img/computer.png"});
  //load html file into Window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html' ),
    protocol: 'file',
    slashes: true
  }));
  //buid menu from Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert Menu
  Menu.setApplicationMenu(mainMenu);
});




//create menu Template

const mainMenuTemplate = [
  {
  label: 'File'
},
{
  label: 'Edit',
  submenu: [
    {
      label: 'Display mode'
    },
    {
      role: 'reload'
    }
  ]
},
{
  label: 'Help'
}
];

// if mac add empty object to menu

if(process.platfrom == 'darwim'){
  mainMenuTemplate.unshift({});
}
