//Functionality for index
const {ipcRenderer} = require('electron')

var btn_one = document.querySelector("#btn-one");
var btn_two = document.querySelector("#btn-two");

console.log("id: "+btn_one.id);

btn_one.addEventListener("click", function (event) {
    console.log("sending ipc...");

    ipcRenderer.send("StartScript-One");
})