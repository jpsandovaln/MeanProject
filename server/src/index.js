import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import DataBaseConnection from './database/database';

const app = express();

// Connection
const conn = new DataBaseConnection();  
conn.getDataBaseConnection();

// Constants
const PORT_NUMBER = 3000;
const PORT = 'port';

// Setting
app.set(PORT, process.env.PORT || PORT_NUMBER);

// Midlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
app.use('/crud/employees', require('./routes/employee.route'));

// Starting server
app.listen(app.get(PORT), () => {
    console.info(`Running on port ${PORT_NUMBER}`);
});
