import z from "zod"

const ingresosSchema = z.object({
    monto: z.string(),
    fecha: z.string(),
    descripcion: z.string().optional(),
})

export function validateIngresos(input){
    return ingresosSchema.safeParse(input)
}

export function validatePartialIngresos(input){
    return ingresosSchema.partial().safeParse(input)
}