import { Router } from "express"
import { PresupuestoController } from "../controller/presupuesto.js"

export const presupuestoRouter = Router()

presupuestoRouter.get('/', PresupuestoController.getAll)
presupuestoRouter.get('/:id', PresupuestoController.getById)
presupuestoRouter.post('/', PresupuestoController.create)
presupuestoRouter.put('/:id', PresupuestoController.update)
presupuestoRouter.delete('/:id', PresupuestoController.delete)



