import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/environment';
import DataBaseConnection from './database/database';
import EmployeeRoute from './routes/employee.route';
import path from 'path';

const app = express();

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg'
];

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

// Routes Backend
const employeeRoute = new EmployeeRoute();
app.use('/crud/employees', employeeRoute.getRoutes());

// Routes Frontend
app.use('/', (req, res) => {
    if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/${req.url}`));
    } else {
        res.sendFile(path.resolve('public/index.html'));
    }
});

// Starting server
app.listen(app.get(PORT), () => {
    console.info(`Running on port ${config.serverPort}`);
});
