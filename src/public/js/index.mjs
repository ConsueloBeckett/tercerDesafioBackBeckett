import { io } from "socket.io-client";

const socket = io();

// Cuando se agrega un nuevo producto
socket.on("producto-agregado", (nuevoProducto) => {
});

// Cuando se elimina un producto
socket.on("producto-eliminado", (productoEliminadoId) => {
    
});

