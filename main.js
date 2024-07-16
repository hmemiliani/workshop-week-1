document.addEventListener('DOMContentLoaded', () => {
    const sesionToken = localStorage.getItem('sesionToken');
    if (sesionToken && window.location.pathname !== '/dashboard.html') {
        window.location.href = 'dashboard.html'; 
        mostrarReservas();
    }
    //  if (!sesionToken) {
    //     window.location.href = 'index.html';
    //     return;
    // }
    configurarDashboard();
});

function configurarDashboard() {
    const emailUsuario = localStorage.getItem('usuarioActual');
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === emailUsuario);

    if (usuario.role === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
        mostrarReservas();
        document.getElementById('usuario-regular-dashboard').style.display = 'none';
        
    } else {
        document.getElementById('admin-dashboard').style.display = 'none';
        document.getElementById('usuario-regular-dashboard').style.display = 'block';
        mostrarReservas();
    }
}

function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function registrarUsuario() {
    const nombre = document.getElementById('registro-nombre').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const rol = document.getElementById('registro-rol').value;
    const claveAdmin = document.getElementById('registro-clave').value;
    
    if (rol === 'admin' && !Administrador.validarClave(claveAdmin)) {
        alert("Clave de administrador incorrecta.");
        return;
    }

    const nuevoUsuario = rol === 'admin' ? new Administrador(nombre, email, password) : new UsuarioRegular(nombre, email, password);
    guardarUsuario(nuevoUsuario);
    localStorage.setItem('sesionToken', 'token-' + new Date().getTime());
    localStorage.setItem('usuarioActual', email);
    alert("Usuario registrado con éxito. Por favor inicia sesión.");
    ocultarRegistro();
}

function iniciarSesion() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        localStorage.setItem('sesionToken', 'token-' + new Date().getTime());
        localStorage.setItem('usuarioActual', email);
        alert("Inicio de sesión exitoso. Bienvenido, " + usuario.nombre);
        window.location.href = 'dashboard.html';
    } else {
        alert("Datos de inicio de sesión incorrectos.");
    }
}

function cerrarSesion() {
    localStorage.removeItem('sesionToken');
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
}

function mostrarRegistro() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registro-form').style.display = 'block';
}

function ocultarRegistro() {
    document.getElementById('registro-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function mostrarCampoClave() {
    const rol = document.getElementById('registro-rol').value;
    document.getElementById('registro-clave').style.display = rol === 'admin' ? 'block' : 'none';
}
incrementCounter = (function() {
    let counter = 0;
    return function() {
        counter++;
        return counter;
    }
})();

function crearReservaAdmin() {
    const nombre = document.getElementById('nombre-reserva').value;
    const cupo = document.getElementById('cupo-reserva').value;
    const descripcion = document.getElementById('descripcion-reserva').value;
    
    if (!nombre || cupo <= 0 || !descripcion) {
        alert('Por favor, complete todos los campos correctamente para crear la reserva.');
        return;
    }
    
    const id = incrementCounter();
    const reserva = { id, nombre, cupo, descripcion };

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    document.getElementById('nombre-reserva').value = '';
    document.getElementById('cupo-reserva').value = '';
    document.getElementById('descripcion-reserva').value = '';
    mostrarReservas();
    console.log("Reserva creada:", reserva);
}

function editarReservaAdmin() {
    const id = prompt("Ingrese el ID de la reserva que desea editar:");
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reserva = reservas.find(r => r.id == id);
    
    if (reserva) {
        const nuevoNombre = prompt("Ingrese el nuevo nombre del usuario para la reserva:", reserva.nombre);
        const nuevaFecha = prompt("Ingrese la nueva fecha de la reserva (formato YYYY-MM-DD):", reserva.fecha);
        reserva.nombre = nuevoNombre;
        reserva.fecha = nuevaFecha;
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log("Reserva editada:", reserva);
    } else {
        console.log("No se encontró la reserva con ID:", id);
    }
}

function eliminarReservaAdmin() {
    const id = prompt("Ingrese el ID de la reserva que desea eliminar:");
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const indice = reservas.findIndex(r => r.id == id);
    
    if (indice !== -1) {
        reservas.splice(indice, 1);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log("Reserva eliminada con ID:", id);
    } else {
        console.log("No se encontró la reserva con ID:", id);
    }
}

function mostrarFormularioReserva() {
    document.getElementById('formulario-reserva').style.display = 'block';
}

function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const lista = document.getElementById('reservas-lista');
    lista.innerHTML = ''; 

    reservas.forEach(reserva => {
        const reservaDiv = document.createElement('div');
        reservaDiv.innerHTML = `<strong>${reserva.nombre}</strong> (Cupo: ${reserva.cupo}) - ${reserva.descripcion}`;
        lista.appendChild(reservaDiv);
    });
}

function Reservar(){
    const id = prompt("Ingrese el ID de la reserva que desea tomar:");
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const indice = reservas.findIndex(r => r.id == id);
    
    if (indice !== -1) {
        reservas.splice(indice, 1);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log("Reserva eliminada con ID:", id);
    } else {
        console.log("No se encontró la reserva con ID:", id);
    }
}