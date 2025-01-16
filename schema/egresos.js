import z from "zod"

const egresosSchema = z.object({
    monto: z.string(),
    fecha: z.string(),
    descripcion: z.string().optional(),
})
export function validateEgresos(input){
    return egresosSchema.safeParse(input)
}

export function validatePartialEgresos( input){
    return egresosSchema.partial().safeParse(input)
}