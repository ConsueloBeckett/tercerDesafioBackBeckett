import { engine } from "express-handlebars"
import {dirname } from "./utils.mjs"
import * as path from "path"
import express from "express"

const app = express()
const PORT = 8080


app.engine("handlebars", engine())
app.set("view engine" , "handlebars")
app.set("views", path.resolve(dirname + "/views"))

//estaticos
app.use('/', express.static(dirname + "/public"))



app.get("/",(req, res) => {
    res.render("index")
})

app.listen (PORT , ()=>{ 
    console.log(`server listening on ${PORT}`)
 }) 