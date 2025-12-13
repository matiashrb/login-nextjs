import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

//RUTA PARA REGISTRAR UN USUARIO (POST) POST = CREAR en la ruta /register
router.post("/register", register);

//RUTA PARA INICIAR SESION (POST) POST = CREAR en la ruta /login
router.post("/login", login);

export default router;
