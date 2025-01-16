import { IngresosModel } from '../models/ingresos.js'
import { validateIngresos, validatePartialIngresos } from "../schema/ingresos.js"

export class IngresosController {
    static async getAll(req, res){
        const entidad = await IngresosModel.getAll()
        res.json(entidad)
    }
    static async getById(req, res){
        const id = req.params.id
        const entidad = await IngresosModel.getById({ id: id})
        if (entidad) return res.json(entidad)
        res.status(404).json({message:'Ingreso no encontrado'})
    }
    static async create(req, res){
        const entidad = { ...req.body}
        const result = validateIngresos(entidad)
        if (!result.success){
            return res.status(422).json({error:JSON.parse(result.error.message)})
        }
        const newEntity = await IngresosModel.create({ input:result.data})
        res.status(201).json(newEntity) 
    }
    static async update(req, res){
        const result = validatePartialIngresos(req.body)
        if (!result.success){
            return res.status(422).json({error:JSON.parse(result.error.message)})
        }
        const id = req.params.id


        const updateEntity = await IngresosModel.update({ id: id, input:result.data})
        res.json(updateEntity)
    }
    static async delete(req, res){
        const id = req.params.id 
        const result = await IngresosModel.delete( { id })
        if (result){
            return res.json({ message: 'Ingreso Eliminado'})
        }else{
            return res.json({ message: 'No se eliminó el ingreso', 'result':result})
        }
    }
}
