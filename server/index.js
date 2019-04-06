const express = require('express');
const app = express();

// Constants
const PORT_NUMBER = 3000;
const PORT = 'port';

// Setting
app.set(PORT, process.env.PORT || PORT_NUMBER);


app.listen(app.get(PORT), () => {

});
