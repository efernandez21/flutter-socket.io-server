// Importo entonces io
const {io} = require('../index');
// Mensajes de sockets
// cuando hay una conexion es de destacar que cada navegador o ventana tendra un id unico que lo identificara
io.on('connection', client => {
    console.log('Cliente conectado');
    // callback a disparar cuando se desconecte el cliente
    client.on('disconnect', () => {
        console.log('Cliente desconectado ');
    });
    // on es para escuchar lo que recibimos del cliente
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!! ',payload['nombre']);
        // emitiendo mensaje a todos los clientes conectados, podriamos usar mejor el client para solo emitirle al cliente que nos envio el mensaje
        io.emit( 'mensaje', {admin:'Nuevo Mensaje'} );
    });

});