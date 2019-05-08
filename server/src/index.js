import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/environment';
import DataBaseConnection from './database/database';
import EmployeeRoute from './routes/employee.route';

const app = express();

// Connection
const conn = new DataBaseConnection();
conn.getDataBaseConnection();

// Constants
const PORT = 'port';

// Setting
app.set(PORT, process.env.PORT || config.serverPort);

// Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(`/${config.uploadFolder}`, express.static(config.uploadFolder));
app.use(express.json());

// Routes
const employeeRoute = new EmployeeRoute();
app.use('/crud/employees', employeeRoute.getRoutes());

// Starting server
app.listen(app.get(PORT), () => {
    console.info(`Running on port ${config.serverPort}`);
});
