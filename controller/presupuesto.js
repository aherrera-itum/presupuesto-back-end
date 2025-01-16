import { PresupuestoModel } from "../models/presupuesto.js"
import { validatePresupuesto, validatePartialPresupuesto } from "../schema/presupuesto.js"

export class PresupuestoController {
    
    static async getAll(req, res){
        const entidad = await PresupuestoModel.getAll()
        res.json(entidad)
    }
    static async getById(req, res){
        const id = req.params.id
        const entidad = await PresupuestoModel.getById({ id: id})
        if (entidad) return res.json(entidad)
        res.status(404).json({message:'Presupuesto no encontrado'})

    }
    static async create(req, res){  
        const entidad = { ...req.body}

        const result = validatePresupuesto(entidad)
        if (!result.success){
            return res.status(422).json({error:JSON.parse(result.error.message)})
        }
        const newEntity = await PresupuestoModel.create({ input:result.data})
        res.status(201).json(newEntity) 
    }
    static async update(req, res){
        const result = validatePartialPresupuesto(req.body)
        if (!result.success){
            return res.status(422).json({error:JSON.parse(result.error.message)})
        }
        const id = req.params.id

        const updateEntity = await PresupuestoModel.update({ id: id, input:result.data})
        res.json(updateEntity)

    }
    static async delete(req, res){
        const id = req.params.id 
        const result = await PresupuestoModel.delete( { id })
        if (result){
            return res.json({ message: 'Presupuesto Eliminado'})
        }else{
            return res.json({ message: 'No se eliminó el presupuesto', 'result':result})
        }
    }
}