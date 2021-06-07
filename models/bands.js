const Band = require("./band");


class Bands {

    constructor() {
        this.bands = [];
    }

    // Metodo para agregar una banda, el new BAND nos indicara que recibiremos una banda, es el por defecto
    addBand( band = new Band() ){
        this.bands.push(band)
    }
    // Obtener las bandas
    getBands() {
        return this.bands;
    }
    // Eliminar las bandas obtenemos el id que la identifica
    deleteBand(id = ''){
        // filtramos el indice y solo devolvemos todos menos los del id
        this.bands = this.bands.filter( band => band.id !== id );
    }
    // Incrementar el voto de la banda
    voteBand( id = '' ){
        this.bands = this.bands.map( band => {
            // Buscamos en las bandas y retornamos la banda que acabamos de incrementar el voto
            if ( band.id == id) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        });
    }
}
// Para poder usar la clase fuera de este archivo
module.exports = Bands;