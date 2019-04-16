import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/environment';
import DataBaseConnection from './database/database';

const app = express();

// Connection
const conn = new DataBaseConnection();  
conn.getDataBaseConnection();

// Constants
const PORT = 'port';

// Setting
app.set(PORT, process.env.PORT || config.serverPort);

// Midlewares
app.use(morgan('dev'));
app.use(`/${config.uploadFolder}`, express.static(config.uploadFolder));
app.use(express.json());
app.use(cors({ origin: config.cors }));

// Routes
app.use('/crud/employees', require('./routes/employee.route'));

// Starting server
app.listen(app.get(PORT), () => {
    console.info(`Running on port ${config.serverPort}`);
});
