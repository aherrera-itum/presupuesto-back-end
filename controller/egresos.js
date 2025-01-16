import { EgresosModel } from "../models/egresos.js"
import { validateEgresos, validatePartialEgresos } from "../schema/egresos.js"

export class EgresosController {
    static async getAll(req, res){
        const entidad = await EgresosModel.getAll()
        res.json(entidad)
    }
    static async getById(req, res){
        const id = req.params.id
        const entidad = await EgresosModel.getById({ id: id})
        if (entidad) return res.json(entidad)
        res.status(404).json({message:'Egreso  no encontrado'})
    }
    static async create(req, res){
        const entidad = { ...req.body}

        const result = validateEgresos(entidad)
        if (!result.success){
            return res.status(422).json({error:JSON.parse(result.error.message)})
        }
        const newEntity = await EgresosModel.create({ input:result.data})
        res.status(201).json(newEntity) 
    }
    static async update(req, res){
        const result = validatePartialEgresos(req.body)
        if (!result.success){
            return res.status(422).json({error:JSON.parse(result.error.message)})
        }
        const id = req.params.id

        const updateEntity = await EgresosModel.update({ id: id, input:result.data})
        res.json(updateEntity)
    }
    static async delete(req, res){
        const id = req.params.id 
        const result = await EgresosModel.delete( { id } )
        if (result){
            return res.json({ message: 'Egreso Eliminado'})
        }else{
            return res.json({ message: 'No se eliminó el egreso', 'result':result})
        }
    }
}
