// Importo entonces io que es una importacion con nombre
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
// Mensajes de sockets
// Instancia de varias bandas, debemos volverlo persistente
const bands = new Bands();
bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Metalica') );
bands.addBand( new Band('Iron Maiden') );
// Probando las bandas disponibles
// cuando hay una conexion es de destacar que cada navegador o ventana tendra un id unico que lo identificara
io.on('connection', client => {
    console.log('Cliente conectado');

    /*Emitimos las bandas activas a todos los clientes que se conecten al servidor socket */
    client.emit('active-bands', bands.getBands());

    // callback a disparar cuando se desconecte el cliente
    client.on('disconnect', () => {
        console.log('Cliente desconectado ');
    });
    // on es para escuchar lo que recibimos del cliente
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!! ',payload['nombre']);
        // emitiendo mensaje a todos los clientes conectados con el io, podriamos usar mejor el client para solo emitirle al cliente que nos envio el mensaje
        // io.emit( 'mensaje', {admin:'Recibimos tu mensaje'} );
    });
    // Escuchando cuando se haga un voto
    client.on('vote-band', (payload) => {
        // Actualizamos en el backend los votos
        bands.voteBand(payload.id);
        // Debemos informar que ha habido un cambio a todos los escuchas con el io
        io.emit('active-bands', bands.getBands());
    });
    // Escuchar: add-band
    client.on('add-band', (payload) => {
        // Actualizamos en el backend la nueva banda agregada
        bands.addBand(new Band(payload.name));
        // Debemos informar que ha habido un cambio a todos los escuchas con el io
        io.emit('active-bands', bands.getBands());
    });
    // Eliminar : 'delete-band'
    client.on('delete-band', (payload) => {
        // Eliminamos la banda dada
        // console.log(payload);
        bands.deleteBand(payload.id)
        // Debemos informar que ha habido un cambio a todos los escuchas con el io
        io.emit('active-bands', bands.getBands());
    });
    // Recibimos lo emitido por el cliente y reaccionamos con base en eso
    // client.on('emitir-mensaje', (payload)=> {
    //     // console.log(payload);
    //     // io.emit('nuevo-mensaje', payload); //emite a todos
    //     // para emitir a todos menos el cliente que emite usamos el .broadcast para indicarle esto
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

});