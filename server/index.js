const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { Mongoose } = require('./database/database');

// Constants
const PORT_NUMBER = 3000;
const PORT = 'port';

// Setting
app.set(PORT, process.env.PORT || PORT_NUMBER);

// Midlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({ origin: 'http://172.21.19.17:4200' }));

// Routes
app.use('/crud/employees', require('./routes/employee.route'));

// Starting server
app.listen(app.get(PORT), () => {
    console.log('running');
});
