import express from 'express';
import router from './router';
import db from './config/db';
import swaggerSpect, { swaggerUiOptions } from './config/swagger';
import swaggerUi, { serve } from 'swagger-ui-express';
import cors from 'cors';

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log("Conexión a la base de datos establecida correctamente");
    }
    catch (error) {
        console.log("No se pudo conectar a la base de datos");
    }
}

connectDB();

// Instacia del servidor
const server = express();

// Configuracion de CORS
server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: false
}))

// leer datos de formulario
server.use(express.json());

server.use('/api', router);

//Docs
server.use('/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpect, swaggerUiOptions)
)

export default server 
