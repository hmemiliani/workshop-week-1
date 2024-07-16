class Usuario {
    constructor(nombre, email, password, role) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role; // 'admin' o 'regular'
    }
}

class UsuarioRegular extends Usuario {
    constructor(nombre, email, password) {
        super(nombre, email, password, 'regular');
    }
}

class Administrador extends Usuario {
    constructor(nombre, email, password) {
        super(nombre, email, password, 'admin');
    }

    static validarClave(clave) {
        return clave === 'qwerty'; // Clave secreta para administradores
    }
}
