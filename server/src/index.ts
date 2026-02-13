
import express, { Express, Request, Response } from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';


dotenv.config();


const app: Express = express();

const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    
    res.send('API Backend funcionando correctamente 🚀');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
