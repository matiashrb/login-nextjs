import { PrismaClient } from '@prisma/client';

// Creamos una instancia para hablar con la base de datos
export const prisma = new PrismaClient();