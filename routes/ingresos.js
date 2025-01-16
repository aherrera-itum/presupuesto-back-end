import { Router } from "express"
import { IngresosController } from "../controller/ingresos.js"

export const ingresoRouter = Router()

ingresoRouter.get('/', IngresosController.getAll)
ingresoRouter.get('/:id', IngresosController.getById)
ingresoRouter.post('/', IngresosController.create)
ingresoRouter.put('/:id', IngresosController.update)
ingresoRouter.delete('/:id', IngresosController.delete)





