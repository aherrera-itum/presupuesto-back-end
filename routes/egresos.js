import { Router } from "express"
import { EgresosController } from "../controller/egresos.js"

export const egresosRouter = Router()

egresosRouter.get('/', EgresosController.getAll)
egresosRouter.get('/:id', EgresosController.getById)
egresosRouter.post('/', EgresosController.create)
egresosRouter.put('/:id', EgresosController.update)
egresosRouter.delete('/:id', EgresosController.delete)

