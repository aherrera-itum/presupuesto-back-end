import { ConsultaModel } from "../models/consulta.js"


export class ConsultaController {
    static async getConsulta(req, res){
        const datos = await ConsultaModel.getConsulta()
        res.json(datos)
    }
}