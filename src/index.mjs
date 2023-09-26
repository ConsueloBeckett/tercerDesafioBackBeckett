import { engine } from "express-handlebars"
import {dirname } from "./utils.mjs"
import * as path from "path"
import express from "express"
import { Server } from "socket.io"

const app = express()
const PORT = 8080

const server = app.listen (PORT , ()=>{ 
    console.log(`server listening on ${PORT}`)
 }) 

const io = new Server(server);

app.engine("handlebars", engine())
app.set("view engine" , "handlebars")
app.set("views", path.resolve(dirname + "/views"))


//estaticos
app.use('/', express.static(dirname + "/public"))


app.get("/",(req, res) => {
    res.render("index")
})

//  nuevo producto
io.on("connection", (socket) => {
    socket.on("agregar-producto", (nuevoProducto) => {
        
        // Envía a clientes conectados para que actualicen la lista
        io.emit("producto-agregado", nuevoProducto);
    });

    // Cuando se elimina un producto
    socket.on("eliminar-producto", (productoEliminadoId) => {

        // Envía a clientes conectados para que actualicen la lista
        io.emit("producto-eliminado", productoEliminadoId);
    });
});


app.get("/realtimeproducts", (req, res) => {

    //  lista de productos 
    const products = products.json();
    
    res.render("realTimeProducts", { products });
});


app.get("/", (req, res) => {

    // Obtén la lista de productos 
    const products = products.json();
    
    res.render("home", { products });
});
