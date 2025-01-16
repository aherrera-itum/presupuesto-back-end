import { Router } from "express"
import { ConsultaController } from "../controller/consulta.js"

export const consultaRouter = Router()

consultaRouter.get('/', ConsultaController.getConsulta)






