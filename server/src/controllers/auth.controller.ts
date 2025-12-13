import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db"; //CONEXION A LA DB
import jwt from 'jsonwebtoken';

//FUNCION PARA REGISTRAR UN USUARIO

export const register = async (req: Request, res: Response) => {
    try {
        //RECIBIMOS DATOS
        const { email, password, name } = req.body;  // son enviados desde el frontend con REQ
        //VALIDACIONES
        //si (not email || not password)
        if (!email || !password) {
            return res.status(400).json({ message: "Faltan datos" }); //enviamos error
        }
        //ENCRIPTAR
        const hashedPassword = await bcrypt.hash(password, 10); //encriptamos la contraseña 

        //GUARDAR EN LA DB con create (prisma.user seria el modelo llamado User que creamos en schema.prisma)
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword, //contraseña encriptada guardada
                name: name,
            },
        });

        //RESPONDER AL FRONTEND si sale todo bien
        return res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });


    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
}

//FUNCION PARA INICIAR SESION

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; //RECIBIMOS DATOS DEL FRONTEND
        //VALIDACIONES con DB (buscamos si existe el email)
        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        //COMPARAR CONTRASEÑAS
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        //GENERAR TOKEN
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        //RESPONDER AL FRONTEND
        res.json({ message: 'Login exitoso', token, user });

    } catch (error) {
        console.error("Error al iniciar sesion:", error);
        return res.status(500).json({ message: "Error al iniciar sesion" });
    }
}