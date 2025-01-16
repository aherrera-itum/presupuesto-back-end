import z from "zod"

const presupuestoSchema = z.object({
    mes: z.number().int().min(1).max(12), 
    monto: z.string(),
    comentario: z.string().optional(),
})

export function validatePresupuesto(input){
    return presupuestoSchema.safeParse(input)
}

export function validatePartialPresupuesto(input){
    return presupuestoSchema.partial().safeParse(input)
}