import { z } from "zod";

export const formSchema = z.object({
  // Campos obligatorios
  typeElement: z
    .string()
    .min(2, { message: "Selecciona un tipo de elemento" })
    .max(50),
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50),
  username: z
    .string()
    .min(2, { message: "El usuario debe tener al menos 2 caracteres" })
    .max(50),
  directory: z.string().min(2, { message: "Selecciona un directorio" }).max(50),
  password: z
    .string()
    .min(2, { message: "La contraseña debe tener al menos 2 caracteres" })
    .max(50),

  // Campos opcionales que mantienen el máximo de 50 caracteres
  isFavourite: z.boolean().default(false),
  urlWebsite: z.string().max(50).optional().or(z.string().min(2).max(50)),
  notes: z.string().max(50).optional().or(z.string().min(2).max(50)),

  // Campo interno que puede tener un valor predeterminado
  userId: z.string().max(50).optional().default(""),
});