import express, { json } from "express"
import cors from "cors"
import { presupuestoRouter } from "./routes/presupuesto.js"
import { ingresoRouter } from "./routes/ingresos.js"
import { egresosRouter } from "./routes/egresos.js"
import { consultaRouter } from "./routes/consulta.js"

const app = express()
app.use(cors())
app.use(json())

//Routers
app.use('/presupuesto', presupuestoRouter)
app.use('/ingreso', ingresoRouter)
app.use('/egreso', egresosRouter)
app.use('/consulta', consultaRouter)


const port = 5000
app.listen(port, () => console.log(`Servidor corriendo en puesto ${port}`))