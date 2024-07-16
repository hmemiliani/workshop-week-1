class Reserva {
    constructor(id, limite) {
        this.id = id;
        this.limite = limite;
    }

    crearReserva() {
        if (this.limite > 0) {
            this.limite--;
            console.log("Reserva creada. Limite restante:", this.limite);
        } else {
            console.log("No se pueden hacer más reservas.");
        }
    }

    editarReserva(nuevoLimite) {
        this.limite = nuevoLimite;
        console.log("Reserva editada. Nuevo límite:", this.limite);
    }

    eliminarReserva() {
        console.log("Reserva eliminada.");
    }
}
