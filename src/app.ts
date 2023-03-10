import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

import indexRoutes from './routes/index';

// Configuraciones
// Definir el puerto en base al entorno de ejecucion
app.set('port', process.env.port || 4000);

// middlwares
// iformacion sobre las peticiones
app.use(morgan('dev'));
// archivos json
app.use(express.json());


// routes
app.use('/', function (req, res) {
    res.send('Hello World')
});

app.use('/api', indexRoutes);


// carpeta que se utilizara para almacenar archivos publicos
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;

