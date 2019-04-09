const mongoose = require('mongoose'); 

module.exports = class DataBaseConnection {

    constructor() {
        this.URI = 'mongodb://localhost/test-db-crud-con';
    }
    
    getDataBaseConnection() {
        mongoose.connect(this.URI)
            .then(db => console.log('DB is connected'))
            .catch(err => console.log(err));
        return mongoose;
    }
}
