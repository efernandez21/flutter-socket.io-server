// Construccion de mi backend server
const express = require('express');
const path = require('path');
// Establece las variables de entorno
require('dotenv').config();
// Inicializa la aplicacion de express
const app = express();

//Node Server
const server = require('http').createServer(app);
// configuracion de socket server
// exportacion de un modulo a node
module.exports.io = require('socket.io')(server);
// llamar al archivo de sockets
require('./sockets/socket');




//path publico para detectar el directorio donde esta corriendo mi servidor, y en la carpeta public tendremos la pagina principal al enviar la solicitud a ese puerto
const publicPath = path.resolve(__dirname, 'public');
// mostremos el path public o usemolo en mi app

app.use(express.static(publicPath));
// Escucharemos la aplicacion en un puerto determinado
server.listen(process.env.PORT, (err) => {
    // Si tenemos un error arrojalo
    if (err) throw new Error(err);     
    // Si no hay error mostremos el console log
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});