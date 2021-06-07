const { v4: uuidV4 } = require('uuid');

// Clase de la banda para manejar en el backend
class Band {
    // Constructor inicial de la clase
    constructor(name = 'no-name'){
        this.id = uuidV4(); //iDENTIFICADOR UNICO
        this.name = name;
        this.votes = 0;
    }

}


// exportar lo creado para usarlo cuando se necesite
module.exports = Band;