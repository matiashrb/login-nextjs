// 1. IMPORTACIONES
// Importamos 'express' para crear el servidor y los tipos (Request, Response) para que TypeScript nos ayude.
import express, { Express, Request, Response } from 'express';
// Importamos 'cors' para permitir que el Frontend (React) se comunique con este Backend.
// Sin esto, el navegador bloquearía la conexión por seguridad.
import cors from 'cors';
// Importamos 'dotenv' para poder leer archivos .env (donde guardaremos claves secretas).
import dotenv from 'dotenv';
// 1. IMPORTAMOS LAS RUTAS NUEVAS
import authRoutes from './routes/auth.routes';

// 2. CONFIGURACIÓN
// Le decimos a la app que lea las variables del sistema ahora mismo.
dotenv.config();

// Inicializamos la aplicación de Express. 'app' es nuestro servidor.
const app: Express = express();
// Definimos el puerto. Si existe en el ambiente úsalo, si no, usa el 4000.
const PORT = process.env.PORT || 4000;

// 3. MIDDLEWARES (Funciones que se ejecutan antes de llegar a las rutas)
// Habilitamos CORS para aceptar peticiones desde cualquier origen (luego lo restringiremos al puerto de React).
app.use(cors());
// Habilitamos que el servidor pueda entender datos en formato JSON (lo que envía React).
app.use(express.json());

// USAMOS LAS RUTAS
// Le decimos: "Todo lo que empiece con /api/auth, manéjalo con authRoutes"
app.use('/api/auth', authRoutes);
// 4. RUTAS
// Definimos una ruta básica tipo GET en la raíz ('/').
// req = request (lo que pide el usuario), res = response (lo que respondemos).
app.get('/', (req: Request, res: Response) => {
    // Respondemos con un texto simple.
    res.send('API Backend funcionando correctamente 🚀');
});

// 5. ARRANCAR
// Le decimos al servidor que se quede escuchando en el puerto definido.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});